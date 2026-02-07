---
phase: 01-now-page-system
plan: 03
subsystem: ui
tags: [eleventy, nunjucks, css, navigation]

# Dependency graph
requires:
  - phase: 01-01
    provides: Now page foundation with navigation
  - phase: 01-02
    provides: Archive system with prev/next links
provides:
  - Now link relocated to footer navigation
  - Styled prev/next navigation as horizontal flex layout
  - Fixed title double-escaping for special characters
affects: [phase-02, phase-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Footer navigation via 'foot' tag collection
    - Flexbox for horizontal navigation layout
    - Safe filter for preventing double HTML escaping

key-files:
  created: []
  modified:
    - site/now/index.md
    - layouts/page.njk
    - layouts/base.njk
    - includes/css/index.css

key-decisions:
  - "Use 'foot' tag instead of 'nav' for footer navigation collection"
  - 'Remove header nav from page.njk (site uses footer navigation only)'
  - 'Add | safe filter to prevent double escaping in pageTitle set block'

patterns-established:
  - "Navigation collections separated by tag: 'nav' for header (unused), 'foot' for footer"
  - 'CSS :only-child:last-child selector for single-item flexbox right alignment'

# Metrics
duration: 1.7min
completed: 2026-02-07
---

# Phase 01 Plan 03: Gap Closure Summary

**Fixed UAT-diagnosed issues: Now link in footer nav, horizontal prev/next styling, and clean browser titles without HTML entities**

## Performance

- **Duration:** 1 minute 41 seconds
- **Started:** 2026-02-07T05:16:11Z
- **Completed:** 2026-02-07T05:17:52Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Now link appears in footer navigation instead of header
- Prev/next navigation styled as horizontal flex row with proper spacing
- Page titles display special characters correctly without HTML entity escaping

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix navigation location** - `7dba349` (fix)
2. **Task 2: Style now-nav component** - `54e4cba` (style)
3. **Task 3: Fix title escaping** - `c7909f5` (fix)

## Files Created/Modified

- `site/now/index.md` - Changed tags from 'nav' to 'foot' for footer navigation
- `layouts/page.njk` - Removed entire header nav section (lines 7-16)
- `layouts/base.njk` - Added | safe filter to title in pageTitle set block
- `includes/css/index.css` - Added .now-nav flexbox styles for horizontal layout

## Decisions Made

**1. Footer navigation via 'foot' tag**

- Site architecture uses footer-only navigation (base.njk lines 88-97)
- Header nav in page.njk was incorrectly added in previous plan
- Changed Now page from `tags: nav` to `tags: foot` to match site pattern

**2. Flexbox layout for prev/next links**

- Display flex with space-between for Previous (left) and Next (right)
- :only-child:last-child rule handles edge case where only "Next" exists
- Pushes single "Next" link to the right via margin-left: auto

**3. Safe filter for title**

- Double escaping occurred: set block escaped, then {{ pageTitle }} escaped again
- Adding | safe to title inside set block prevents double escaping
- Special characters (like fancy apostrophes) now display correctly in browser tab

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all three fixes implemented smoothly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 1 (Now Page System) is now complete with all UAT issues resolved:

- Now page foundation functional (01-01)
- Archive system with prev/next navigation (01-02)
- All presentation issues fixed (01-03)

Ready to plan Phase 2 (Colophon Consolidation).

---

_Phase: 01-now-page-system_
_Completed: 2026-02-07_
