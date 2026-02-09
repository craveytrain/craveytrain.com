# Requirements: craveytrain.com Content Restructure

**Defined:** 2026-02-06
**Core Value:** Establish content structure for now pages, consolidated colophon, and uses in nav

## v1 Requirements

Requirements for this project. Each maps to roadmap phases.

### Now Page

- [x] **NOW-01**: Now page displays its last-updated date from frontmatter
- [x] **NOW-02**: Now page has 3-5 focus area sections (e.g., Work, Learning, Life)
- [x] **NOW-03**: Now page includes link to nownownow.com explanation
- [x] **NOW-04**: Latest now content appears at `/now/` (auto-generated index)
- [x] **NOW-05**: Each now update gets dated archive at `/now/<date>.html`
- [x] **NOW-06**: Archive listing exists at `/now/archive/` with all dated versions
- [x] **NOW-07**: Now pages link to previous version for navigation

### Colophon

- [x] **COL-01**: Colophon exists as single page at `/colophon/`
- [x] **COL-02**: All 9 existing colophon blog posts consolidated into single page
- [x] **COL-03**: Versions stacked in reverse chronological order (newest first)
- [x] **COL-04**: Each version has visible date/version identifier
- [~] **COL-05**: Redirects from old colophon blog post URLs to new page (SKIPPED per user decision)

### Uses

- [ ] **USE-01**: Uses page accessible in site navigation

## v2 Requirements (Future Redesign)

Deferred to separate redesign project. Tracked but not in current roadmap.

### Visual Design

- **DES-01**: Warm Editorial design applied to all page types
- **DES-02**: Homepage with hero, about, recent writing sections
- **DES-03**: Posts listing with tag filtering
- **DES-04**: Single post template with sidebar metadata
- **DES-05**: Mobile-first CSS with 768px breakpoint
- **DES-06**: Option C mobile hero (avatar inline)
- **DES-07**: Year-in-gutter layout for colophon
- **DES-08**: Fraunces + Inter typography

## Out of Scope

| Feature                    | Reason                                     |
| -------------------------- | ------------------------------------------ |
| Visual redesign            | Separate project — content structure first |
| New templates              | Separate project — use existing layouts    |
| Dark mode                  | Future consideration                       |
| Now page location tracking | Design shows date only                     |
| Real-time now updates      | Defeats purpose — manual monthly/quarterly |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| NOW-01      | Phase 1 | Complete |
| NOW-02      | Phase 1 | Complete |
| NOW-03      | Phase 1 | Complete |
| NOW-04      | Phase 1 | Complete |
| NOW-05      | Phase 1 | Complete |
| NOW-06      | Phase 1 | Complete |
| NOW-07      | Phase 1 | Complete |
| COL-01      | Phase 2 | Complete |
| COL-02      | Phase 2 | Complete |
| COL-03      | Phase 2 | Complete |
| COL-04      | Phase 2 | Complete |
| COL-05      | Phase 2 | Skipped  |
| USE-01      | Phase 3 | Pending  |

**Coverage:**

- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0 ✓

---

_Requirements defined: 2026-02-06_
_Last updated: 2026-02-09 after Phase 2 completion_
