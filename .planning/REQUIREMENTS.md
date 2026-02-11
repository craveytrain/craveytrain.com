# Requirements: craveytrain.com v9.3 Cleanup & Polish

**Defined:** 2026-02-11
**Core Value:** Clean, maintainable CSS architecture with tag-based defaults and reusable components

## v9.3 Requirements

### Dead Code Removal

- [ ] **DEAD-01**: Delete `themes/` TypeScript directory (unused duplicate of `_themes/`)
- [ ] **DEAD-02**: Delete `includes/css/` old CSS files (home.css, post.css, index.css, prism-shades-of-purple.css)
- [ ] **DEAD-03**: Delete `redesign/` directory (design prototypes, v9.2 shipped)
- [ ] **DEAD-04**: Remove theme generation system (`_themes/`, `generate-themes.js`, optimize-css theme calls)
- [ ] **DEAD-05**: Inline CSS custom properties directly in main.css (replace generated theme vars)

### CSS Normalization

- [ ] **NORM-01**: Normalize `blockquote` styles to tag selector (move from `.post-content blockquote`)
- [ ] **NORM-02**: Normalize `ul`, `ol`, `li` styles to tag selectors (move from `.post-content`)
- [ ] **NORM-03**: Normalize `h2`, `h3`, `h4` base styles to tag selectors (consolidate from multiple files)
- [ ] **NORM-04**: Standardize `.post-date` sizing (reconcile 0.85rem vs 0.9rem)
- [ ] **NORM-05**: Consolidate `.section-label`, `.year-label`, `.sidebar-label` into single class

### CSS Componentization

- [ ] **COMP-01**: Create `.link-underline` component (consolidate hero-links, view-all, archive-link patterns)
- [ ] **COMP-02**: Create `.container` utility (extract repeated max-width + margin auto pattern)
- [ ] **COMP-03**: Consolidate inline code styling (`.post-content code` and `.section-content code`)

### Code Quality

- [ ] **QUAL-01**: Remove `&nbsp;` layout hacks in content-page.njk and now.njk (use CSS gap)
- [ ] **QUAL-02**: Use `partials/divider.njk` consistently (replace inline `<div class="divider"><hr></div>`)
- [ ] **QUAL-03**: Delete commented-out code in `includes/replies.njk`
- [ ] **QUAL-04**: Extract likes/reposts/replies pattern in post.njk to macro (reduce repetition)

## Out of Scope

| Feature                                     | Reason                                    |
| ------------------------------------------- | ----------------------------------------- |
| Delete static/slides/                       | User decision: keep as historical archive |
| JavaScript refactoring                      | Focus is CSS architecture; JS is minimal  |
| Template restructuring beyond quality fixes | Keep layouts stable, focus on CSS         |

## Traceability

| Requirement | Phase | Status  |
| ----------- | ----- | ------- |
| DEAD-01     | TBD   | Pending |
| DEAD-02     | TBD   | Pending |
| DEAD-03     | TBD   | Pending |
| DEAD-04     | TBD   | Pending |
| DEAD-05     | TBD   | Pending |
| NORM-01     | TBD   | Pending |
| NORM-02     | TBD   | Pending |
| NORM-03     | TBD   | Pending |
| NORM-04     | TBD   | Pending |
| NORM-05     | TBD   | Pending |
| COMP-01     | TBD   | Pending |
| COMP-02     | TBD   | Pending |
| COMP-03     | TBD   | Pending |
| QUAL-01     | TBD   | Pending |
| QUAL-02     | TBD   | Pending |
| QUAL-03     | TBD   | Pending |
| QUAL-04     | TBD   | Pending |

**Coverage:**

- v9.3 requirements: 17 total
- Mapped to phases: 0
- Unmapped: 17

---

_Requirements defined: 2026-02-11_
_Last updated: 2026-02-11 after initial definition_
