// NPC style guide: live, screen-only features. Everything degrades to readable static content.
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const toast = m => window.npcToast && window.npcToast(m);
  const copy = async (t, label) => { try { await navigator.clipboard.writeText(t); toast(`Copied ${label || t}`); } catch { toast('Copy blocked: select and copy manually'); } };

  // Copy colours: click = value, Shift+click = token
  $$('[data-hex]').forEach(b => b.addEventListener('click', e => {
    const tok = b.dataset.token; e.shiftKey && tok ? copy(`var(${tok})`) : copy(b.dataset.hex, b.dataset.hex.startsWith('linear') ? 'gold gradient' : b.dataset.hex);
  }));

  // Contrast checker (WCAG 2.2)
  const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(x => x <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
  const fgs = { Text: '#E2EAF4', Muted: '#8D9CB4', Faint: '#5E718F', Champagne: '#AB9563', Gold: '#DDB84A', Ink: '#07101F', 'Gold deep': '#9A6A10' };
  const bgs = { Ink: '#07101F', 'Ink 2': '#0D1522', 'Ink 3': '#121C2C', Gold: '#DDB84A', Paper: '#EEF2FA', 'Web ground': '#0B1C3A', 'AI ground': '#140F33' };
  const fgW = $('.cc-fg'), bgW = $('.cc-bg'), prev = $('.cc-prev');
  if (fgW) {
    let fg = '#E2EAF4', bg = '#07101F';
    const mk = (wrap, set, cur, on) => Object.entries(set).forEach(([n, h]) => {
      const b = document.createElement('button'); b.className = 'chipbtn'; b.style.background = h; b.title = `${n} ${h}`; b.setAttribute('aria-label', `${n} ${h}`); b.setAttribute('aria-pressed', h === cur);
      b.onclick = () => { $$('button', wrap).forEach(x => x.setAttribute('aria-pressed', x === b)); on(h); draw(); }; wrap.append(b);
    });
    const draw = () => {
      const r = ratio(fg, bg); prev.style.background = bg; prev.style.color = fg;
      const v = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large text only' : 'Fails';
      $('.cc-res').textContent = `${r.toFixed(2)}:1 · ${v}`; $('.cc-res').style.color = fg;
    };
    mk(fgW, fgs, fg, h => fg = h); mk(bgW, bgs, bg, h => bg = h); draw();
  }

  // Type tester
  const tsIn = $('.ts-in');
  tsIn && tsIn.addEventListener('input', () => $$('.ts').forEach((t, i) => { if (i !== 1) t.textContent = tsIn.value || ' '; }));

  // Strategy map
  $$('.map .dot').forEach(d => { const show = () => { $$('.map .dot').forEach(x => x.classList.toggle('on', x === d)); $('.map-tip').textContent = d.dataset.tip; }; d.addEventListener('click', show); d.addEventListener('mouseenter', show); d.addEventListener('focus', show); });

  // Pyramid
  const po = $('.pyr-out');
  if (po) {
    po.classList.add('ready');
    $$('.tier').forEach(t => t.addEventListener('click', () => {
      $$('.tier').forEach(x => x.setAttribute('aria-pressed', x === t));
      $$('[data-p]', po).forEach(p => p.classList.toggle('on', p.dataset.p === t.dataset.t));
    }));
  }

  // Voice dials
  $$('.dial').forEach(d => { const r = $('input', d), says = JSON.parse(d.dataset.says), home = +d.dataset.home;
    r.addEventListener('input', () => { $('.say', d).textContent = says[r.value - 1]; d.classList.toggle('off', +r.value !== home); }); });

  // Tone by context
  const tones = [
    ['Instant clarity', 'Brand. <span class="mute">Look the part.</span>', 'Shortest form. Two-tone headline, 3–6 words, ending in a period.'],
    ['Certainty', 'Scope: four pages. <span class="mute">Price: fixed.</span>', 'More formal, precise. Payment: 50% to start, 50% at launch.'],
    ['Credibility, generosity', 'I rebuilt my homepage in four sprints. <span class="mute">Here’s what I’d change.</span>', 'Warmer, first person “I”. Contrarian opener, then the fix, then proof.'],
    ['Relevance in three lines', 'Your site undersells you. <span class="mute">I’d fix three things first.</span>', 'Brief and specific. No flattery. One clear ask: a 20-minute call.'],
    ['Visible progress', 'Done: homepage and nav. <span class="mute">Next: the work reel, Thursday.</span>', 'Factual and dated. Say what you need from them.'],
    ['Own it, fix it', 'I missed Thursday. <span class="mute">That’s on me. New date: Monday.</span>', 'Most direct. No excuses, no “sorry for any inconvenience”.'],
    ['Share credit', 'It’s live. <span class="mute">10M+ impressions and an award.</span>', 'One proud fact. No exclamation marks.'],
    ['Respect', 'That’s not something I’d do well. <span class="mute">Here’s who I’d call.</span>', 'Honest and helpful. Saying no builds trust.'],
  ];
  $$('.tone-seg button').forEach(b => b.addEventListener('click', () => {
    $$('.tone-seg button').forEach(x => x.setAttribute('aria-pressed', x === b)); const [g, s, n] = tones[b.dataset.k];
    $('.tone-out').innerHTML = `<p class="label">Goal · ${g}</p><p class="stmt">${s}</p><p>${n}</p>`;
  }));

  // Before / after flips
  $$('.flip').forEach(f => f.addEventListener('click', () => { const on = f.getAttribute('aria-pressed') !== 'true'; f.setAttribute('aria-pressed', on); $('.label', f).textContent = on ? 'After' : 'Before'; }));

  // Copy checker
  const lin = $('.lint-in');
  if (lin) {
    const bad = ['synergy', 'leverage', 'holistic', 'cutting-edge', 'cutting edge', 'world-class', 'world class', 'best-in-class', '10x', 'crush', 'game-changer', 'game changer', 'reach out', 'touch base', 'circle back', 'passionate', 'solutions', 'unlock', 'revolutionary', 'affordable', 'cheap', 'click here', 'learn more', 't-mobile'];
    const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    const run = () => {
      const t = lin.value, hits = [];
      let h = esc(t);
      bad.forEach(w => { const re = new RegExp(`\\b${w.replace(/[-]/g, '[- ]?')}\\w*`, 'gi'); if (re.test(t)) { hits.push(w); h = h.replace(re, m => `<mark>${m}</mark>`); } });
      const emo = (t.match(/\p{Extended_Pictographic}/gu) || []).length, ex = (t.match(/!/g) || []).length;
      h = h.replace(/\p{Extended_Pictographic}|!/gu, m => `<mark>${m}</mark>`);
      const n = hits.length + emo + ex;
      $('.lint-out').innerHTML = `<p class="label">${n ? `${n} thing${n > 1 ? 's' : ''} to fix` : 'On voice'}</p><p style="color:var(--text)">${h || '…'}</p>` +
        (n ? `<p>${[hits.length && `Avoid: ${hits.join(', ')}`, emo && `${emo} emoji`, ex && `${ex} exclamation mark${ex > 1 ? 's' : ''}`].filter(Boolean).join(' · ')}. Say the actual result, with a number or a named client.</p>` : '<p>Short, plain and specific. Ship it.</p>');
    };
    lin.addEventListener('input', run); run();
  }

  // Logo subtraction
  const sr = $('.sub-range');
  if (sr) {
    const art = $('.sub-art'), out = sr.nextElementSibling, name = $('.sub-name');
    const draw = () => { const v = +sr.value; out.textContent = `${v}px`;
      const [cls, n] = v >= 280 ? ['s-lock', 'Master lockup'] : v >= 120 ? ['s-wm', 'N + wordmark'] : v >= 24 ? ['s-n', 'N mark'] : ['s-tile', 'N tile (favicon)'];
      [...art.children].forEach(c => { c.classList.toggle('on', c.classList.contains(cls)); c.style.width = c.classList.contains('s-tile') ? '' : `${v}px`; });
      art.style.setProperty('--sz', `${v}px`); name.textContent = n; };
    sr.addEventListener('input', draw); draw();
  }

  // Nebtune backgrounds
  const nb = $('.nb');
  if (nb) {
    const fx = $('.nb-fx', nb), st = { kind: 'wave', speed: 1, k: 1, rings: 2, dens: 28 };
    const size = () => { const r = nb.getBoundingClientRect(); nb.style.setProperty('--w', `${r.width}px`); nb.style.setProperty('--h', `${r.height}px`); nb.style.setProperty('--scale', (r.width / 1920).toFixed(4)); return r; };
    const i = s => { const e = document.createElement('i'); Object.assign(e.style, s); return e; };
    const mask = (e, m, extra = {}) => Object.assign(e.style, { WebkitMaskImage: m, maskImage: m, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', ...extra });
    const build = () => {
      const r = size(), s = r.width / 1920, sp = Math.max(.1, st.speed), k = st.k; fx.innerHTML = '';
      if (st.kind === 'wave') {
        const e = i({ opacity: Math.min(1, .9 * k), animation: `nbWave ${(10 / sp).toFixed(2)}s cubic-bezier(.4,0,.2,1) infinite` });
        mask(e, 'linear-gradient(135deg,transparent 0%,transparent 36%,rgba(0,0,0,.35) 44%,#000 50%,rgba(0,0,0,.35) 56%,transparent 64%,transparent 100%)', { WebkitMaskSize: 'calc(var(--w)*2) calc(var(--h)*2)', maskSize: 'calc(var(--w)*2) calc(var(--h)*2)' }); fx.append(e);
      } else if (st.kind === 'ripple') {
        const n = st.rings, dur = 12 / sp;
        for (let j = 0; j < n; j++) { const e = i({ opacity: 0, animation: `nbRipple ${dur.toFixed(2)}s cubic-bezier(.4,0,.2,1) ${(-(dur / n) * j).toFixed(2)}s infinite` });
          mask(e, 'radial-gradient(circle closest-side,transparent 78%,rgba(0,0,0,.4) 88%,#000 94%,rgba(0,0,0,.4) 98%,transparent 100%)', { WebkitMaskPosition: '50% 50%', maskPosition: '50% 50%' });
          const w = document.createElement('div'); w.style.cssText = `position:absolute;inset:0;opacity:${Math.min(1, .9 * k)}`; w.append(e); fx.append(w); }
      } else if (st.kind === 'tide') {
        const e = i({ opacity: Math.min(1, .9 * k), animation: `nbTide ${(14 / sp).toFixed(2)}s cubic-bezier(.4,0,.2,1) infinite, nbBreathe ${(7 / sp).toFixed(2)}s cubic-bezier(.4,0,.2,1) infinite` });
        mask(e, 'linear-gradient(0deg,transparent 0%,rgba(0,0,0,.35) 30%,#000 50%,rgba(0,0,0,.35) 70%,transparent 100%)', { WebkitMaskSize: 'var(--w) var(--h)', maskSize: 'var(--w) var(--h)' }); fx.append(e);
      } else {
        let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        const w = document.createElement('div'); w.style.cssText = `position:absolute;inset:0;opacity:${Math.min(1, .95 * k)}`;
        for (let j = 0; j < st.dens; j++) {
          const x = (Math.round(rnd() * 34) * 56 + 28) * s, y = (Math.round(rnd() * 19) * 56 + 28) * s, rad = (90 + Math.round(rnd() * 140)) * s, dur = (7 + rnd() * 6) / sp;
          const e = i({ opacity: 0, animation: `nbFlicker ${dur.toFixed(2)}s cubic-bezier(.4,0,.2,1) ${(-rnd() * dur).toFixed(2)}s infinite` });
          mask(e, `radial-gradient(circle ${rad}px at ${x}px ${y}px,#000 0%,rgba(0,0,0,.5) 40%,transparent 100%)`); w.append(e);
        }
        fx.append(w);
      }
      $('.nb-extra').hidden = st.kind !== 'ripple'; $('.nb-extra2').hidden = st.kind !== 'constellation';
    };
    const bind = (sel, key, fmt) => { const r = $(sel); r.addEventListener('input', () => { st[key] = +r.value; r.nextElementSibling.textContent = fmt(r.value); build(); }); };
    bind('.nb-speed', 'speed', v => `${v}×`); bind('.nb-int', 'k', v => `${v}×`); bind('.nb-rings', 'rings', v => v); bind('.nb-dens', 'dens', v => v);
    $$('.nb-seg button').forEach(b => b.addEventListener('click', () => { $$('.nb-seg button').forEach(x => x.setAttribute('aria-pressed', x === b)); st.kind = b.dataset.nb; build(); }));
    const pz = $('.nb-pause'); pz.addEventListener('click', () => { const on = !nb.classList.contains('paused'); nb.classList.toggle('paused', on); pz.setAttribute('aria-pressed', on); pz.textContent = on ? 'Play' : 'Pause'; });
    $('.nb-full').addEventListener('click', () => (nb.requestFullscreen || nb.webkitRequestFullscreen || (() => {})).call(nb));
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 150); }); nb.addEventListener('fullscreenchange', () => setTimeout(build, 50));
    build();
  }

  // Motion token demos
  const mo = () => {
    $$('.mo-reveal span').forEach((s, j) => s.animate([{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: j * 140, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
    const w = ($('.mo-ease')?.clientWidth || 200) - 20;
    $('.mo-ease .e1')?.animate([{ transform: 'none' }, { transform: `translateX(${w}px)` }], { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
    $('.mo-ease .e2')?.animate([{ transform: 'none' }, { transform: `translateX(${w}px)` }], { duration: 900, easing: 'linear', fill: 'both' });
  };
  const calmNow = () => document.documentElement.classList.contains('calm') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ($('.mo-reveal')) { $('.mo-replay').addEventListener('click', () => calmNow() ? toast('Reduced motion is on') : mo());
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting && !calmNow()) { mo(); o.disconnect(); } })).observe($('.mo-reveal')); }

  // Count-up stats
  $$('[data-count]').forEach(el => new IntersectionObserver((es, o) => es.forEach(e => { if (!e.isIntersecting) return; o.disconnect(); if (calmNow()) return;
    const n = +el.dataset.count, suf = el.dataset.plain !== undefined ? '' : '+', t0 = performance.now();
    const f = t => { const p = Math.min(1, (t - t0) / 1400), v = Math.round(n * (1 - Math.pow(1 - p, 4))); el.textContent = v + (p === 1 ? suf : ''); p < 1 && requestAnimationFrame(f); }; requestAnimationFrame(f);
  })).observe(el));

  // Viewport meter
  const vw = $('.vp-w');
  if (vw) { const d = () => { const w = innerWidth; vw.textContent = `${w}px`;
      $('.vp-bp').textContent = w < 760 ? 'Phone: single column, swipe rails, menu in a dialog' : w < 860 ? 'Tablet: two columns' : w < 1000 ? 'Desktop: centred nav links' : 'Wide: sidebar and full layout';
      $('.vp-mark').style.left = `${Math.min(100, w / 1440 * 100)}%`; }; addEventListener('resize', d); d(); }

  // Prompt copy
  const cp = $('.copy-prompt'); cp && cp.addEventListener('click', () => copy($('.prompt-text').innerText.trim(), 'the AI voice profile'));

  // QA checklist (remembered per device)
  const qa = $$('.qa input');
  if (qa.length) { let saved = []; try { saved = JSON.parse(localStorage.getItem('npc-qa') || '[]'); } catch {}
    const c = () => { const n = qa.filter(x => x.checked).length; $('.qa-count').textContent = n === qa.length ? 'Ready to ship.' : `${n} of ${qa.length}`; try { localStorage.setItem('npc-qa', JSON.stringify(qa.map(x => x.checked))); } catch {} };
    qa.forEach((x, j) => { x.checked = !!saved[j]; x.addEventListener('change', c); }); c(); }
})();
