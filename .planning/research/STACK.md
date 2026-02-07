# Stack Research

**Domain:** Eleventy personal website redesign (feature additions)
**Researched:** 2026-02-06
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology     | Version                 | Purpose                   | Why Recommended                                                                                                                              |
| -------------- | ----------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| @11ty/eleventy | 3.1.2 (current stable)  | Static site generator     | Already in use. Eleventy 3.x provides ESM support, async config, and virtual templates. Stable, well-maintained, perfect for personal sites. |
| Node.js        | 24.x                    | Runtime environment       | Already specified in `.node-version`. Supports all Eleventy 3.x features and provides modern JavaScript capabilities.                        |
| TypeScript     | 5.7.3                   | Type-checked theme system | Already in use for theme definitions. Continue using for type safety in configuration.                                                       |
| Nunjucks       | (bundled with Eleventy) | Template engine           | Already in use. Powerful filters and template inheritance. Best choice for Eleventy projects needing complexity.                             |

### Supporting Libraries

| Library                      | Version             | Purpose                     | When to Use                                                                                                                                               |
| ---------------------------- | ------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lodash                       | 4.17.21             | Data manipulation utilities | **REQUIRED** for grouping collections by date (year/month). Use `_.groupBy()`, `_.chain()`, `_.toPairs()` for archive collections. Already installed.     |
| markdown-it                  | 14.1.0              | Markdown parser             | Already in use. Continue using for content parsing.                                                                                                       |
| sanitize-html                | 2.14.0              | HTML sanitization           | Already in use for webmentions. Keep for security.                                                                                                        |
| @11ty/eleventy-plugin-bundle | (bundled with 3.0+) | Per-page CSS bundling       | **RECOMMENDED** for organizing CSS by layout. Opt-in plugin that ships with Eleventy 3.0+. Enables minimal per-page CSS bundles without external bundler. |

### CSS Optimization Stack (Current)

| Tool      | Version | Purpose                        | Notes                                                                                   |
| --------- | ------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| purgecss  | 7.0.2   | Remove unused CSS              | Already in use via `utils/optimize-css.js`. **Keep** for production builds only (slow). |
| csso      | 5.0.5   | CSS minification               | Already in use via `utils/optimize-css.js`. **Keep** for final optimization.            |
| clean-css | 5.3.3   | CSS minification (alternative) | Already installed but appears unused. **Can remove** if only using CSSO.                |

### Development Tools (Keep Current)

| Tool                | Purpose              | Notes                                                      |
| ------------------- | -------------------- | ---------------------------------------------------------- |
| prettier            | Code formatting      | Already configured. Keep existing setup.                   |
| eslint              | JavaScript linting   | Already configured with Babel parser. Keep existing setup. |
| stylelint           | CSS linting          | Already configured. Keep existing setup.                   |
| husky + lint-staged | Git hooks            | Already configured. Keep existing setup.                   |
| npm-run-all         | Script orchestration | Already in use for parallel/sequential builds. Keep.       |

## CSS Organization Strategy

### Recommended Approach: Hybrid (Single Global + Bundle Plugin for Layout-Specific)

**For this project, use:**

1. **Single global CSS file** for site-wide styles (existing `includes/css/index.css`)

   - Base styles, typography, colors, layout grid
   - Shared component styles (header, nav, footer)
   - Already using this pattern successfully

2. **Bundle plugin for layout-specific CSS** (NEW - for "now", "colophon", "uses" pages)
   - Enable `@11ty/eleventy-plugin-bundle` in `eleventy.config.js`
   - Create layout-specific CSS files (e.g., `includes/css/now.css`, `includes/css/colophon.css`)
   - Use `{% css %}` shortcode in layouts to add CSS to bundle
   - Use `{% getBundle "css" %}` in `<head>` to inline critical CSS

**Why this approach:**

- **No new dependencies** - Bundle plugin ships with Eleventy 3.0+
- **Performance** - Each page gets only the CSS it needs (important for single-page features like colophon)
- **Maintainability** - CSS lives next to the layout that uses it
- **Simple** - No external bundler, no complex build pipeline
- **Progressive enhancement** - Can add bundles incrementally without breaking existing CSS

**Alternative considered:** Full component-based CSS with WebC

- **Why not:** Adds complexity, requires rewriting templates, overkill for a few new pages
- **When to use:** If redesigning entire site or building a design system

### Bundle Plugin Setup Pattern

```javascript
// eleventy.config.js
import bundlePlugin from '@11ty/eleventy-plugin-bundle'

export default async function (eleventyConfig) {
	// Add bundle plugin
	eleventyConfig.addPlugin(bundlePlugin)

	// Rest of config...
}
```

```html
<!-- layouts/now.njk -->
{% css %} {% include "css/now.css" %} {% endcss %}

<!-- In base.njk <head> -->
<style>
	{% getBundle "css" %}
</style>
```

**Confidence:** HIGH (official plugin, well-documented, ships with Eleventy 3.0+)

## Collections Patterns for Features

### Now Page System

**Pattern:** Custom collection with date-based grouping + automatic latest redirect

```javascript
// eleventy.config.js
import _ from 'lodash'

eleventyConfig.addCollection('nowByDate', collection => {
	const nowPosts = collection.getFilteredByTag('now')

	// Group by year-month for archives
	const grouped = _.chain(nowPosts)
		.groupBy(post => {
			const date = new Date(post.date)
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
		})
		.toPairs()
		.reverse()
		.value()

	return grouped
})

eleventyConfig.addCollection('latestNow', collection => {
	const nowPosts = collection.getFilteredByTag('now')
	return nowPosts.sort((a, b) => b.date - a.date)[0]
})
```

**File structure:**

```
site/now/
  index.njk           # Redirects to latest or shows latest
  archive.njk         # Lists all now pages by month/year
  YYYY-MM-DD.md       # Individual now page entries (tagged "now")
```

**Confidence:** HIGH (standard Eleventy pattern, lodash already installed)

### Colophon Consolidation

**Pattern:** Virtual collection combining existing blog posts + custom rendering

```javascript
// eleventy.config.js
eleventyConfig.addCollection('colophonHistory', collection => {
	// Get all colophon-v* posts
	const colophonPosts = collection
		.getAll()
		.filter(post => post.inputPath.includes('colophon-v'))
		.sort((a, b) => {
			// Sort by version number (extract from filename)
			const versionA = parseInt(a.fileSlug.replace('colophon-v', ''))
			const versionB = parseInt(b.fileSlug.replace('colophon-v', ''))
			return versionB - versionA // Newest first
		})

	return colophonPosts
})
```

**File structure:**

```
site/colophon.njk    # Single page that loops through colophonHistory collection
site/posts/
  colophon-v1.md     # Existing posts (keep as-is)
  colophon-v2.md
  ...
  colophon-v9.md
```

**Layout pattern:**

```njk
{# colophon.njk #}
{% for version in collections.colophonHistory %}
  <section id="v{{ loop.index }}">
    <h2>Version {{ loop.index }}</h2>
    <time>{{ version.date | prettyDate }}</time>
    {{ version.content | safe }}
  </section>
{% endfor %}
```

**Confidence:** HIGH (standard collection filtering and sorting)

### Uses Page

**Pattern:** Simple single-page template (no collection needed)

```
site/uses.md         # Markdown file with frontmatter layout: page
```

**Confidence:** HIGH (already using this pattern for about.md)

## What NOT to Use

| Avoid                                            | Why                                                                                                                          | Use Instead                                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| eleventy-plugin-purgecss (npm package)           | Async timing issues with --serve mode, slower than transform approach                                                        | Continue using `utils/optimize-css.js` transform with PurgeCSS directly (already implemented) |
| External CSS bundlers (Webpack, Parcel, esbuild) | Overkill for this project, adds build complexity, slower builds                                                              | Bundle plugin (ships with Eleventy 3.0+)                                                      |
| Moment.js for date manipulation                  | Large dependency (deprecated), unnecessary for simple grouping                                                               | Use native JavaScript `Date` object + lodash groupBy                                          |
| WebC for CSS organization                        | Requires rewriting all templates, overkill for incremental features                                                          | Bundle plugin for new pages, keep existing global CSS                                         |
| Tailwind CSS                                     | Requires complete styling rewrite, conflicts with custom "Warm Editorial" design system                                      | Continue with custom CSS + CSS variables from theme system                                    |
| Clean-css package                                | Redundant with CSSO, both do CSS minification                                                                                | Remove `clean-css` from package.json, keep only CSSO                                          |
| Template engines other than Nunjucks             | Already using Nunjucks, switching adds no value, Eleventy 3.0 removed low-use engines (Pug, Handlebars, Mustache, EJS, Haml) | Continue with Nunjucks                                                                        |

## Installation

```bash
# No new dependencies required!
# Bundle plugin ships with Eleventy 3.0+

# Optional cleanup (remove unused clean-css):
npm uninstall clean-css
```

## Stack Patterns by Feature

### For "Now" Page System

**Stack components:**

- Eleventy collections API (custom collection with lodash groupBy)
- Lodash 4.17.21 (already installed - for date grouping)
- Nunjucks templates (for loops, filtering, latest detection)
- Bundle plugin (for now.css layout-specific styles)

**Pattern:**

1. Create custom collections in `eleventy.config.js` (nowByDate, latestNow)
2. Tag markdown files with `tags: ["now"]`
3. Use collection in templates to render latest or archives
4. Add layout-specific CSS via Bundle plugin

### For "Colophon" Consolidation

**Stack components:**

- Eleventy collections API (filter existing posts by filename pattern)
- Nunjucks templates (for looping over versions in stacked layout)
- Bundle plugin (for colophon.css layout-specific styles)

**Pattern:**

1. Create custom collection filtering colophon-v\* posts
2. Sort by version number (extracted from filename)
3. Render all in single page with stacked sections
4. Add anchor links for version navigation

### For "Uses" Page

**Stack components:**

- Markdown-it (already in use for content parsing)
- Nunjucks layout (use existing "page" layout)
- Bundle plugin (optional - for uses.css if needed)

**Pattern:**

1. Create `site/uses.md` with frontmatter `layout: page`
2. Write content in markdown
3. No custom collection needed (single page)

## Version Compatibility

| Package                      | Version   | Compatible With       | Notes                                                                                     |
| ---------------------------- | --------- | --------------------- | ----------------------------------------------------------------------------------------- |
| @11ty/eleventy               | 3.1.2     | Node 18+ (using 24.x) | Requires Node 18+. ESM support requires `"type": "module"` in package.json (already set). |
| lodash                       | 4.17.21   | Eleventy 3.x          | No compatibility issues. Used in existing webmentions.js utility.                         |
| purgecss                     | 7.0.2     | Eleventy 3.x          | Works with transform approach. Slow, so only run in production builds.                    |
| csso                         | 5.0.5     | Eleventy 3.x          | No compatibility issues.                                                                  |
| @11ty/eleventy-plugin-bundle | (bundled) | Eleventy 3.0+         | Ships with Eleventy 3.0+, opt-in via addPlugin().                                         |

## Google Fonts Recommendation

**Current approach:** Using Google Fonts CDN for Fraunces + Inter

**Recommended change:** **Self-host fonts**

**Why:**

- **Performance:** Eliminates external DNS lookup, SSL handshake, and network request. PageSpeed improvements of 20-30 points reported.
- **Privacy:** EU GDPR compliance (Google Fonts CDN is illegal under EU privacy law). Avoids legal issues.
- **Cache changes:** Modern browsers use double-keyed cache (Safari, Chrome) - no cross-site caching benefit from Google CDN anymore.
- **Control:** Full control over `font-display`, caching headers, and subset selection.

**Implementation:**

1. Download Fraunces and Inter font files (woff2 format only for modern browsers)
2. Add to `static/fonts/` directory
3. Use `@font-face` in `includes/css/index.css` with `font-display: swap`
4. Set long cache headers (1 year) via Netlify `_headers` file
5. Optional: Preload critical fonts in `<head>` with `<link rel="preload">`

**Tools to help:**

- [google-webfonts-helper](https://gwfh.mranftl.com/fonts) - Download and generate @font-face CSS
- Variable fonts (Fraunces and Inter both support this) - Single file includes all weights

**Confidence:** HIGH (current industry best practice, multiple sources confirm)

## Build Optimization Recommendations

### Current Setup Assessment

**What's already optimized:**

- PurgeCSS + CSSO via transform (good)
- TypeScript compilation separate from site build (good)
- Parallel script execution with npm-run-all (good)
- Static asset passthrough (good)

**Optimization opportunities:**

1. **Conditional PurgeCSS** (RECOMMENDED)

   ```javascript
   // Only run PurgeCSS in production
   if (process.env.ELEVENTY_ENV === 'production') {
   	eleventyConfig.addTransform('optimizeCSS', optimizeCSS)
   }
   ```

   **Why:** PurgeCSS is slow. Skip it during development for faster rebuilds.
   **Confidence:** HIGH

2. **Remove clean-css dependency** (RECOMMENDED)

   - Already using CSSO for minification
   - clean-css appears unused (not in optimize-css.js)
   - Saves dependency weight
     **Confidence:** HIGH

3. **Use Eleventy Dev Server for passthrough** (RECOMMENDED for 3.0+)

   - Eleventy 3.0+ Dev Server optimizes passthrough copy to avoid build loop
   - Already using correct pattern (addPassthroughCopy)
     **Confidence:** HIGH

4. **Consider --incremental flag** (OPTIONAL for development)
   - Eleventy 3.0+ supports `--incremental` builds
   - Only rebuilds changed files
   - Good for very large sites (not critical for personal blog)
     **Confidence:** MEDIUM (nice-to-have, not required for this project size)

## Sources

### Official Documentation (HIGH confidence)

- [Eleventy Collections API](https://www.11ty.dev/docs/collections/) - Collection creation and sorting
- [Eleventy Pagination](https://www.11ty.dev/docs/pagination/) - Pagination capabilities
- [Eleventy Bundle Plugin](https://www.11ty.dev/docs/plugins/bundle/) - Per-page CSS bundling
- [Eleventy Plugins](https://www.11ty.dev/docs/plugins/) - Official plugin list
- [Eleventy v3.0 Release Notes](https://www.11ty.dev/blog/eleventy-v3/) - Version 3.0 features
- [Eleventy 2025 in Review](https://www.11ty.dev/blog/review-2025/) - Recent updates and v3.1.0 features

### Community Resources (MEDIUM-HIGH confidence)

- [Grouping blog posts by year in Eleventy](https://jamesdoc.com/blog/2021/11ty-posts-by-year/) - Date grouping pattern
- [Eleventy year, year-month, and year-month-day indexes](https://blog.tomayac.com/2024/11/02/eleventy-11ty-year-year-month-and-year-month-day-indexes/) - Comprehensive date archive approach
- [List blog posts grouped by year with Eleventy](https://hamatti.org/posts/list-blog-posts-grouped-by-year-with-eleventy/) - Simple collection pattern (2025)
- [Group posts by year in Eleventy](https://darekkay.com/blog/eleventy-group-posts-by-year/) - Alternative lodash approach
- [Manually splitting CSS files in Eleventy](https://danabyerly.com/articles/manually-splitting-css-files-in-eleventy/) - CSS organization patterns
- [The evolution of my CSS pipeline in Eleventy (part 1)](https://bobmonsour.com/blog/the-evolution-of-my-CSS-pipeline-in-eleventy-part-1/) - CSS pipeline approaches
- [The evolution of my CSS pipeline in Eleventy (part 2)](https://bobmonsour.com/blog/the-evolution-of-my-CSS-pipeline-in-eleventy-part-2/) - CSS pipeline evolution

### Google Fonts Performance (HIGH confidence)

- [Should you self-host Google Fonts?](https://www.tunetheweb.com/blog/should-you-self-host-google-fonts/) - Comprehensive analysis
- [Why I Switched From Google Fonts CDN to Self-Hosting](https://dev.to/web_dev-usman/why-i-switched-from-google-fonts-cdn-to-self-hosting-and-never-looked-back-3fbh) - Real-world performance gains
- [Self-Hosting vs Google Fonts: Deciding Your Best Choice](https://www.capitalnumbers.com/blog/self-hosting-vs-google-fonts/) - Detailed comparison

### PurgeCSS Optimization (MEDIUM confidence)

- [eleventy-plugin-purgecss - npm](https://www.npmjs.com/package/eleventy-plugin-purgecss) - Plugin documentation (not recommended - has async issues)
- [Using PurgeCSS and CleanCSS with 11ty](https://gist.github.com/antstanley/82fa3a8d1910858a3401ee64dc9728f8) - Transform pattern (current approach)
- [Eleventy Performance](https://www.11ty.dev/docs/performance/) - Official performance tips

---

_Stack research for: Eleventy personal website redesign_
_Researched: 2026-02-06_
