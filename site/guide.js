// NPC style guide: shell behaviour (menu, reveal, toast, reduced-motion preview).
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const menu = $('#menu');
  $$('[data-open-menu]').forEach(b => b.addEventListener('click', () => menu.showModal()));
  $$('[data-close-menu]').forEach(b => b.addEventListener('click', () => menu.close()));
  menu?.addEventListener('click', e => { if (e.target === menu) menu.close(); });

  // Reveal on scroll: fade + 30px rise, 140ms stagger within a group
  const io = 'IntersectionObserver' in window && new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 140}ms`; io ? io.observe(el) : el.classList.add('in'); });

  // Toast
  const toast = $('.toast'); let tt;
  window.npcToast = msg => { toast.textContent = msg; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('on'), 1800); };

  // Reduced-motion preview
  const calm = () => { try { return localStorage.getItem('npc-calm') === '1'; } catch { return false; } };
  const setCalm = on => {
    document.documentElement.classList.toggle('calm', on);
    $$('[data-calm]').forEach(b => { b.setAttribute('aria-pressed', on); b.textContent = on ? 'Motion off: turn back on' : 'Preview reduced motion'; });
    try { localStorage.setItem('npc-calm', on ? '1' : '0'); } catch {}
  };
  setCalm(calm());
  $$('[data-calm]').forEach(b => b.addEventListener('click', () => setCalm(!document.documentElement.classList.contains('calm'))));
})();
