# Phase 4 — Documentary Experience & Completeness Sweep

## Completeness audit vs www.aheadinitiatives.in — what was missing, now included

| Missing from the clone | Recovered from | Now |
|---|---|---|
| **Rathnadeep De (1957–2021), Founder & Inspirer, MD 2009–2021** | support.html | Memorial card opening the People section; `founder` group added to schema |
| 27 board/team **portrait photographs** | support.html | Linked to every person; rendered in the People grid |
| **14 documentaries** ("Stories of Hope and Initiative") | av1.html | Media chapter, poster cards, verbatim titles/descriptions |
| **52 "Learning for All" films** (Bengali educational library) | av2.html | Media chapter, expandable index of all 52 |
| **111 Education-initiative photographs** | g1.html | Field Stories filmstrip |
| **80 Food & Nutrition photographs** | g2.html | Field Stories filmstrip |
| Support-us text (verbatim) | support.html | Contact chapter body + interstitial pull-quote |
| Media & Field chapters previously draft | — | Published, now that verified content exists |

Everything was seeded verbatim — titles, descriptions, and file URLs exactly as
they appear on the legacy site (files remain hosted there; each is one row in
the media library, so AHEAD can migrate them to Drive later from the admin).

**Still to add via the admin panel (not fabricated):** av3 (Other Languages),
av4 (Miscellaneous), g3 (Open Learning), g4 (Miscellaneous) — same pattern as
the pages above; and the partner list, which on the legacy site is a single
image with no extractable names.

## Documentary experience

- **Hero**: slow Ken Burns drift on each photograph, counting-up statistics,
  and a "Scroll to begin" cue — the page announces itself as one guided film.
- **Interstitial pull-quote**: one verified sentence from AHEAD's own support
  page, full-frame on ink, before the closing chapter.
- **Field Stories**: two swipeable photographic filmstrips (191 field
  photographs) with scroll-snap, arrows, and lazy loading.
- **Media**: AHEAD's own film archive — documentary poster cards plus the
  52-film Learning-for-All index — followed by the YouTube grid.
- **People**: portraits throughout, founder memorial first.
- All motion (Ken Burns, count-up, filmstrips, reveals, bounce cue) is fully
  disabled under `prefers-reduced-motion`; galleries are keyboard-scrollable;
  every interactive element keeps a visible focus ring.

## Verified
`eslint` clean · `tsc` clean · full `next build` (25 pages) compiling with the
usual sandbox stubs. Database now holds **284 media items** (191 gallery
photos, 66 films, 27 portraits) — all live behind the same RLS.
