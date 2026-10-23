#!/usr/bin/env python3
"""Builds the NPC digital style guide: wraps src/pages/*.html in the shared layout -> site/*.html.
Run: python3 build.py   (output is committed; Netlify serves site/ with no build step)."""
import pathlib, html
ROOT = pathlib.Path(__file__).parent
PAGES = [  # (slug, number, title, group, lede)
  ("index", "", "Overview", "Start", "The NPC brand, live."),
  ("brief", "00", "Creative brief", "Start", "The why behind every choice."),
  ("story", "01", "Brand story", "Strategy", "Who we are and why we exist."),
  ("strategy", "02", "Strategy", "Strategy", "Who we serve and where we win."),
  ("pyramid", "03", "Brand pyramid", "Strategy", "Purpose up to promise."),
  ("voice", "04", "Voice and tone", "Strategy", "How NPC sounds."),
  ("logo", "05", "Logo", "Identity", "The marks and how to use them."),
  ("colour", "06", "Colour", "Identity", "Ink, one gold, four offerings."),
  ("type", "07", "Typography", "Identity", "One family, a closed scale."),
  ("motion", "08", "Pattern and motion", "Identity", "The lattice, alive."),
  ("imagery", "09", "Imagery and icons", "Identity", "Proof, portraits and line drawings."),
  ("system", "10", "Layout and components", "System", "The parts the site is built from."),
  ("channels", "11", "Channels", "System", "The brand, everywhere it shows up."),
  ("governance", "12", "AI and governance", "System", "Keep it right, at scale."),
  ("downloads", "13", "Downloads and contact", "System", "Files, links and who to ask."),
]

def toc(cur):
  out, grp = ['<ol class="toc">'], None
  for slug, n, t, g, _ in PAGES:
    if g != grp:
      out.append(f'<li class="grp">{g}</li>'); grp = g
    href = "./" if slug == "index" else f"{slug}.html"
    cur_attr = ' aria-current="page"' if slug == cur else ''
    out.append(f'<li><a href="{href}"{cur_attr}><span class="n">{n or "—"}</span>{t}</a></li>')
  return "\n".join(out + ["</ol>"])

def link(i):
  slug, n, t, *_ = PAGES[i]
  return ("./" if slug == "index" else f"{slug}.html"), t

TPL = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} · NPC Style Guide</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#07101F">
<link rel="icon" href="img/mark-nebtune-gold.png">
<link rel="stylesheet" href="ds/styles.css">
<link rel="stylesheet" href="guide.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="nav-bar"><div class="nav">
  <a class="brand" href="./"><span class="tile"><img src="img/mark-nebtune-gold.png" alt=""></span>NPC <small>Style guide</small></a>
  <a class="pill dl" href="STYLE-GUIDE.md" download>Download .md</a>
  <button class="menu-btn" aria-label="Open chapters" data-open-menu><span></span><span></span><span></span></button>
</div></header>
<dialog class="sheet" id="menu" aria-label="Chapters"><div class="sheet-in">
  <button class="pill sheet-close" data-close-menu>Close</button>
  {toc}
</div></dialog>
<div class="shell">
  <aside class="side" aria-label="Chapters">{toc}</aside>
  <main id="main"><div class="wrap">
{body}
  <nav class="pager" aria-label="Pages">{prev}{next}</nav>
  </div></main>
</div>
<footer class="colo"><span>© 2026 Nabil Pervez Consulting · Built on honesty. Driven by excellence.</span><span>Style guide v1.0 · 23 Oct 2026 · Brand · Web · AI · Product</span></footer>
<div class="toast" role="status" aria-live="polite"></div>
<script src="guide.js" defer></script>
<script src="live.js" defer></script>
</body>
</html>
"""

import re, markdown
def md(m):
  """<!--md:brand/file.md|Heading A|Heading B--> renders those H2 sections (or the whole file minus H1)."""
  path, *heads = m.group(1).split("|")
  text = (ROOT / path).read_text()
  text = re.sub(r"^# .*\n", "", text, count=1)
  if heads:
    parts = re.split(r"(?m)^(?=## )", text)
    text = "\n".join(p for p in parts if any(p.startswith("## " + h) for h in heads))
  h = markdown.markdown(text, extensions=["tables", "fenced_code"])
  h = h.replace("<table>", '<div class="tbl"><table>').replace("</table>", "</table></div>")
  h = h.replace("<pre>", '<pre class="card">')
  return f'<div class="md rv">{h}</div>'

def main():
  for i, (slug, n, title, grp, lede) in enumerate(PAGES):
    body = (ROOT / "src/pages" / f"{slug}.html").read_text()
    body = re.sub(r"<!--md:(.+?)-->", md, body)
    prev = next_ = ""
    if i > 0:
      h, t = link(i - 1); prev = f'<a href="{h}"><span>Previous</span><b>{t}</b></a>'
    else:
      prev = "<span></span>"
    if i < len(PAGES) - 1:
      h, t = link(i + 1); next_ = f'<a class="next" href="{h}"><span>Next</span><b>{t}</b></a>'
    out = TPL.format(title=html.escape(title), desc=html.escape(lede), toc=toc(slug), body=body, prev=prev, next=next_)
    (ROOT / "site" / f"{slug}.html").write_text(out)
  (ROOT / "site/STYLE-GUIDE.md").write_text((ROOT / "brand/STYLE-GUIDE.md").read_text())
  print("built", len(PAGES), "pages")

if __name__ == "__main__":
  main()
