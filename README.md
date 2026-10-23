# NPC Digital Style Guide

The brand style guide for **Nabil Pervez Consulting (NPC)**: Brand · Web · AI · Product. *Done right.*

- **Live:** https://npc-style-guide.netlify.app
- **Markdown source of truth:** [`brand/STYLE-GUIDE.md`](brand/STYLE-GUIDE.md)
- **Design system it reports:** [NabilPervez/npc-design-system](https://github.com/NabilPervez/npc-design-system) · reference build [npc-homepage-redesign](https://npc-homepage-redesign.netlify.app)

## What's in it
| Path | What |
|---|---|
| `brand/brief.md` | Creative Brief V4, six phases, every answer with a why |
| `brand/01-story.md` … `04-voice.md` | Story, strategy, pyramid, voice (incl. AI voice profile) |
| `brand/05-visual.md` | Logo, colour, type, pattern, motion, system, channels, governance |
| `brand/decisions.md` | Choices made on Nabil's behalf, awaiting sign-off |
| `brand/STATUS.md` | Tracker and open questions |
| `brand/STYLE-GUIDE.md` | Everything compiled into one file |
| `site/` | The click-through digital guide (15 pages, static, no build) |
| `src/pages/` | Page sources; `build.py` wraps them in the layout and renders the Markdown |

## Screen-only features
Live Nebtune motion backgrounds (Wave, Ripple, Tide, Constellation) with controls · motion-token demos · click-to-copy colours and tokens · WCAG contrast checker · type-scale tester · interactive pyramid and competitive map · voice dials, tone switcher, before/after, copy checker · logo subtraction slider · viewport meter · AI prompt copy · QA checklist · reduced-motion preview.

## Editing
1. Edit `brand/*.md` (content) or `src/pages/*.html` (layout and demos).
2. If you changed sections, recompile the Markdown guide (see the Sprint 1 commit) and run `python3 build.py` (needs `pip install markdown`).
3. Commit and push `main`. Netlify publishes `site/` (see `netlify.toml`).

## Rules this site follows
Outfit only · closed scale 62/32/24/22/18/16/14/13 · ink + one gold gradient per view · hairlines, no shadows · 20/14/999 radii · fades and reveals only · reduced motion stops everything · readable without JS · checked at 375 and 1280.

See `SPRINTS.md` for the plan and Definition of Done.
