# NPC Digital Style Guide: sprint plan

**Goal:** Ship NPC's complete brand style guide twice: as one Markdown source of truth (`brand/STYLE-GUIDE.md`) and as a click-through digital guide (static site) that shows what paper can't: live motion, live tokens, copyable values, contrast checks and interactive voice tools.
**Rule:** report the NPC brand exactly as built (npc-design-system + npc-homepage-redesign, 2026 direction). Do not change the visual style.
**Team:** Claude (strategy answers on Nabil's behalf, build) + Nabil (review, sign-off).
**Repo:** github.com/NabilPervez/npc-style-guide. Commit and push `main` at the end of every sprint.
**Deploy:** Netlify, linked to the GitHub repo, publish directory `site`, no build step.

## Global Definition of Done
- [ ] Every claim is real (resume, portfolio, homepage, design system); anything decided on Nabil's behalf is logged in `brand/decisions.md`
- [ ] Only NPC tokens: Outfit only, closed scale 62/32/24/22/18/16/14/13, ink + one gold gradient, hairlines not shadows, 20/14/999 radii
- [ ] No horizontal scroll at 375px and 1280px; tap targets 44px+
- [ ] Content readable without JS; `prefers-reduced-motion` stops every animation
- [ ] No console errors
- [ ] Committed and pushed to `main`

## Sprint 1: Strategy and the written guide
**Goal:** The whole guide exists as Markdown.
| P | Item |
|---|---|
| P0 | `brand/brief.md`: the Creative Brief V4, all six phases answered with a Why |
| P0 | `brand/01-story.md`, `02-strategy.md`, `03-pyramid.md`, `04-voice.md` |
| P0 | `brand/05-visual.md`: logo, colour, type, pattern, motion, layout, components, imagery, channels, governance (reported from the design system) |
| P0 | `brand/decisions.md`, `brand/STATUS.md`, compiled `brand/STYLE-GUIDE.md` |
**DoD:** every checklist section (0–13) is filled or marked N/A with a reason.

## Sprint 2: Site shell and every page
**Goal:** A click-through guide with one page per chapter.
| P | Item |
|---|---|
| P0 | Static site in `site/`: design-system tokens copied verbatim, assets copied from the repo |
| P0 | Shared layout: frosted nav, chapter sidebar/drawer, prev/next pager, colophon |
| P0 | Pages: Home, Story, Strategy, Pyramid, Voice, Logo, Colour, Type, Pattern & Motion, Layout, Components, Imagery, Channels, AI & Governance, Downloads |
**DoD:** every page reachable by click and by keyboard; phone drawer works.

## Sprint 3: Digital-only features
**Goal:** Show what only a screen can show.
| P | Item |
|---|---|
| P0 | Motion lab: the four Nebtune backgrounds (Wave, Ripple, Tide, Constellation) running live with speed/intensity controls, plus reveal, press, shimmer and drift demos with replay |
| P0 | Click-to-copy on every colour, token and gradient |
| P1 | Live contrast checker on the palette; type-scale tester with editable text |
| P1 | Interactive pyramid; voice sliders; before/after rewrite toggle; tone-by-context switcher |
| P2 | Reduced-motion preview toggle |
**DoD:** every demo has a pause/replay control and a reduced-motion state.

## Sprint 4: QA, README, deploy
| P | Item |
|---|---|
| P0 | Check 375 / 768 / 1280, no-JS, reduced motion, console |
| P0 | README (what it is, how to edit, how it deploys) |
| P0 | Netlify site linked to GitHub, auto-deploy from `main` |

## Status
- Sprint 1: done
- Sprint 2: done
- Sprint 3: done
- Sprint 4: done (see README for the live URL)
