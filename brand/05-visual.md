# 5–13. Visual Identity, System and Governance
Reported from **npc-design-system** (2026 direction, 23 Oct 2026) and the live **npc-homepage-redesign**. Nothing here changes the style; gaps the system didn't cover are filled and marked **(new rule, D-xx)**.

## 5. Logo suite
### The marks
| Asset | What it is | Use |
|---|---|---|
| **Gold N ("Nebtune")** `mark-nebtune-gold*.png` | The gold N glyph | Primary icon: hero, closing band, favicon, avatar, video sting |
| **N tile** | Gold N in an 8px-radius ink square | Nav, app icon, social avatar |
| **NPC monogram** `monogram-npc-*.png` | Serif "NPC" letters | Document corners, footers, small avatars |
| **NABIL PERVEZ wordmark** `wordmark-nabil-pervez-*.png` | Letterspaced display serif (Prata) | Founder-brand lockup: business card, speaker slides, signature |
| **Master lockup** `brand-card-lockup.png` | N + NABIL PERVEZ + "CONSULTING" line on the split lattice/clear-field card | Business card, OG image, title slides |
**Tints for every mark:** gold, gold-bright, gold-deep, white, ink, paper. Teal (#48A3C2) is **retired** (legacy Nebtune only).

### Hierarchy of subtraction
Master lockup → N + wordmark → N mark → N tile (≤32px). **The N must survive at every scale.**

### Clear space and minimum size (new rule, D-07)
- Clear space on all sides = the width of the N's stem ×2 (≈ ¼ of the N's height). Nothing (type, image, pattern edge) enters it.
- Minimum sizes: N mark 24px digital / 8mm print; N tile 16px (favicon); monogram 48px wide; wordmark 120px wide; master lockup 280px wide.

### On backgrounds
| Ground | Mark tint |
|---|---|
| Ink #07101F / #0D1522 | gold, gold-bright, white |
| Paper #EEF2FA / white | gold-deep, ink |
| Gold fill | ink |
| Photography | white or gold over a dark, calm area only |

### Never
Redraw, re-letter or invent a logo · stretch, skew or rotate · add shadows, glows, outlines or bevels · recolour outside the six tints · put the mark on busy imagery · lock up with a client or partner logo · animate the letterforms apart. **Client marks:** never reconstructed; clients are typeset names until licensed art exists.

### Asset usage matrix
| Mark | Site nav | Hero | Social avatar | Deck | Proposal/SOW | Business card | Video | Merch |
|---|---|---|---|---|---|---|---|---|
| N tile | ✓ | | ✓ | ✓ | | | | |
| Gold N | | ✓ | | ✓ | | ✓ | ✓ | ✓ |
| NPC monogram | | | ✓ | ✓ | ✓ | | | ✓ |
| NABIL PERVEZ wordmark | | | | ✓ | ✓ | ✓ | ✓ | |
| Master lockup | | | | Title | Cover | ✓ | Intro | |

## 6. Colour
### Core palette
| Token | Hex | Role | Contrast on ink |
|---|---|---|---|
| Ink `--ink-950` | #07101F | Page ground, theme colour | n/a |
| Ink-2 `--bg-card` | #0D1522 | Raised surface, brand-card ground | n/a |
| Ink-3 `--bg-tile` | #121C2C | Tile/card tops | n/a |
| Hairline `--border` | #1C2638 | 1px dividers | n/a |
| Hairline strong | #26324A | Pills, buttons | n/a |
| Text `--text` | #E2EAF4 | Headlines, primary text | 15.7:1 AAA |
| Muted `--text-muted` | #8D9CB4 | Body copy, grey half of headlines | 6.8:1 AA |
| Faint `--text-faint` | #5E718F | Captions, client names at rest | 3.8:1 *large text / non-essential only* |
| Champagne `--label` | #AB9563 | Uppercase labels, the lattice | 6.5:1 AA |
| Gold `--gold-300` | #DDB84A | Screen brand gold | 10.0:1 |
| Gold bright `--gold-200` | #F0CC6A | Links | |

### The gold gradient: one per view
`linear-gradient(120deg, #F5D97A 0%, #DDB84A 40%, #C88B20 75%, #E8B840 100%)`
Use it for **one** thing per view: the highlighted word, the primary button, or the recommended card. Ink text on gold = 10:1.

### Offering colours: meaning, never decoration
| Offering | Ground | A | B | C |
|---|---|---|---|---|
| Brand | #2A1E06 | #DDB84A | #C88B20 | #F5D97A |
| Web | #0B1C3A | #3E7BE0 | #7FA8F0 | #B9D0F7 |
| AI | #140F33 | #6C5CE7 | #5FD3E8 | #A79BF5 |
| Product | ink | gold hairline wireframe | | |

### Light theme (print and documents)
Paper #EEF2FA / #F8FBFF, ink text, gold-deep #9A6A10 for accents.
**Finding:** #9A6A10 on #EEF2FA measures 4.2:1, AA for large text only. Use it for headlines and marks on paper, not body text (D-08).

### Print
Business card (from the PDF): ink #131921, panel #2C2E35, champagne #AC9760. 3.5×2in, 3.75×2.25in with bleed.

### Usage ratio
~85% ink grounds · ~12% text and hairlines · ≤3% gold. Offering colours only inside their own tile, pill or dot.

## 7. Typography
**One family: Outfit** (Google Fonts), three weights with fixed jobs: **600** display · **500** UI, labels, buttons · **400** prose.
**Prata** survives only inside the NABIL PERVEZ wordmark artwork. Cormorant Garamond is retired from screens.

### Closed scale (no other sizes)
| Size | Token | Use |
|---|---|---|
| 62 | `clamp(34px, 8.6vw, 62px)` | Hero and closing band only |
| 62 stat | `clamp(44px, 13vw, 62px)` | Big numbers |
| 32 | `clamp(24px, 5.4vw, 32px)` | Statements, offering names, big card titles |
| 24 | `clamp(22px, 1.67vw, 24px)` | Section titles (they stay small) |
| 22 | 22px | Card titles |
| 18 | 18px | h3, ledes, quotes |
| 16 | 16px | Body |
| 14 | 14px | Secondary body, nav, captions |
| 13 | 13px | Labels (uppercase, .14em), pills, metadata |

**Details:** headline tracking −0.027em; line-height 1.04 display / 1.6 body; `text-wrap: balance` on titles, `pretty` on paragraphs; ledes ≤34ch. **Two-tone headlines:** white statement + muted continuation, 3–6 words, ending with a period. Gold-gradient text marks one word at most.

## 8. Visual language
### The circle lattice
Interlocking circles, champagne #AB9563 stroke 1.3px, **88px tile** (56px in the hero on phones, 80px desktop). It's the only ornament. It means "many disciplines, one system." It is animated only in the hero and closing band; elsewhere it sits faint (12–28%) and masked toward content.

### Imagery
- **Work:** real portfolio pieces as photo tiles (14px radius) in the bento reel, with frosted caption pills naming client + offering.
- **Portrait:** clean, editorial, dignified portrait of Nabil next to a statement. Natural light, plain dark ground, no props.
- **Line drawings:** literal and spare: hairline strokes, one gold accent, drawn on when revealed (step cards, trophy).
- **Never:** stock handshakes, glowing AI brains, robots, neon, lens flare, or another brand's imagery.

### Iconography (new rule, D-09)
Hairline icons (1.5px stroke, round caps), `currentColor`, sizes 13–14 (buttons), 18 (contact rows), 24 (cards). Glyphs in use: gold ★ on awards, — as bullet marker, ↗ on outbound links. No emoji.

### Motion
| Element | Spec |
|---|---|
| Easing | `cubic-bezier(.16, 1, .3, 1)` |
| Reveal | opacity 0→1 + 30px rise, 900ms, 140ms stagger |
| Hover | colour/opacity 400–500ms |
| Press | scale(.97) |
| Hero rings | two rings ripple outward over 12s, offset half a cycle |
| Gold N | breathes (brightness 1→1.18) every 6s |
| Gold text | shimmer, 6s linear loop |
| Loops | client names, work reel, testimonials drift slowly; pause on hover, focus, touch; pause button |
| Reduced motion | everything stops; loops become one static set; content visible without JS |
| Retired | hover lift, shine sweep, sibling dimming |

### Nebtune motion backgrounds (video, streams, presentations)
Four 1920×1080 looping backgrounds built for screens: ground #0D1522, the champagne lattice at 56px muted to 13%, a brightened gold lattice revealed through an animated mask, and a light noise layer.
| Name | Motion | Default loop | Controls |
|---|---|---|---|
| **Wave** | A diagonal band of gold sweeps corner to corner | 10s | speed, intensity |
| **Ripple** | Rings of gold expand from the centre | 12s | speed, intensity, rings 1–4 |
| **Tide** | A horizontal band rises bottom to top while breathing | 14s (breathe 7s) | speed, intensity |
| **Constellation** | Points of the lattice flicker gold at random | 7–13s each | speed, intensity, density 6–60 |
**Rule:** grain is allowed *only* in these broadcast backgrounds; web pages stay grain-free (D-10).

## 9. Digital design system
- **Repo:** github.com/NabilPervez/npc-design-system (tokens/*.css, components, guidelines, PROMPT.md, SKILL.md). Reference build: npc-homepage-redesign.
- **Layout:** container 1240px; gutter `clamp(20px, 5vw, 96px)`; section padding `clamp(72px, 12vh, 160px)`; nav 64px; spacing ladder 8/12/16/24/32/40/64; breakpoints 760 / 860 / 1000; design starts at 375px.
- **Surfaces:** hairlines, not shadows. Radii 20 cards · 14 photo tiles · 8 N tile · 999 every pill and button. Blur only on the frosted nav (rgb(7 16 31 / .82) + blur 18px) and caption pills.
- **Components:** frosted nav (N tile + NPC, centred links, gold pill CTA; phone: gold "Book now" + menu in a native `<dialog>`) · card hero · proof strip (count-up stats + two client rows drifting opposite ways) · scroll-fill statement + proof object · four-way lattice tile (2×2 offerings; swipe rail with dots on phones) · two buy cards (project / retainer, recommended one solid gold) · bento work reel (tall .62H, stack .9H, wide 1.4H, square H) · step cards with line drawings · testimonial drift · portrait + statement · closing band · colophon footer.
- **Forms (new rule, D-11):** 48px pill inputs, ink-2 fill, #26324A hairline, gold focus ring rgba(220,180,80,.55) 2px offset; label above in 13px uppercase champagne; errors in plain words under the field.
- **Accessibility:** WCAG 2.2 AA target; skip link; visible focus ring; 44px tap targets; reduced motion; no-JS rendering; alt text on every tile; never colour alone for meaning (offerings also carry their name).

## 10. Channels
| Channel | Rules |
|---|---|
| **Website** | The homepage is the reference. Phone first. Main CTA lives in the phone nav. One idea per section. |
| **LinkedIn** | Nabil in first person. Contrarian opener → fix → proof. Images: work tiles or lattice cards with a two-tone headline. No emoji, no hashtags walls (max 3). |
| **Social graphics** | 1080×1350 ink card, faint lattice, 13px label, 32px two-tone headline, N tile bottom-left. |
| **Email signature** | Nabil Pervez · Founder, NPC · Brand · Web · AI · Product · Book a call ↗. Text only, no images. |
| **Proposal / SOW** | The SOW is the proposal. Paper theme, monogram top-left, sections: Problem → Scope → Price → Timeline → Terms. |
| **Decks** | Ink slides, master lockup on title, one idea per slide, closed type scale, gold on one element per slide. Background: a Nebtune loop at 50% intensity. |
| **Video** | Intro: Nebtune Ripple + gold N fade-in (2s). Lower thirds: 13px label + 18px name on ink-2 pill. |
| **Business card** | Front: master lockup on split lattice/clear field. Back: contact on ink. |
| **Events / speaking** | Speaker CTA: "Book Nabil". Badge: N tile + name in Outfit 600. |

## 11. Applications
Live: homepage (npc-homepage-redesign.netlify.app), business card, this digital guide, the design-system site. Planned mockups: deck template, LinkedIn banner, proposal cover, social card set, video intro.

## 12. AI & governance
- **Starter prompt:** `PROMPT.md` in the design-system repo; the AI voice profile in section 4.
- **Body of work (on-brand references):** homepage hero, offerings tile, buy cards, how-it-works, closing band, business card, Quantinex SOW.
- **AI usage policy:** AI may draft copy, code, layouts and imagery inside these rules; a human (Nabil) reviews every client-facing output; no AI-generated client logos, testimonials or stats; disclose AI use when a client asks.
- **Legal:** client names typeset only; no licensed client art in use; Outfit (SIL OFL) and Prata (SIL OFL) are free for commercial use; portfolio work shown as past work, credited to the agency where made (AOE Creative).
- **Assets:** npc-design-system/assets. Naming: `<mark>-<name>-<tint>.png`.
- **Approval:** Nabil approves; 48-hour feedback window; this guide is versioned in git.
- **Brand QA checklist:** one font · closed scale · one gold per view · hairlines, no shadows · 375 and 1280 checked · reduced motion · no-JS · real proof only · no T-Mobile · no emoji.

## 13. Contact
**Nabil Pervez**, Founder & Principal Consultant
nabilpervezconsulting@gmail.com · Dallas–Fort Worth, TX
Book a 20-minute call: calendar.app.google/VbQNoKnwrgNyx6kRA
