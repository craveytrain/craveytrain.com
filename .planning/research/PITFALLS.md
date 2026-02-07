# Pitfalls Research

**Domain:** Eleventy Personal Website Redesign (Now Pages, Template Migration, Content Consolidation)
**Researched:** 2026-02-06
**Confidence:** MEDIUM-HIGH

## Critical Pitfalls

### Pitfall 1: Permalink Changes Break External Links Without Redirects

**What goes wrong:**
Redesigning URL structure breaks all external links from social media, search engines, and backlinks. Visitors hit 404 pages and content appears lost.

**Why it happens:**
Teams focus on the new URL structure without planning for old URLs. Consolidating blog posts (like 9 colophon posts into one page) changes permalinks, and Eleventy won't automatically redirect old URLs.

**How to avoid:**

1. Document all existing permalinks before migration
2. Create a `_redirects` file using Eleventy's pagination feature to generate Netlify/CloudFlare redirects
3. Use the `redirectFrom` pattern - add old URLs to front matter, then generate redirect pages
4. Test all redirects before going live

**Warning signs:**

- Planning URL changes without redirect strategy
- Consolidating content without mapping old URLs
- No `_redirects` file in build output
- 404s in deployment testing

**Phase to address:**
Phase 1 (Planning/Audit) - Document existing URLs and plan redirect strategy before any content changes.

**Sources:**

- [Automate Netlify Redirects in 11ty](https://www.aleksandrhovhannisyan.com/blog/eleventy-netlify-redirects/)
- [Eleventy Redirect From](https://brianm.me/posts/eleventy-redirect-from/)
- [Permalinks — Eleventy](https://www.11ty.dev/docs/permalinks/)

---

### Pitfall 2: Data Cascade Override Confusion Breaks Collections

**What goes wrong:**
Tags and collections behave unexpectedly. Content appears in wrong collections, "now" pages show in blog archives, or tags from directory data files combine in unexpected ways.

**Why it happens:**
Eleventy 1.0+ uses deep data merge by default. Arrays (like tags) merge together across the data cascade instead of overriding. Without the `override:` prefix, tags from directory data files combine with front matter tags, causing content to appear in multiple unintended collections.

**How to avoid:**

1. Use `override:tags` in front matter when you need to completely replace inherited tags
2. Understand that `posts/post.json` with `tags: ["posts"]` will merge with front matter `tags: ["featured"]` to create `["posts", "featured"]`
3. For now pages, explicitly set `override:tags: ["now"]` to prevent inheriting blog tags
4. Document directory data file inheritance in comments

**Warning signs:**

- Now page appears in blog post listings
- Consolidated content shows in original collection
- Archive pages include unexpected content
- Tags array has more values than expected

**Phase to address:**
Phase 2 (Content Structure) - Set up directory data files and tag strategy before migrating content.

**Sources:**

- [Data Deep Merge — Eleventy](https://www.11ty.dev/docs/data-deep-merge/)
- [Data Cascade — Eleventy](https://www.11ty.dev/docs/data-cascade/)

---

### Pitfall 3: Design-First Approach Causes Expensive Rework

**What goes wrong:**
Design templates built with placeholder content break when real content is added. Headlines don't fit, content elements weren't designed for (tables, code blocks, embedded content), or variable-length content breaks visual balance.

**Why it happens:**
The excitement of redesign makes teams jump straight to visual design without auditing actual content. Lorem ipsum text is predictable; real content isn't. Real blog posts have varied lengths, images, formatting, and elements not anticipated in mockups.

**How to avoid:**

1. Audit existing content FIRST - catalog what content types exist (posts, pages, code snippets, images, tables)
2. Design with real content samples, not placeholder text
3. Build the component library based on actual content patterns found in audit
4. Test templates with longest post, shortest post, most images, most code blocks
5. For now pages: design with actual now content, not idealized placeholder

**Warning signs:**

- Creating mockups before content audit
- Using Lorem ipsum beyond initial wireframes
- Designer hasn't seen actual blog posts
- Design system doesn't include all content types in existing posts

**Phase to address:**
Phase 1 (Content Audit) - Complete content inventory before any design work. Phase 3 (Design System) - Build components from real content patterns.

**Sources:**

- [Content-First vs. Design-First: Which is the Better Web Strategy?](https://www.progress.com/blogs/content-first-vs-design-first-which-better-web-design-strategy)
- [Why content-first design makes better websites](https://contentsnare.com/content-first-design/)

---

### Pitfall 4: Template Migration Without Layout Aliases Breaks Content

**What goes wrong:**
Hundreds of existing markdown files reference old layout names. Changing layout file names or paths requires updating every file's front matter, risking mass breakage or inconsistent layouts during migration.

**Why it happens:**
Teams rename layouts for better organization (`post.njk` → `layouts/blog-post.njk`) but forget that all existing content references the old name. Partial migration leaves some files using old layouts, others using new.

**How to avoid:**

1. Use `eleventyConfig.addLayoutAlias(from, to)` to map old layout names to new files
2. Create aliases BEFORE moving/renaming layout files
3. Migrate layouts incrementally - old and new can coexist via aliases
4. Test that all content renders with new layouts before removing old files
5. For "Warm Editorial" design with 4 template types: create aliases for all existing layouts first

**Warning signs:**

- Planning to rename layout files without alias strategy
- Bulk find/replace on layout front matter values
- Content files referencing layouts that don't exist
- Some pages render with old design, others with new

**Phase to address:**
Phase 3 (Template Migration) - Set up layout aliases before any layout file changes.

**Sources:**

- [Layouts — Eleventy](https://www.11ty.dev/docs/layouts/)
- [Eleventy template migration pitfalls 2025](https://dev.to/starbist/migrating-to-eleventy-20-4jgn)

---

### Pitfall 5: Collection Date Sorting Breaks for "Latest" Auto-Pages

**What goes wrong:**
The "now" page shows outdated content as "latest" because dates are unreliable. Archive pages show content in wrong order. Filesystem timestamps differ between local and production, causing collection order to change after deployment.

**Why it happens:**
Eleventy defaults to file creation date (filesystem metadata) for sorting collections. These timestamps aren't portable - git doesn't preserve them, deployment creates new files with new timestamps. For now pages showing "latest" content, the wrong item appears first.

**How to avoid:**

1. ALWAYS add explicit `date` field to front matter for all content
2. Use ISO-8601 format (YYYY-MM-DD or full datetime) - they're lexically sortable
3. For now page: add `datePublished` to track original date separately from `date` if needed
4. Sort collections in config with explicit date field: `collection.sort((a, b) => b.data.date - a.data.date)`
5. Never rely on filesystem timestamps

**Warning signs:**

- Collection order differs between local and production
- No explicit `date` in front matter
- Using file creation timestamps for sorting
- "Latest" content on now page is wrong after deployment

**Phase to address:**
Phase 2 (Content Structure) - Add explicit dates to all content and set up custom collection sorting before building auto-latest features.

**Sources:**

- [Collections — Eleventy](https://www.11ty.dev/docs/collections/)
- [A Step-by-Step Guide to Sorting Eleventy Global Data Files by Date](https://stevenwoodson.com/blog/a-step-by-step-guide-to-sorting-eleventy-global-data-files-by-date/)
- [Sorting and Dating 11ty Posts by Name](https://bennypowers.dev/posts/sort-and-date-11ty-posts-by-name/)

---

### Pitfall 6: CSS Build Process Not Integrated Breaks Redesign

**What goes wrong:**
New CSS doesn't rebuild with Eleventy changes. CSS files empty in production. Watch mode doesn't pick up style changes. Redesign looks broken despite CSS working locally.

**Why it happens:**
Eleventy only processes template files by default. External CSS build processes (Sass, PostCSS, Tailwind) run separately and don't trigger on Eleventy rebuilds. Using `addPassthroughCopy` for CSS is fast for static files but doesn't compile preprocessors.

**How to avoid:**

1. If using preprocessors: compile CSS into a folder INSIDE the input directory, then use passthrough copy
2. DON'T compile directly to output folder - Eleventy rebuilds won't trigger recompilation
3. Add CSS build to npm scripts: `"build": "npm run css && eleventy"`
4. Use watch mode for both: `"dev": "npm-run-all --parallel css:watch eleventy:dev"`
5. For CloudFlare/Netlify: ensure build command includes CSS compilation step
6. Use `addPassthroughCopy` correctly - paths are relative to project root, NOT input directory

**Warning signs:**

- CSS compiling to output folder directly
- Eleventy watch mode doesn't rebuild on CSS changes
- CSS works locally but missing in production
- Build command only runs `eleventy`, not CSS compilation

**Phase to address:**
Phase 3 (Design System) - Set up integrated build process before adding new CSS.

**Sources:**

- [Passthrough File Copy — Eleventy](https://www.11ty.dev/docs/copy/)
- [Common Pitfalls — Eleventy](https://www.11ty.dev/docs/pitfalls/)
- [Moving to Eleventy - TrozWare](https://troz.net/post/2025/eleventy/)

---

### Pitfall 7: Consolidating Posts Without templateContent Strategy

**What goes wrong:**
Combining 9 colophon posts into one page results in broken formatting, missing content, or layout wrapper duplication. Images don't load. Internal links break. Each post's content doesn't render properly when stacked.

**Why it happens:**
Using `post.content` instead of `post.templateContent` includes layout wrappers, causing nested layouts. Relative image paths break when content moves to different URL. Markdown doesn't process correctly when concatenating posts.

**How to avoid:**

1. Use `{{ post.templateContent | safe }}` to get rendered content WITHOUT layout wrappers
2. Create new collection for colophon posts: `eleventyConfig.addCollection("colophon", ...)`
3. Test image paths - may need to update relative paths when consolidating
4. Add separators/dividers between stacked posts for readability
5. Consider keeping individual posts and adding canonical URL to consolidated page
6. Update internal links from old post URLs to anchors on new page

**Warning signs:**

- Planning to combine posts without testing templateContent
- Not considering image path changes
- No plan for internal link updates
- Layouts appearing multiple times on consolidated page

**Phase to address:**
Phase 4 (Content Consolidation) - Test templateContent rendering before consolidating all posts.

**Sources:**

- [Display Posts/Content in Latest Posts](https://github.com/11ty/eleventy/discussions/2549)
- [Mastering Eleventy: Display All Blog Posts from a Category on a Single Page](https://gregoryhammond.ca/blog/display-all-posts-from-category-on-page/)
- [Collections — Eleventy](https://www.11ty.dev/docs/collections/)

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut                                | Immediate Benefit        | Long-term Cost                                 | When Acceptable                              |
| --------------------------------------- | ------------------------ | ---------------------------------------------- | -------------------------------------------- |
| Skip explicit dates in front matter     | Faster content creation  | Collection sorting breaks in production        | Never - always add dates                     |
| Compile CSS directly to output folder   | Simpler build setup      | Rebuilds don't work, deployment breaks         | Never - always compile to input dir first    |
| No redirect strategy for old URLs       | Faster migration         | Broken external links, lost SEO                | Only for net-new sites with no history       |
| Use default deep merge without override | Less front matter needed | Tags/collections behave unexpectedly           | Only when you want tag inheritance           |
| Design templates before content audit   | Start visual work faster | Expensive rework when real content doesn't fit | Only for greenfield projects with no content |
| Skip layout aliases during migration    | Fewer config lines       | Breaking changes when refactoring layouts      | Only if not renaming any layouts             |
| Use filesystem timestamps for sorting   | No date field needed     | Different order in local vs production         | Never - timestamps aren't portable           |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration               | Common Mistake                            | Correct Approach                                          |
| ------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| Netlify/CloudFlare Deploy | Not including CSS build in deploy command | Add `npm run css &&` before `eleventy` in build command   |
| Netlify Redirects         | Creating `_redirects` manually            | Use Eleventy pagination to generate from data             |
| GitHub Pages              | Jekyll processing Eleventy output         | Add `.nojekyll` file to output folder                     |
| Image CDN/Processing      | Hardcoding image URLs in content          | Use filters/shortcodes for image URLs that can be swapped |
| RSS Feed                  | Including draft/now content in feed       | Filter collections by tags/status before generating feed  |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap                                         | Symptoms                         | Prevention                                          | When It Breaks       |
| -------------------------------------------- | -------------------------------- | --------------------------------------------------- | -------------------- |
| No caching for external data                 | Slow builds, hitting rate limits | Use Eleventy Fetch with cache for RSS feeds, APIs   | >10 external sources |
| Rebuilding all pages on every change         | Dev server slow, long builds     | Use incremental builds, limit collections processed | >100 posts           |
| Large images in content without optimization | Slow page loads                  | Use image processing plugin, serve optimized sizes  | >20 images per page  |
| Nested pagination without flattening         | Slow builds, memory issues       | Flatten arrays before paginating                    | >50 pages paginated  |
| Processing markdown in loops                 | Template render slow             | Pre-process markdown, cache results                 | >20 items in loop    |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall                                      | User Impact                               | Better Approach                                   |
| -------------------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| Broken external links after URL changes      | 404 errors, frustration                   | Implement redirects before launch                 |
| No archive/history for now page              | Can't see past status, feels incomplete   | Build archive alongside current now page          |
| Inconsistent post metadata                   | Hard to navigate, unclear dates           | Use directory data files for consistent structure |
| Missing trailing slash in permalinks         | Browser downloads file instead of viewing | Always use `/path/` or `/path/index.html` format  |
| Relative dates ("2 days ago") in static site | Dates become wrong after rebuild          | Use absolute dates, or rebuild frequently         |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **URL Migration:** Redirects file generated and tested — verify all old URLs return 301/302, not 404
- [ ] **Collection Sorting:** Explicit dates in ALL content — verify collections sort identically local vs production
- [ ] **CSS Build:** Integrated into Eleventy build — verify CSS rebuilds during watch mode
- [ ] **Layout Migration:** Layout aliases configured — verify all content renders with correct templates
- [ ] **Data Cascade:** Override prefix used where needed — verify tags/collections only include intended content
- [ ] **Now Page Auto-Latest:** Date-based sorting tested — verify latest item appears first after deployment
- [ ] **Content Consolidation:** Image paths updated — verify all images load on consolidated page
- [ ] **Template Content:** Using templateContent not content — verify no duplicate layouts when stacking posts
- [ ] **External Links:** Internal links updated to new URLs — verify no broken links within site
- [ ] **Dev Server:** Restart tested when stuck — verify error messages actually show

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall                                | Recovery Cost | Recovery Steps                                                                                  |
| -------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| Missing redirects after launch         | LOW           | 1. Document broken URLs from analytics, 2. Generate `_redirects` file, 3. Redeploy              |
| Collection sorting wrong in production | LOW           | 1. Add explicit dates to front matter, 2. Test locally with clean build, 3. Redeploy            |
| CSS missing in production              | LOW           | 1. Update build command to include CSS step, 2. Verify in build logs, 3. Redeploy               |
| Data cascade tags merged unexpectedly  | MEDIUM        | 1. Add override: prefix to affected files, 2. Test collection contents, 3. Rebuild              |
| Design doesn't fit content             | HIGH          | 1. Audit actual content patterns, 2. Redesign components for real content, 3. Rebuild templates |
| Layout migration broke pages           | MEDIUM        | 1. Add layout aliases for old names, 2. Verify all layouts found, 3. Rebuild                    |
| Consolidated posts have broken images  | MEDIUM        | 1. Audit image paths in posts, 2. Update to absolute/root-relative paths, 3. Test all images    |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall                              | Prevention Phase               | Verification                                     |
| ------------------------------------ | ------------------------------ | ------------------------------------------------ |
| Permalink changes without redirects  | Phase 1: URL Audit             | Test all old URLs return proper redirects        |
| Data cascade override confusion      | Phase 2: Content Structure     | Verify collections contain only intended content |
| Design-first rework                  | Phase 1: Content Audit         | Design uses real content, not Lorem ipsum        |
| Layout migration breaks content      | Phase 3: Template Setup        | All pages render with correct layout             |
| Collection date sorting breaks       | Phase 2: Content Structure     | Collections sort identically local vs production |
| CSS build not integrated             | Phase 3: Design System Setup   | CSS rebuilds during watch mode                   |
| Post consolidation formatting breaks | Phase 4: Content Consolidation | All images load, no duplicate layouts            |
| Missing now page archive             | Phase 5: Now Page System       | Archive exists with chronological history        |
| Broken internal links                | Phase 6: Link Updates          | Site-wide link validation passes                 |
| Development server errors hidden     | Throughout                     | Restart server when errors stop appearing        |

## Eleventy Version-Specific Warnings

| Issue                           | Affects      | Solution                                                    |
| ------------------------------- | ------------ | ----------------------------------------------------------- |
| setDataDeepMerge(false) removed | v4.0+        | Use override: prefix instead, setDataDeepMerge throws error |
| Deep merge now default          | v1.0+        | Understand tags merge by default, use override: to opt out  |
| Layout front matter bug         | v1.0.0 only  | Upgrade to v1.0.1+ if layouts not inheriting data           |
| Liquid dynamic partials         | v2.0+        | Set dynamicPartials: false if includes lack quotes          |
| ESM migration required          | v3.0+        | Convert module.exports to export default                    |
| Reserved data names             | All versions | Never use "page" as alias or data key                       |

## Deployment-Specific Gotchas

| Platform         | Gotcha                                    | Prevention                                            |
| ---------------- | ----------------------------------------- | ----------------------------------------------------- |
| Netlify          | CSS not rebuilt if output folder compiled | Compile CSS to input dir, use passthrough copy        |
| CloudFlare Pages | Eleventy rebuild doesn't run SCSS         | Add SCSS to build command: `npm run scss && eleventy` |
| GitHub Pages     | Jekyll processes Eleventy output          | Add `.nojekyll` to output folder via passthrough      |
| Vercel           | Build timeout with many external fetches  | Use Eleventy Fetch with aggressive caching            |
| All platforms    | Filesystem timestamps not preserved       | Always use explicit date in front matter              |

## Now Page-Specific Pitfalls

| Pitfall                        | What Goes Wrong                              | Prevention                                       |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------ |
| No archive system              | Old now content lost forever                 | Build archive collection alongside current now   |
| Latest item wrong after deploy | Filesystem date used instead of content date | Use explicit date field, sort in config          |
| Now page in blog collection    | Appears in blog listings, RSS feed           | Use override:tags, exclude from post collection  |
| No update frequency visible    | Users don't know if stale                    | Include "last updated" date in template          |
| Manual latest selection        | Requires editing template each update        | Use collection sorting to auto-select first item |

## Sources

### Official Eleventy Documentation

- [Common Pitfalls — Eleventy](https://www.11ty.dev/docs/pitfalls/)
- [Data Deep Merge — Eleventy](https://www.11ty.dev/docs/data-deep-merge/)
- [Data Cascade — Eleventy](https://www.11ty.dev/docs/data-cascade/)
- [Collections — Eleventy](https://www.11ty.dev/docs/collections/)
- [Layouts — Eleventy](https://www.11ty.dev/docs/layouts/)
- [Permalinks — Eleventy](https://www.11ty.dev/docs/permalinks/)
- [Passthrough File Copy — Eleventy](https://www.11ty.dev/docs/copy/)

### Community Resources & Migration Guides

- [Migrating to Eleventy 2.0 - DEV Community](https://dev.to/starbist/migrating-to-eleventy-20-4jgn)
- [Moving to Eleventy - TrozWare](https://troz.net/post/2025/eleventy/)
- [Automate Netlify Redirects in 11ty](https://www.aleksandrhovhannisyan.com/blog/eleventy-netlify-redirects/)
- [Eleventy Redirect From](https://brianm.me/posts/eleventy-redirect-from/)
- [A Step-by-Step Guide to Sorting Eleventy Global Data Files by Date](https://stevenwoodson.com/blog/a-step-by-step-guide-to-sorting-eleventy-global-data-files-by-date/)
- [Sorting and Dating 11ty Posts by Name](https://bennypowers.dev/posts/sort-and-date-11ty-posts-by-name/)

### Content Strategy & Design

- [Content-First vs. Design-First: Which is the Better Web Strategy?](https://www.progress.com/blogs/content-first-vs-design-first-which-better-web-design-strategy)
- [Why content-first design makes better websites](https://contentsnare.com/content-first-design/)
- [Display Posts/Content in Latest Posts](https://github.com/11ty/eleventy/discussions/2549)
- [Mastering Eleventy: Display All Blog Posts from a Category on a Single Page](https://gregoryhammond.ca/blog/display-all-posts-from-category-on-page/)

---

_Pitfalls research for: Eleventy personal website redesign with now pages, template migration, and content consolidation_
_Researched: 2026-02-06_
_Confidence: MEDIUM-HIGH (Official docs HIGH, community patterns MEDIUM, specific project scenarios extrapolated from general patterns)_
