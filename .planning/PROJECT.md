# craveytrain.com

## What This Is

Personal website for Mike Cravey with blog posts, now page system with archives, consolidated colophon history, and uses page. Built with Eleventy static site generator.

## Core Value

A personal website that shares what I'm working on now, documents site evolution history, and showcases the tools I use.

## Requirements

### Validated

- Now page with current date and focus areas — v9.1
- Now page auto-latest at `/now/index.html` — v9.1
- Now page dated archives at `/now/<date>/` — v9.1
- Now page archive listing at `/now/archive/` — v9.1
- Colophon consolidated into single stacked page from 9 blog posts — v9.1
- Uses page added to site navigation — v9.1

### Active

(None currently — use `/gsd:new-milestone` to define next milestone)

### Out of Scope (Future Redesign Project)

- Warm Editorial visual design — separate project
- New templates (homepage, now, posts, single post) — separate project
- Mobile-first CSS rewrite — separate project
- Year-in-gutter layout for colophon — design work, separate project
- Typography changes (Fraunces/Inter) — separate project
- Tag filtering redesign — separate project

## Context

**Current State (v9.1 shipped 2026-02-09):**

- Eleventy 3.0 static site generator
- Now page system at `/now/` with archive and prev/next navigation
- Consolidated colophon at `/colophon/` with 9 versions and anchor links
- Uses page at `/uses/` in footer navigation
- Footer navigation pattern using 'foot' tag collection

**Existing assets:**

- Uses page at `site/uses.md`
- 9 colophon versions in `site/colophon/`
- Now pages in `site/now/`
- Codebase analysis in `.planning/codebase/`

**Future redesign assets (not used yet):**

- 4 HTML template prototypes in `/redesign/` folder
- Design handoff document (`craveytrain-design-handoff.md`)

## Constraints

- **Tech stack**: Eleventy (11ty) — no change
- **No breaking changes**: Existing blog posts and URLs continue to work

## Key Decisions

| Decision                       | Rationale                                                     | Outcome |
| ------------------------------ | ------------------------------------------------------------- | ------- |
| Content before design          | Restructure pages first, apply visual design later            | Good    |
| Single stacked colophon page   | Updates rarely, short entries — archive machinery overkill    | Good    |
| Separate content from redesign | Keeps projects focused, easier to complete and verify         | Good    |
| Footer nav via 'foot' tag      | Site architecture uses footer-only navigation                 | Good    |
| override:tags for collections  | Prevents data cascade tag merging, clean collection isolation | Good    |
| Skip colophon URL redirects    | User decided old blog post URLs can 404                       | Good    |

---

_Last updated: 2026-02-09 after v9.1 milestone_
