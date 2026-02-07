# Phase 1: Now Page System - Context

**Gathered:** 2026-02-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Create now page system with current content at `/now/`, dated archives at `/now/<date>.html`, and archive listing at `/now/archive/`. Users can see current focus areas and browse previous updates. Adding the now page to site navigation is included.

</domain>

<decisions>
## Implementation Decisions

### Content structure

- Five default focus areas: Work, Building, Learning, Reading, Life (flexible per update)
- Content length: brief bullets and/or a few sentences per section (long content becomes blog post)
- Tone: casual/personal — user will review before publishing
- Visible headers for each section (h2/h3 for Work, Building, etc.)
- User writes all content — Claude sets up structure and templates

### Date handling

- Short date format throughout: "Feb 6, 2026"
- Date appears as subtle byline near top of page
- Date in frontmatter is written date (set once, not updated after commit)
- Minor edits don't change the date — it's "as of" that writing date
- No fixed update schedule — update when content feels stale
- Archive URLs use exact ISO date: `/now/2026-02-06.html`

### Archive navigation

- Archive listing at `/now/archive/` shows date + brief auto-generated summary
- Newest first in archive listing
- Previous/next links at bottom of archived pages
- Link text: "Previous" and "Next" (date optional)
- No extra "archived version" banner — date speaks for itself
- Previous/next navigation is sufficient — no separate "view current" link
- Current `/now/` page links to archive

### Page identity

- Title: "What I'm Doing Now"
- Brief intro at top before sections, following nownownow.com style: "This is a now page. If you have your own site, you should make one too."
- Link to nownownow.com within intro text
- "Now" appears in site navigation

### Claude's Discretion

- Placement of "View previous updates" link on current now page
- Nav order placement for "Now" link
- Archive page title
- Auto-generation method for archive listing summaries

</decisions>

<specifics>
## Specific Ideas

- Intro style from nownownow.com template: "This is a now page. If you have your own site, you should make one too."
- Keep it scannable — if something deserves elaboration, it becomes a blog post

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 01-now-page-system_
_Context gathered: 2026-02-06_
