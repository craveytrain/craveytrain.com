# Architecture Research

**Domain:** Eleventy Static Site with Now Pages and Colophon Consolidation
**Researched:** 2026-02-06
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Layer                             │
│  ┌──────────────┐  ┌───────────┐  ┌──────────────┐         │
│  │ Now Pages    │  │ Colophon  │  │ Posts/Pages  │         │
│  │ (new)        │  │ Posts     │  │ (existing)   │         │
│  └──────┬───────┘  └─────┬─────┘  └──────┬───────┘         │
├─────────┴─────────────────┴────────────────┴─────────────────┤
│                   Collections Layer                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Collections API (config)                           │    │
│  │  - collections.now (new)                            │    │
│  │  - collections.colophon (filter existing)           │    │
│  │  - collections.post (existing)                      │    │
│  └───────────────────────┬─────────────────────────────┘    │
├───────────────────────────┴───────────────────────────────────┤
│                    Template Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐    │
│  │ Now      │  │ Colophon │  │ Posts    │  │ Single  │    │
│  │ (index+  │  │ (single  │  │ Listing  │  │ Post    │    │
│  │ archive) │  │ stacked) │  │          │  │         │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘    │
│       └─────────────┴──────────────┴─────────────┘          │
│                          ↓                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Shared Components (includes/)               │    │
│  │  accent-bar, header, footer, section-grid, dividers │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                      Layout Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ base.njk │  │ page.njk │  │ post.njk │                  │
│  │ (shell)  │  │ (simple) │  │ (sidebar)│                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
├─────────────────────────────────────────────────────────────┤
│                      Build Layer                             │
│  eleventy.config.js → _site/ (static output)                │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component                  | Responsibility                                           | Typical Implementation                                           |
| -------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| **Now Pages**              | Store dated now page content, auto-generate latest index | Markdown files in `site/now/` directory with directory data file |
| **Now Index**              | Display latest now page at `/now/`                       | Pagination with size:1 on sorted collection, alias to get latest |
| **Now Archives**           | Generate dated archive pages at `/now/<date>.html`       | Pagination on now collection with dynamic permalinks             |
| **Colophon Consolidation** | Single page assembling 9 existing colophon posts         | Template file using `collections.colophon` filtered and reversed |
| **Section Grid**           | 200px/1fr editorial layout pattern                       | Reusable include component with left label, right content        |
| **Shared Components**      | Accent bar, header, footer, dividers                     | Nunjucks includes in `includes/` directory                       |
| **Template Types**         | Homepage, now, posts listing, single post                | `.njk` files in `site/` using appropriate layouts                |

## Recommended Project Structure

```
site/
├── now/                    # NEW: Now page content directory
│   ├── now.json           # Directory data: sets tags, layout defaults
│   ├── 2026-02-06.md      # Individual now page entries (dated)
│   ├── 2025-11-15.md      # Older entries become archives
│   └── index.njk          # NEW: Auto-latest now page (pagination)
├── posts/                  # Existing blog posts
│   ├── colophon-v1.md     # Tagged with 'colophon'
│   ├── colophon-v2.md     # (9 total colophon posts)
│   └── ...
├── colophon.njk           # MODIFIED: Single stacked page
├── index.njk              # Homepage
├── posts.njk              # Posts listing
└── tags-pages.njk         # Tag pages

includes/
├── css/                    # Stylesheets
│   ├── index.css          # Global styles
│   └── now.css            # NEW: Now page styles
├── accent-bar.njk         # NEW: Shared component
├── header.njk             # Existing, may modify
├── footer.njk             # NEW: Shared component
├── section-grid.njk       # NEW: 200px/1fr layout component
├── divider.njk            # NEW: Horizontal rule component
├── post-link.njk          # Existing
├── post-list.njk          # Existing
└── webmentions.njk        # Existing

layouts/
├── base.njk               # HTML shell with new design system
├── page.njk               # Simple page layout
├── post.njk               # Single post with sidebar
└── now.njk                # NEW: Now page layout with sections

eleventy.config.js         # Add now collection, modify config
```

### Structure Rationale

- **`site/now/` directory:** Dedicated directory for now content allows directory data file to set collection tags automatically. Individual files named by date for clear chronology.
- **`now.json` directory data:** Automatically applies `tags: ["now"]` to all files in directory, reducing frontmatter repetition.
- **Pagination for auto-latest:** Eleventy pagination with size:1 and reverse sort generates `/now/index.html` with the latest entry without manual updates.
- **Archive pagination:** Second pagination generates dated archives at `/now/<date>.html` from the same source files.
- **Colophon as template:** Existing colophon posts already tagged, template queries collection and stacks them with year gutters.
- **Shared components in includes/:** Accent bar, section grid, dividers are reusable across all 4 template types.

## Architectural Patterns

### Pattern 1: Auto-Latest Collection Index with Pagination

**What:** Use Eleventy pagination with size:1 to automatically display the latest item from a date-sorted collection as the index page.

**When to use:** When you want `/collection/` to always show the most recent entry without manual updates. Perfect for now pages, status updates, or any "current" content.

**Trade-offs:**

- Pros: Fully automatic, no manual latest selection, clean separation of content and presentation
- Cons: Requires understanding pagination beyond its typical use case, adds one extra file to output

**Example:**

```yaml
# site/now/index.njk
---
layout: now
pagination:
  data: collections.now
  size: 1
  reverse: true
  alias: latest
permalink: '/now/'
eleventyExcludeFromCollections: true
---
<div class="page-header">
<h1>What I'm Doing Now</h1>
<p class="updated">Last updated {{ latest.date | prettyDate }}</p>
</div>

{{ latest.templateContent | safe }}
```

### Pattern 2: Dynamic Archive Permalinks with Date-Based URLs

**What:** Use pagination to generate individual archive pages with URLs derived from content data (e.g., `/now/2026-02-06.html`).

**When to use:** When each item in a collection deserves its own permanent URL based on metadata like date or slug.

**Trade-offs:**

- Pros: SEO-friendly URLs, individual addressability, automatic generation
- Cons: Pagination creates all pages upfront (not lazy), permalink template syntax in YAML requires quotes

**Example:**

```yaml
# site/now/archive.njk
---
layout: now
pagination:
  data: collections.now
  size: 1
  alias: nowEntry
permalink: '/now/{{ nowEntry.data.date | htmlDateString | slice(0, 10) }}.html'
eleventyExcludeFromCollections: true
---
{ { nowEntry.templateContent | safe } }
```

### Pattern 3: Consolidating Tagged Posts into Single Page

**What:** Query a collection by tag, filter and sort, then render all items stacked on a single template page.

**When to use:** When you have related content scattered across individual posts but want to present it as a unified narrative (colophon versions, changelog, series).

**Trade-offs:**

- Pros: Maintains individual post files for history, easy to add new entries, no duplication
- Cons: Long page if many entries, all content loads upfront, no pagination

**Example:**

```nunjucks
{# site/colophon.njk #}
---
title: Colophon
layout: page
---
<p class="intro">This site has evolved through many versions...</p>

{% set versions = collections.colophon | reverse %}
{%- for version in versions -%}
  <div class="sections">
    <div class="section-label">{{ version.data.date | date("yyyy") }}</div>
    <div class="section-content">
      <h2>{{ version.data.title }}</h2>
      {{ version.templateContent | safe }}
    </div>
  </div>
  {% if not loop.last %}<hr>{% endif %}
{%- endfor -%}
```

### Pattern 4: Directory Data for Collection Defaults

**What:** Use a directory data file (e.g., `now/now.json`) to set default frontmatter values for all files in that directory.

**When to use:** When a collection of files shares common metadata (tags, layout, permalink patterns).

**Trade-offs:**

- Pros: DRY principle, consistent collection configuration, easy to change all at once
- Cons: Less visible than frontmatter (hidden in data file), data cascade priority can be confusing

**Example:**

```json
// site/now/now.json
{
	"tags": ["now"],
	"layout": "now",
	"eleventyExcludeFromCollections": false
}
```

### Pattern 5: Reusable Components via Nunjucks Includes

**What:** Create small, focused template partials in `includes/` that accept data via template context and can be reused across multiple page types.

**When to use:** When the same UI pattern appears in multiple templates (header, footer, section grids, dividers).

**Trade-offs:**

- Pros: DRY, consistent UI patterns, easier to update globally
- Cons: Template context passing can be implicit, harder to trace data flow, no prop validation

**Example:**

```nunjucks
{# includes/section-grid.njk #}
<div class="sections">
  <div class="section-label">{{ label }}</div>
  <div class="section-content">
    {{ content | safe }}
  </div>
</div>

{# Usage in template #}
{% set content %}
  <h2>UX Engineering</h2>
  <p>I'm looking for my next opportunity...</p>
{% endset %}
{% include "section-grid.njk" with { label: "Work", content: content } %}
```

## Data Flow

### Build-Time Flow: Now Pages

```
1. Content Creation
   ├─ site/now/2026-02-06.md (markdown file)
   ├─ site/now/now.json (directory data: tags, layout)
   └─ Frontmatter merge

2. Collection Assembly
   ├─ Eleventy reads all .md files in site/now/
   ├─ Directory data adds tags: ["now"]
   ├─ collections.now created (9 items)
   └─ Sorted by date (oldest to newest)

3. Index Generation (Latest)
   ├─ site/now/index.njk (pagination: size 1, reverse)
   ├─ Takes latest item from reversed collection
   ├─ Alias: latest = collections.now[0] (after reverse)
   └─ Output: _site/now/index.html

4. Archive Generation (All)
   ├─ site/now/archive.njk (pagination: size 1, all items)
   ├─ Loops through all items in collections.now
   ├─ Permalink: /now/{{ date }}.html (dynamic)
   └─ Output: _site/now/2026-02-06.html, etc.

5. Template Rendering
   ├─ Layout: layouts/now.njk
   ├─ Includes: accent-bar, header, section-grid, footer
   └─ CSS: includes/css/now.css (inlined)
```

### Build-Time Flow: Colophon Consolidation

```
1. Source Files
   ├─ site/posts/colophon-v1.md (tags: ["colophon"])
   ├─ site/posts/colophon-v2.md
   └─ ... (9 total files)

2. Collection Assembly
   ├─ Eleventy creates collections.colophon
   └─ Sorted by date (v1=2001, v8=2019, v9=2022)

3. Template Query
   ├─ site/colophon.njk
   ├─ Filter: collections.colophon | reverse
   └─ Loop: render each version stacked

4. Section Grid Pattern
   ├─ Left gutter: year (from date)
   ├─ Right content: title + templateContent
   └─ Dividers between versions

5. Output
   └─ _site/colophon/index.html (single consolidated page)
```

### State Management

**Content State:**

- Now pages: Individual markdown files in `site/now/` (source of truth)
- Colophon: Individual posts in `site/posts/colophon-*.md` (source of truth)
- Posts: Individual markdown files in `site/posts/` (existing)

**Generated State:**

- Collections: Ephemeral, rebuilt on each build (collections.now, collections.colophon)
- Latest detection: Pagination logic determines latest at build time
- Archive URLs: Generated from date metadata via permalink template

**Configuration State:**

- Directory data: `site/now/now.json` (collection defaults)
- Global data: `data/metadata.json` (site metadata)
- Theme data: `_themes/` (compiled CSS variables)

## Integration Points

### Template-to-Collection Boundaries

| Template               | Collection Used        | Filter/Sort                      |
| ---------------------- | ---------------------- | -------------------------------- |
| `site/now/index.njk`   | `collections.now`      | Reverse (latest first), size 1   |
| `site/now/archive.njk` | `collections.now`      | All items, date-based permalinks |
| `site/colophon.njk`    | `collections.colophon` | Reverse (newest first)           |
| `site/posts.njk`       | `collections.post`     | Existing sort                    |
| `site/tags-pages.njk`  | `collections.tagList`  | Existing                         |

### Layout Chain Relationships

```
base.njk (HTML shell, accent-bar, footer)
  ├─ page.njk (simple content wrapper)
  │   └─ Used by: colophon, about, uses
  ├─ post.njk (sidebar metadata)
  │   └─ Used by: individual blog posts
  └─ now.njk (NEW: section grid layout)
      └─ Used by: now index, now archives
```

### Component Composition

**All Pages:**

- `includes/accent-bar.njk` (fixed top bar)
- `includes/header.njk` (logo + nav)
- `includes/footer.njk` (copyright + footer nav)

**Now Pages Only:**

- `includes/section-grid.njk` (200px/1fr layout)
- `includes/divider.njk` (horizontal rules between sections)

**Posts Pages:**

- `includes/post-link.njk` (existing)
- `includes/post-list.njk` (existing)
- `includes/tag-list.njk` (existing)

**Colophon Page:**

- `includes/section-grid.njk` (year gutter + version content)
- `includes/divider.njk` (between versions)

## Build Order Dependencies

### Phase 1: Foundation (No dependencies)

1. Create shared components (`accent-bar.njk`, `header.njk`, `footer.njk`)
2. Create `section-grid.njk` component
3. Create `divider.njk` component
4. Update `base.njk` layout with new design system

**Why first:** These are pure presentation components with no data dependencies. Foundation for all other templates.

### Phase 2: Now Pages Infrastructure (Depends on Phase 1)

1. Create `site/now/` directory
2. Create `site/now/now.json` directory data file
3. Create initial now page content file (`site/now/2026-02-06.md`)
4. Create `layouts/now.njk` layout
5. Add `collections.now` to `eleventy.config.js` (optional, tags auto-create it)

**Why second:** Requires foundation components. Self-contained feature, no cross-dependencies.

### Phase 3: Now Index and Archives (Depends on Phase 2)

1. Create `site/now/index.njk` with pagination (latest)
2. Create `site/now/archive.njk` with pagination (all)
3. Test auto-latest selection
4. Verify archive permalink generation

**Why third:** Requires now pages collection to exist. Uses pagination which needs content to paginate.

### Phase 4: Colophon Consolidation (Depends on Phase 1)

1. Verify existing colophon posts have `tags: ["colophon"]`
2. Update `site/colophon.njk` to query and stack collection
3. Apply section-grid pattern (year gutter)
4. Add dividers between versions
5. Test rendering of all 9 versions

**Why fourth:** Independent of now pages. Requires section-grid component from Phase 1.

### Phase 5: Redesign Application (Depends on all above)

1. Apply Warm Editorial design to homepage
2. Update posts listing template
3. Update single post template
4. Update uses page
5. Apply responsive breakpoints across all templates

**Why last:** Content structure is in place, foundation components exist. Pure design application.

## Component Boundaries

### Clear Boundaries

**Collections Layer → Template Layer:**

- Direction: One-way (templates read collections, never modify)
- Interface: `collections.collectionName` (array of page objects)
- Contract: Collections provide `data` (frontmatter), `templateContent` (rendered markdown), `url`, `date`

**Template Layer → Layout Layer:**

- Direction: One-way (templates select layouts via frontmatter)
- Interface: `layout: layoutName` in frontmatter
- Contract: Layouts provide `{{ content }}` slot for template body

**Layout Layer → Component Layer:**

- Direction: One-way (layouts include components)
- Interface: `{% include "component.njk" %}` with optional context
- Contract: Components receive data via template context, return HTML

### Data Flow Direction

```
Content Files (.md)
    ↓ (Eleventy reads)
Collections (in-memory)
    ↓ (templates query)
Templates (.njk)
    ↓ (select layout)
Layouts (.njk)
    ↓ (include components)
Components (.njk)
    ↓ (render to)
HTML Output (_site/)
```

**Critical Rule:** Data flows DOWN only. Components never query collections directly. Templates act as data controllers.

## Anti-Patterns

### Anti-Pattern 1: Using Computed Data for Layout/Pagination Configuration

**What people do:** Try to use `eleventyComputed` to set `layout`, `pagination`, or `tags` based on other data.

**Why it's wrong:** Eleventy documentation explicitly states: "Computed Data cannot be used to modify the special data properties used to configure templates." These properties are read before computed data executes.

**Do this instead:** Use directory data files (`now.json`) or frontmatter directly for configuration properties. Use computed data only for display values.

### Anti-Pattern 2: Mutating Collections with Array.reverse()

**What people do:** Sort collections in-place using `Array.reverse()` or `Array.sort()` on the original collection array.

**Why it's wrong:** Collections are shared across all templates. Mutating them causes unpredictable behavior in other templates that use the same collection.

**Do this instead:** Use Nunjucks `| reverse` filter in templates, or use `toReversed()` in JavaScript if creating custom collections. Collections API methods return new arrays.

### Anti-Pattern 3: Creating "Latest" Content Files Manually

**What people do:** Manually copy content from dated now pages to a `now/index.md` file, requiring updates in two places.

**Why it's wrong:** Violates DRY principle, prone to staleness when forgetting to update index, creates duplicate content.

**Do this instead:** Use pagination with size:1 and reverse sort to automatically select the latest item. Single source of truth.

### Anti-Pattern 4: Deep Nesting of Include Context

**What people do:** Pass complex nested objects through multiple levels of includes, making data flow opaque.

**Why it's wrong:** Hard to trace where data originates, implicit context makes components hard to understand in isolation, fragile when data structure changes.

**Do this instead:** Keep includes flat and focused. Pass only the specific data needed. Use clear naming for context variables.

### Anti-Pattern 5: Permalink Patterns Without Quotes in YAML

**What people do:** Write `permalink: /now/{{ date }}.html` without quotes in YAML frontmatter.

**Why it's wrong:** YAML parser chokes on `{` characters. Causes build errors that are hard to debug.

**Do this instead:** Always quote permalink templates: `permalink: "/now/{{ date }}.html"`. Eleventy documentation emphasizes this.

## Scaling Considerations

| Scale           | Architecture Approach                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------ |
| 1-10 now pages  | Current architecture perfect. Pagination generates all pages quickly.                            |
| 10-50 now pages | Consider archive listing page (all archives in one place). Current approach still fine.          |
| 50+ now pages   | Add archive pagination (e.g., `/now/archive/1/`, `/now/archive/2/`). Unlikely for personal site. |

| Scale                  | Architecture Approach                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| 1-10 colophon versions | Current stacked approach ideal. Single page loads fast.                                  |
| 10-20 versions         | Still works. Consider truncating older versions or "show more" interaction.              |
| 20+ versions           | Unlikely for site versions. If reached, consider pagination or year-based archive pages. |

### Performance Priorities

1. **Build time:** With 9 colophon posts and estimated 10 now pages, build time impact is negligible. Eleventy handles hundreds of pages easily.
2. **Page weight:** Colophon consolidation loads all versions upfront. At ~200 words per version × 9 = 1800 words, this is still lightweight.
3. **Maintenance:** Pagination-based auto-latest eliminates manual index updates. Lower maintenance burden than manual approaches.

**Optimization recommendation:** Current architecture scales well beyond expected content volume. No premature optimization needed.

## Sources

**Official Eleventy Documentation (HIGH confidence):**

- [Collections](https://www.11ty.dev/docs/collections/) — Basic collection patterns
- [Collections API](https://www.11ty.dev/docs/collections-api/) — getAll(), getFilteredByTag(), sorting methods
- [Pagination](https://www.11ty.dev/docs/pagination/) — Paginating collections, alias, size configuration
- [Permalinks](https://www.11ty.dev/docs/permalinks/) — Dynamic permalink patterns with template syntax
- [Computed Data](https://www.11ty.dev/docs/data-computed/) — Computed data capabilities and limitations
- [Data Cascade](https://www.11ty.dev/docs/data-cascade/) — Directory data files and priority order
- [Shortcodes](https://www.11ty.dev/docs/shortcodes/) — Reusable component pattern

**Community Resources (MEDIUM confidence):**

- [Building my now page using Eleventy • Cory Dransfeldt](https://www.coryd.dev/posts/2023/building-my-now-page-using-eleventy) — Real-world now page implementation
- [A Step-by-Step Guide to Sorting Eleventy Global Data Files by Date](https://stevenwoodson.com/blog/a-step-by-step-guide-to-sorting-eleventy-global-data-files-by-date/) — Collection sorting patterns
- [Creating and Using Eleventy Collections | 11ty Rocks!](https://11ty.rocks/posts/creating-and-using-11ty-collections/) — Collection creation patterns
- [Using 11ty JavaScript Data files to mix Markdown and CMS content](https://bryanlrobinson.com/blog/using-11ty-javascript-data-files-to-mix-markdown-and-cms-content-into-one-collection/) — Consolidating multiple sources

**Existing Codebase (HIGH confidence):**

- `/Users/mcravey/Projects/craveytrain.com/.planning/codebase/ARCHITECTURE.md` — Current architecture analysis
- `/Users/mcravey/Projects/craveytrain.com/.planning/codebase/STRUCTURE.md` — Current directory structure
- `/Users/mcravey/Projects/craveytrain.com/eleventy.config.js` — Current Eleventy configuration
- `/Users/mcravey/Projects/craveytrain.com/site/colophon.njk` — Existing colophon implementation pattern

---

_Architecture research for: Eleventy personal website redesign with now pages and colophon consolidation_
_Researched: 2026-02-06_
