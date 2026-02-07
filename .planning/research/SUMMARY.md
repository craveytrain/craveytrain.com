# Project Research Summary

**Project:** craveytrain.com Personal Website Redesign
**Domain:** Eleventy Static Site Generation (Feature Additions + Design Refresh)
**Researched:** 2026-02-06
**Confidence:** HIGH

## Executive Summary

This project adds three meta-content systems (now pages, consolidated colophon, uses page) to an existing Eleventy 3.1.2 personal website while applying a "Warm Editorial" design refresh. The research reveals a straightforward technical approach using standard Eleventy patterns—no new dependencies required beyond what's already installed. The bundle plugin (ships with Eleventy 3.0+) handles layout-specific CSS, collections API with lodash powers the now page archive system, and pagination generates auto-latest functionality without manual updates.

The recommended approach is content-structure-first, avoiding the common pitfall of design-before-content that leads to expensive rework. Start with content structure (collections, directory data, explicit dates), then build shared components (accent bar, section grid, footer), then apply design. The now page system uses pagination cleverly—size:1 with reverse sort auto-selects the latest entry for `/now/` while separate pagination generates dated archives at `/now/2026-02-06.html`. The colophon consolidates 9 existing blog posts into a single stacked page using collection filtering and `templateContent` to avoid layout nesting.

Critical risks center on data cascade confusion (tags merging unexpectedly), missing redirects breaking external links, and collection date sorting failing in production due to filesystem timestamps. Prevention is simple: use `override:tags` explicitly, plan redirects before any URL changes, and always add explicit `date` fields to frontmatter. The existing codebase is well-structured with proper tooling (TypeScript for themes, PurgeCSS for optimization, lint-staged for quality), making this an incremental enhancement rather than a rewrite.

## Key Findings

### Recommended Stack

The project requires **zero new dependencies**—everything needed ships with Eleventy 3.1.2 or is already installed. The core approach uses Eleventy's built-in bundle plugin for per-page CSS, collections API with lodash for date-based grouping, and pagination for auto-latest functionality.

**Core technologies:**

- **Eleventy 3.1.2**: Static site generator already in use. Version 3.x provides bundle plugin, ESM support, and virtual templates needed for auto-latest pagination.
- **Lodash 4.17.21**: Already installed. `_.groupBy()` and `_.chain()` required for grouping now page archives by year/month.
- **Bundle Plugin**: Ships with Eleventy 3.0+. Enables per-page CSS without external bundler—use `{% css %}` shortcode in layouts, `{% getBundle "css" %}` in head.
- **Nunjucks**: Already in use. Template inheritance and filters handle collection rendering, date formatting, and content stacking.

**CSS Strategy:**

- Keep existing global CSS (`includes/css/index.css`) for site-wide styles
- Add Bundle Plugin for layout-specific CSS (`includes/css/now.css`, `includes/css/colophon.css`)
- Continue using PurgeCSS + CSSO via transform (already implemented), but only in production builds
- **Font recommendation:** Self-host Fraunces and Inter fonts instead of Google Fonts CDN (20-30 PageSpeed improvement, GDPR compliance, eliminates external request)

**What NOT to use:**

- External CSS bundlers (Webpack, Parcel, esbuild) — Bundle plugin sufficient
- eleventy-plugin-purgecss npm package — Has async timing issues; existing transform approach better
- WebC for CSS organization — Overkill for incremental features
- Moment.js for date manipulation — Use native JavaScript Date + lodash groupBy
- clean-css dependency — Redundant with CSSO, can be removed

### Expected Features

Research identifies clear table stakes vs. differentiators for each page type, based on community standards (nownownow.com movement, IndieWeb colophon patterns, uses.tech directory).

**Must have (table stakes):**

- **Now page core:** Current content, update date (ISO format), personal tone, link to nownownow.com movement
- **Now page archive:** Reverse chronological listing, dated permalinks (`/now/2026-02-06.html`), direct links to all versions
- **Colophon core:** Technology stack, typography details, site principles, brief format
- **Colophon changelog:** Dated entries, version titles for major changes, reverse chronological
- **Uses page core:** Editor + Terminal section, hardware setup, categorized sections, product links
- **Archive systems:** Date-based listing (YYYY-MM-DD), reverse chronological, stable permalinks

**Should have (competitive):**

- **Now page:** Section headers (Work/Learning/Life), update frequency note, photos/imagery
- **Colophon:** Year-in-gutter timeline design, detailed changelog with dated entries
- **Uses page:** "Why" explanations for key tools, backup strategy section

**Defer (v2+):**

- Search/filter for archives (wait until 20+ entries, rarely valuable for personal sites)
- Performance metrics on colophon (nice to have, not essential)
- Analytics transparency (only if using analytics)
- Affiliate disclosure on uses (only if using affiliate links)
- RSS feed for now updates (v2 feature once pattern established)

**Anti-features to avoid:**

- Real-time "now" updates (defeats purpose—now pages are about longer timeframes)
- Comments on colophon (becomes outdated Q&A, maintenance burden)
- Full detailed specs on uses page (overwhelming, irrelevant details)
- Version comparison/diff view (complex to build, rarely used)

### Architecture Approach

The architecture uses standard Eleventy patterns: directory data for collection defaults, pagination for auto-latest selection, collection filtering for consolidation, and reusable Nunjucks includes for shared components. No custom plugins or complex build pipelines.

**Major components:**

1. **Now Page System** — Directory of dated markdown files (`site/now/2026-02-06.md`) with directory data file (`now.json`) setting `tags: ["now"]`. Pagination with size:1 and reverse sort generates auto-latest at `/now/`. Second pagination generates dated archives at `/now/2026-02-06.html` with dynamic permalinks.

2. **Colophon Consolidation** — Single template (`site/colophon.njk`) queries `collections.colophon` (filtered by tag), reverses order, and renders all versions stacked using section-grid component. Uses `templateContent` (not `content`) to avoid layout wrapper duplication. Year-in-gutter design with dividers between versions.

3. **Shared Components** — Reusable Nunjucks includes for accent bar, header, footer, section-grid (200px/1fr editorial layout), and dividers. Used across all 4 template types (homepage, now, colophon, posts).

4. **Section Grid Component** — Core layout pattern with left label (200px) and right content (1fr). Used in now pages for content sections and colophon for year gutters. Reusable via `{% include "section-grid.njk" with { label, content } %}`.

5. **Collections Layer** — Custom collections in `eleventy.config.js`: `collections.now` (auto-created by tags), `collections.colophon` (filter existing posts), optional `collections.nowByDate` (lodash grouping for archives). Uses explicit date field in frontmatter (never filesystem timestamps).

**Key patterns:**

- **Auto-Latest with Pagination:** Pagination size:1 + reverse sort automatically shows latest item without manual updates
- **Dynamic Archive Permalinks:** Pagination with permalink template generates date-based URLs (`/now/{{ date | htmlDateString }}.html`)
- **Consolidating Tagged Posts:** Query collection by tag, filter and sort, render all stacked on single page using `templateContent`
- **Directory Data for Defaults:** `site/now/now.json` sets `tags: ["now"]` for all files in directory, avoiding frontmatter repetition

**Data flow direction:** Content Files → Collections (in-memory) → Templates → Layouts → Components → HTML. Data flows DOWN only—components never query collections directly.

### Critical Pitfalls

These 7 pitfalls cause the majority of problems in Eleventy site migrations and redesigns. Each has clear prevention strategies.

1. **Permalink Changes Break External Links Without Redirects** — Consolidating 9 colophon posts changes permalinks. External links, social media shares, and search engine results hit 404s. **Prevention:** Document all existing permalinks first, create `_redirects` file using Eleventy pagination before any URL changes, use `redirectFrom` pattern in frontmatter. **Phase to address:** Phase 1 (URL Audit).

2. **Data Cascade Override Confusion Breaks Collections** — Tags merge across data cascade by default in Eleventy 1.0+. Now pages inherit blog tags, appearing in wrong collections. **Prevention:** Use `override:tags` in frontmatter when replacing inherited tags. Understand that directory data tags + frontmatter tags combine unless using `override:` prefix. **Phase to address:** Phase 2 (Content Structure).

3. **Design-First Approach Causes Expensive Rework** — Designing with Lorem ipsum before auditing actual content leads to templates breaking with real posts (varied lengths, tables, code blocks, images). **Prevention:** Audit existing content FIRST. Design with real content samples. Build component library from actual content patterns. **Phase to address:** Phase 1 (Content Audit) before Phase 3 (Design System).

4. **Template Migration Without Layout Aliases Breaks Content** — Renaming or moving layout files breaks all existing content referencing old names. Partial migration creates inconsistency. **Prevention:** Use `eleventyConfig.addLayoutAlias(from, to)` before renaming layouts. Old and new layouts coexist via aliases during migration. **Phase to address:** Phase 3 (Template Migration).

5. **Collection Date Sorting Breaks for Auto-Latest** — Filesystem timestamps aren't portable. Git doesn't preserve them. Deployment creates new files with new timestamps. Collection order differs between local and production. "Latest" now page shows wrong content after deploy. **Prevention:** ALWAYS add explicit `date` field to frontmatter (ISO-8601 format). Never rely on filesystem timestamps. Sort collections with explicit date field. **Phase to address:** Phase 2 (Content Structure).

6. **CSS Build Process Not Integrated Breaks Redesign** — Eleventy only processes templates by default. External CSS builds run separately. Watch mode doesn't rebuild CSS. Redesign looks broken despite working locally. **Prevention:** Compile CSS to input directory first, then use passthrough copy. Add CSS build to npm scripts. Use npm-run-all for parallel watch modes. **Phase to address:** Phase 3 (Design System Setup).

7. **Consolidating Posts Without templateContent Strategy** — Using `post.content` instead of `post.templateContent` includes layout wrappers, causing nested layouts. Relative image paths break when content moves. **Prevention:** Use `{{ post.templateContent | safe }}` to get rendered content WITHOUT layouts. Test image paths. Update internal links from old post URLs to anchors on consolidated page. **Phase to address:** Phase 4 (Content Consolidation).

## Implications for Roadmap

Based on combined research, the roadmap should follow a **content-structure-first** approach to avoid the expensive rework pitfall. Architecture research identifies clear build order dependencies: foundation components → content structure → template system → consolidation → design application.

### Suggested Phase Structure

#### Phase 1: Foundation & Audit

**Rationale:** Address critical pitfalls before making changes. Content audit prevents design-before-content rework. URL audit enables redirect planning. Foundation components have no dependencies and are needed by all later phases.

**Delivers:**

- Content inventory (all existing posts, pages, content types, images, formatting)
- URL audit (all current permalinks documented for redirect planning)
- Shared components (accent-bar, header, footer, section-grid, divider)
- Updated base layout with Warm Editorial design system foundation

**Addresses pitfalls:**

- Design-first rework (Pitfall 3) — audit before design
- Missing redirects (Pitfall 1) — plan redirects before URL changes
- Layout migration breaking (Pitfall 4) — set up layout aliases before changes

**Standard patterns:** Component creation, content audit are well-documented. No research-phase needed.

#### Phase 2: Content Structure & Collections

**Rationale:** Content structure must exist before templates can use it. Date handling and collection configuration prevent sorting and data cascade pitfalls. This phase has no UI output but prevents major technical debt.

**Delivers:**

- Directory structure (`site/now/` with directory data file)
- Collection configuration (`collections.now`, `collections.colophon`, lodash grouping)
- Explicit dates in ALL content frontmatter (prevents filesystem timestamp issues)
- Tag strategy with `override:` prefix where needed (prevents cascade confusion)
- Initial now page content file (`site/now/2026-02-06.md`)

**Addresses pitfalls:**

- Collection date sorting (Pitfall 5) — explicit dates from start
- Data cascade confusion (Pitfall 2) — override strategy documented
- CSS build integration (Pitfall 6) — set up bundle plugin config

**Stack dependencies:** Eleventy collections API, lodash for date grouping, bundle plugin configuration.

**Standard patterns:** Collections and directory data are standard Eleventy. No research-phase needed.

#### Phase 3: Template System & Layouts

**Rationale:** Templates consume collections (Phase 2 dependency). Layout aliases must be set up before any template changes to prevent breakage.

**Delivers:**

- Layout aliases for existing layouts (enables safe refactoring)
- New now.njk layout using section-grid component
- Updated page.njk layout for colophon and uses pages
- Now page index with auto-latest pagination (size:1, reverse sort)
- Now page archive pagination (dynamic permalinks from dates)

**Addresses pitfalls:**

- Layout migration breaking (Pitfall 4) — aliases enable safe changes
- CSS build integration (Pitfall 6) — bundle plugin used in layouts

**Stack dependencies:** Nunjucks templates, Eleventy pagination, bundle plugin CSS shortcodes.

**Standard patterns:** Pagination and layout inheritance are well-documented. No research-phase needed.

#### Phase 4: Content Consolidation

**Rationale:** Depends on template system (Phase 3). Must use `templateContent` to avoid layout nesting. Requires redirect planning from Phase 1 audit.

**Delivers:**

- Colophon template querying and rendering `collections.colophon` stacked
- Image path verification and updates for consolidated content
- Internal link updates (old post URLs → anchors on new page)
- `_redirects` file for old colophon post URLs
- Testing of all 9 colophon versions rendering correctly

**Addresses pitfalls:**

- Post consolidation formatting (Pitfall 7) — uses templateContent, tests images
- Missing redirects (Pitfall 1) — generates redirects before launch

**Stack dependencies:** Collections API, templateContent, Netlify redirects generation.

**Research flag:** Test consolidation approach with 2-3 posts before applying to all 9. Verify image paths and internal links work as expected.

#### Phase 5: Design Application

**Rationale:** Content structure exists, templates work with real content. Design applied last, using real content patterns from Phase 1 audit. This is pure visual work with no structural dependencies.

**Delivers:**

- Warm Editorial design applied to all layouts (homepage, posts, pages, now)
- Mobile-first CSS with responsive breakpoints
- Typography system (Fraunces + Inter, self-hosted fonts)
- Layout-specific CSS via bundle plugin (now.css, colophon.css)
- Color system and CSS variables from theme definitions
- Mobile hero Option C implementation (avatar inline, text-forward compact)

**Addresses pitfalls:**

- Design-first rework (Pitfall 3) — avoided by using real content from audit
- CSS build integration (Pitfall 6) — bundle plugin established in Phase 2

**Stack dependencies:** Bundle plugin, TypeScript theme definitions, PurgeCSS optimization (production only).

**Standard patterns:** CSS organization with bundle plugin is documented. No research-phase needed.

#### Phase 6: Uses Page & Polish

**Rationale:** Simplest feature, saved for last. Pure content creation using established patterns from earlier phases.

**Delivers:**

- Uses page content (`site/uses.md`)
- Categorized sections (Editor, Hardware, Apps, Backup strategy)
- Product links and "why" explanations for key tools
- Layout-specific CSS if needed (uses.css via bundle plugin)
- Final link validation across all pages

**Addresses pitfalls:**

- Broken internal links — site-wide validation before launch

**Stack dependencies:** Markdown-it (already in use), page.njk layout (established in Phase 3).

**Standard patterns:** Single markdown page, no collection needed. No research-phase needed.

### Phase Ordering Rationale

- **Foundation first (Phase 1):** Components have no dependencies, needed by all later phases. Audit prevents expensive rework.
- **Structure before templates (Phase 2):** Templates can't render without collections. Date and tag strategy prevents sorting/cascade issues.
- **Templates before consolidation (Phase 4):** Can't consolidate content without template system to render it.
- **Design last (Phase 5):** Content structure stable, templates working with real content. Pure visual work, no structural dependencies.
- **Uses page last (Phase 6):** Simplest feature, validates that all patterns established in earlier phases work correctly.

**Dependency chain:**

```
Phase 1 (Foundation) → Phase 2 (Structure) → Phase 3 (Templates) → Phase 4 (Consolidation)
                                                    ↓
                                               Phase 5 (Design)
                                                    ↓
                                               Phase 6 (Polish)
```

### Research Flags

**No phases need `/gsd:research-phase`** — All patterns are standard Eleventy, well-documented in official docs and existing codebase. Stack research already covered:

- Collections and pagination patterns (standard Eleventy)
- Bundle plugin usage (official plugin, docs available)
- Directory data and data cascade (core Eleventy feature)
- Content consolidation with templateContent (standard pattern)

**Validation points during planning:**

- Phase 4: Test consolidation with 2-3 colophon posts before applying to all 9 (validate image paths, internal links)
- Phase 5: Verify bundle plugin CSS inlining works with existing PurgeCSS transform (no conflicts)

## Confidence Assessment

| Area         | Confidence      | Notes                                                                                                                                                                                                                                                  |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Stack        | **HIGH**        | Official Eleventy docs for all patterns. Lodash and bundle plugin already available. No new dependencies. Existing codebase already uses TypeScript themes, PurgeCSS, proper tooling.                                                                  |
| Features     | **MEDIUM-HIGH** | Now page based on nownownow.com movement standards (HIGH). Colophon based on IndieWeb community patterns (MEDIUM). Uses page based on uses.tech directory (MEDIUM). All table stakes features validated across multiple sources.                       |
| Architecture | **HIGH**        | Patterns from official Eleventy docs (collections, pagination, data cascade, permalinks). Real-world now page implementations reviewed. Existing codebase analysis confirms compatibility. Build order dependencies clear from architectural research. |
| Pitfalls     | **HIGH**        | Official Eleventy pitfalls docs, community migration guides, version-specific warnings. All 7 critical pitfalls have documented prevention strategies and phase mappings. Real-world failure cases from multiple sources.                              |

**Overall confidence:** **HIGH** — All patterns are standard Eleventy, well-documented, and already partially implemented in existing codebase.

### Gaps to Address

**No critical gaps** — Research covered all necessary areas with multiple source validation.

**Minor validation needs:**

- **Font file optimization:** Self-hosting fonts is clear recommendation, but specific woff2 subset selection for Fraunces/Inter should be done during Phase 5 implementation. Use google-webfonts-helper tool for download/CSS generation.
- **PurgeCSS with bundle plugin:** Existing PurgeCSS transform should be tested with bundle plugin CSS to ensure no conflicts. Likely works fine (bundle plugin outputs inline CSS, PurgeCSS processes output HTML), but validate in Phase 2 setup.
- **Redirect testing methodology:** Need systematic approach to test all redirects before launch. Consider using link checker tool or curl script to verify all old URLs return 301/302 (not 404) in Phase 4.

**Handling during planning:**

- Font optimization: Document in Phase 5 requirements, use recommended tool
- PurgeCSS validation: Test during Phase 2 bundle plugin setup, conditional compile only in production
- Redirect testing: Add testing task to Phase 4 deliverables

## Sources

### Primary (HIGH confidence)

**Official Eleventy Documentation:**

- [Collections](https://www.11ty.dev/docs/collections/) — Collection creation and filtering
- [Collections API](https://www.11ty.dev/docs/collections-api/) — getAll(), getFilteredByTag(), sorting
- [Pagination](https://www.11ty.dev/docs/pagination/) — Auto-latest pattern, dynamic permalinks
- [Bundle Plugin](https://www.11ty.dev/docs/plugins/bundle/) — Per-page CSS bundling (ships with 3.0+)
- [Data Cascade](https://www.11ty.dev/docs/data-cascade/) — Directory data files, override prefix
- [Data Deep Merge](https://www.11ty.dev/docs/data-deep-merge/) — Tag inheritance behavior
- [Computed Data](https://www.11ty.dev/docs/data-computed/) — Limitations for layout/pagination config
- [Permalinks](https://www.11ty.dev/docs/permalinks/) — Dynamic permalink patterns
- [Layouts](https://www.11ty.dev/docs/layouts/) — Layout aliases for migration
- [Common Pitfalls](https://www.11ty.dev/docs/pitfalls/) — Official pitfall documentation
- [Eleventy v3.0 Release Notes](https://www.11ty.dev/blog/eleventy-v3/) — Bundle plugin, ESM support

**Community Standards:**

- [nownownow.com/about](https://nownownow.com/about) — Official /now page movement guidance
- [IndieWeb colophon wiki](https://indieweb.org/colophon) — Colophon community standards
- [uses.tech](https://uses.tech) / [Wes Bos /uses](https://wesbos.com/uses) — Uses page pattern origin

**Existing Codebase:**

- `.planning/codebase/ARCHITECTURE.md` — Current architecture analysis
- `.planning/codebase/STRUCTURE.md` — Current directory structure
- `eleventy.config.js` — Current configuration (TypeScript, PurgeCSS, collections)

### Secondary (MEDIUM confidence)

**Community Resources:**

- [Building my now page using Eleventy • Cory Dransfeldt](https://www.coryd.dev/posts/2023/building-my-now-page-using-eleventy) — Real-world now page implementation
- [Grouping blog posts by year in Eleventy](https://jamesdoc.com/blog/2021/11ty-posts-by-year/) — Date grouping with lodash
- [List blog posts grouped by year with Eleventy](https://hamatti.org/posts/list-blog-posts-grouped-by-year-with-eleventy/) — Simple collection pattern
- [Manually splitting CSS files in Eleventy](https://danabyerly.com/articles/manually-splitting-css-files-in-eleventy/) — CSS organization patterns
- [The evolution of my CSS pipeline in Eleventy (parts 1-2)](https://bobmonsour.com/blog/the-evolution-of-my-CSS-pipeline-in-eleventy-part-1/) — CSS pipeline approaches
- [Automate Netlify Redirects in 11ty](https://www.aleksandrhovhannisyan.com/blog/eleventy-netlify-redirects/) — Redirect generation pattern
- [Eleventy Redirect From](https://brianm.me/posts/eleventy-redirect-from/) — redirectFrom frontmatter pattern
- [Mastering Eleventy: Display All Blog Posts from a Category on a Single Page](https://gregoryhammond.ca/blog/display-all-posts-from-category-on-page/) — Collection consolidation
- [Migrating to Eleventy 2.0](https://dev.to/starbist/migrating-to-eleventy-20-4jgn) — Migration pitfalls
- [Moving to Eleventy - TrozWare](https://troz.net/post/2025/eleventy/) — Real migration experience

**Google Fonts Performance:**

- [Should you self-host Google Fonts?](https://www.tunetheweb.com/blog/should-you-self-host-google-fonts/) — Comprehensive analysis
- [Why I Switched From Google Fonts CDN to Self-Hosting](https://dev.to/web_dev-usman/why-i-switched-from-google-fonts-cdn-to-self-hosting-and-never-looked-back-3fbh) — Real-world performance gains

### Tertiary (LOW confidence)

**Content Strategy:**

- [Content-First vs. Design-First: Which is the Better Web Strategy?](https://www.progress.com/blogs/content-first-vs-design-first-which-better-web-design-strategy) — Design approach philosophy
- [Why content-first design makes better websites](https://contentsnare.com/content-first-design/) — Content-first methodology

---

_Research completed: 2026-02-06_
_Ready for roadmap: yes_
