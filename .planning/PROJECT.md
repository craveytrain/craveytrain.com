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

- [ ] Warm Editorial design system applied to all pages
- [ ] Homepage with hero, about, and recent writing sections
- [ ] Now page with section-grid layout
- [ ] Posts listing grouped by year
- [ ] Single post page with sidebar metadata
- [ ] Colophon page with section-grid layout
- [ ] Uses page with section-grid layout
- [ ] Static tag pages at `/tags/{tag}/`
- [ ] Mobile responsive at 768px breakpoint
- [ ] Typography system (Fraunces/Inter)

### Out of Scope (v9.2)

- Client-side tag filtering JS — defer to future enhancement
- Now page archive prev/next styling — defer if needed
- Dark mode — not in design prototypes

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

**Design assets (v9.2 source):**

- 4 HTML template prototypes in `/redesign/` folder
- Design handoff document (`craveytrain-design-handoff.md`)
- Mobile hero options — Option C (avatar inline) selected

## Constraints

- **Tech stack**: Eleventy (11ty) — no change
- **No breaking changes**: Existing blog posts and URLs continue to work

## Key Decisions

| Decision                        | Rationale                                                     | Outcome |
| ------------------------------- | ------------------------------------------------------------- | ------- |
| Content before design           | Restructure pages first, apply visual design later            | Good    |
| Single stacked colophon page    | Updates rarely, short entries — archive machinery overkill    | Good    |
| Separate content from redesign  | Keeps projects focused, easier to complete and verify         | Good    |
| Footer nav via 'foot' tag       | Site architecture uses footer-only navigation                 | Good    |
| override:tags for collections   | Prevents data cascade tag merging, clean collection isolation | Good    |
| Skip colophon URL redirects     | User decided old blog post URLs can 404                       | Good    |
| Static tag pages over JS filter | Simplifies v9.2 scope, JS filter is future enhancement        | —       |
| Mobile hero Option C            | Avatar inline, text-forward, compact layout                   | —       |

## Current Milestone: v9.2 Visual Refresh

**Goal:** Apply Warm Editorial design system to all pages using prototypes in `/redesign/`.

**Target features:**

- New visual identity with terracotta accent and cream backgrounds
- Fraunces/Inter typography system
- 200px/1fr editorial grid layout across all pages
- Mobile-first responsive design (768px breakpoint)
- Static tag pages replacing inline tag chips

---

_Last updated: 2026-02-09 after v9.2 milestone start_
