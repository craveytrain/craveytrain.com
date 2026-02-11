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
| NORM-01     | 9     | Pending |
| NORM-02     | 9     | Pending |
| NORM-03     | 9     | Pending |
| NORM-04     | 9     | Pending |
| NORM-05     | 9     | Pending |
| COMP-01     | 10    | Pending |
| COMP-02     | 10    | Pending |
| COMP-03     | 10    | Pending |
| DEAD-01     | 11    | Pending |
| DEAD-02     | 11    | Pending |
| DEAD-03     | 11    | Pending |
| DEAD-04     | 11    | Pending |
| DEAD-05     | 11    | Pending |
| QUAL-01     | 12    | Pending |
| QUAL-02     | 12    | Pending |
| QUAL-03     | 12    | Pending |
| QUAL-04     | 12    | Pending |

**Coverage:**

- v9.3 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0

---

_Requirements defined: 2026-02-11_
_Last updated: 2026-02-11 - Traceability updated with phase mappings_
