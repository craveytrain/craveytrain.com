# Phase 1: Now Page System - Research

**Researched:** 2026-02-06
**Domain:** Eleventy static site generation, now page content pattern
**Confidence:** HIGH

## Summary

This phase implements a now page system using standard Eleventy patterns already present in the codebase. The site uses Eleventy 3.0.0 with Nunjucks templates, the eleventy-navigation plugin for site navigation, and directory data files for collection defaults. All required functionality (date formatting, pagination for "latest" pages, previous/next navigation, custom permalinks) is available through built-in Eleventy features.

The now page concept is well-documented by nownownow.com: a page describing what you're focused on right now, updated periodically, distinct from a static "about" page. The user decisions lock in specific content structure (5 sections), date format ("Feb 6, 2026"), archive URL format (`/now/2026-02-06.html`), and navigation patterns.

**Primary recommendation:** Use directory data file (`now/now.json`) for collection defaults, pagination with `size: 1` for generating dated archive pages, and the built-in `getPreviousCollectionItem`/`getNextCollectionItem` filters for navigation links.

## Standard Stack

The established libraries/tools for this domain:

### Core

| Library                   | Version   | Purpose               | Why Standard                            |
| ------------------------- | --------- | --------------------- | --------------------------------------- |
| @11ty/eleventy            | 3.0.0     | Static site generator | Already in use, current major version   |
| @11ty/eleventy-navigation | 0.3.5     | Site navigation       | Already in use for nav/foot collections |
| Nunjucks                  | (bundled) | Templating            | Already site's template language        |

### Supporting

| Library             | Version | Purpose         | When to Use                                          |
| ------------------- | ------- | --------------- | ---------------------------------------------------- |
| Native Date methods | N/A     | Date formatting | Existing `prettyDate` filter uses toLocaleDateString |

### Alternatives Considered

| Instead of            | Could Use         | Tradeoff                                                                  |
| --------------------- | ----------------- | ------------------------------------------------------------------------- |
| Native Date           | Luxon             | Luxon adds dependency; native methods sufficient for "Feb 6, 2026" format |
| Pagination for latest | Custom collection | Pagination is simpler, documented pattern                                 |

**Installation:**

```bash
# No additional packages needed - all features available in current stack
```

## Architecture Patterns

### Recommended Project Structure

```
site/
  now/
    now.json              # Directory data: layout, tags, override:tags
    index.md              # Current now page content (latest)
    2026-02-06.md         # First archived version (example)
    archive.njk           # Archive listing page template
layouts/
  now.njk                 # Now page layout (extends page.njk)
includes/
  now-nav.njk             # Previous/next navigation include
```

### Pattern 1: Directory Data for Collection Defaults

**What:** Use `now/now.json` to set default layout, tags, and prevent tag cascade merging
**When to use:** For all files in the `now/` directory
**Example:**

```json
// site/now/now.json
// Source: https://www.11ty.dev/docs/data-template-dir/
{
	"layout": "now",
	"tags": ["now"],
	"override:tags": ["now"]
}
```

The `override:tags` key prevents the data cascade from merging parent tags - each now page only gets the "now" tag.

### Pattern 2: Pagination for Latest Page (Auto-Generated Index)

**What:** Use pagination with reverse order and size 1 to generate `/now/` showing the latest content
**When to use:** For requirement NOW-04 (latest now content at `/now/`)
**Example:**

```yaml
---
# site/now/index.njk (or separate template)
pagination:
  data: collections.now
  size: 1
  reverse: true
  alias: latestNow
permalink: /now/
layout: now
title: What I'm Doing Now
---
{ { latestNow.content | safe } }
```

**Note:** This approach uses pagination to automatically select the most recent now page. Alternative approach: manually create index.md as the current now page content.

### Pattern 3: Dated Archive Permalinks

**What:** Each now page gets a dated archive URL based on frontmatter date
**When to use:** For requirement NOW-05 (dated archives at `/now/<date>.html`)
**Example:**

```yaml
---
# In now page content file
title: What I'm Doing Now
date: 2026-02-06
permalink: /now/{{ page.date | date: '%Y-%m-%d' }}.html
---
```

Or using eleventyComputed for all files:

```json
// site/now/now.json
{
	"layout": "now",
	"tags": ["now"],
	"override:tags": ["now"],
	"eleventyComputed": {
		"permalink": "/now/{{ page.date | date: '%Y-%m-%d' }}.html"
	}
}
```

### Pattern 4: Previous/Next Navigation

**What:** Use built-in collection item filters for navigation between archived versions
**When to use:** For requirement NOW-07 (previous/next links)
**Example:**

```nunjucks
{# includes/now-nav.njk #}
{# Source: https://www.11ty.dev/docs/filters/collection-items/ #}
{% set previousNow = collections.now | getPreviousCollectionItem(page) %}
{% set nextNow = collections.now | getNextCollectionItem(page) %}

<nav class="now-pagination">
  {% if previousNow %}
    <a href="{{ previousNow.url }}">Previous</a>
  {% endif %}
  {% if nextNow %}
    <a href="{{ nextNow.url }}">Next</a>
  {% endif %}
</nav>
```

### Pattern 5: Navigation Integration

**What:** Add "Now" to site navigation using existing eleventy-navigation pattern
**When to use:** For page identity requirement ("Now" appears in site navigation)
**Example:**

```yaml
---
tags: nav
eleventyNavigation:
  key: Now
  order: 0
---
```

The site already uses `collections.nav | eleventyNavigation` in header.njk.

### Anti-Patterns to Avoid

- **Using filesystem dates:** Always use explicit `date` in frontmatter; filesystem dates reset on deploy
- **Mutating collections with `reverse()`:** Use `toReversed()` (Node 20+) or filters, not in-place mutation
- **Nested layouts with `content`:** Use `templateContent` when embedding full posts to avoid layout nesting
- **Forgetting `override:tags`:** Without this, now pages would inherit parent directory tags via data cascade

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem               | Don't Build           | Use Instead                                         | Why                                                         |
| --------------------- | --------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| Date formatting       | Custom date parser    | Existing `prettyDate` filter                        | Already handles "Feb 6, 2026" format via toLocaleDateString |
| Previous/next links   | Manual array indexing | `getPreviousCollectionItem`/`getNextCollectionItem` | Built-in, handles edge cases (first/last item)              |
| Latest page selection | Custom sorting logic  | Pagination with `reverse: true, size: 1`            | Standard Eleventy pattern, automatically updates            |
| Collection grouping   | Manual file iteration | Directory data + tags                               | Standard Eleventy pattern for content organization          |
| Navigation ordering   | Custom nav building   | eleventy-navigation plugin                          | Already in use, handles ordering via `order` key            |

**Key insight:** Every feature needed is standard Eleventy - no custom JavaScript logic required beyond what exists. The codebase already demonstrates all these patterns (posts collection, navigation, date filters).

## Common Pitfalls

### Pitfall 1: Filesystem Date Reliance

**What goes wrong:** Dates appear as deployment date instead of written date
**Why it happens:** Eleventy falls back to file creation date if no frontmatter date; git/deploy resets timestamps
**How to avoid:** Always include explicit `date` in frontmatter for every now page
**Warning signs:** Archive listing shows clustered dates or current date

### Pitfall 2: Data Cascade Tag Merging

**What goes wrong:** Now pages inherit unwanted tags from parent directories
**Why it happens:** Eleventy deep-merges arrays by default in data cascade
**How to avoid:** Use `override:tags` in directory data file
**Warning signs:** Now pages appearing in unexpected collections

### Pitfall 3: UTC Date Display Issues

**What goes wrong:** Dates off by one day (e.g., Feb 5 shows instead of Feb 6)
**Why it happens:** YAML dates like `2026-02-06` assume midnight UTC; local timezone display shifts date
**How to avoid:** Existing `prettyDate` filter uses toLocaleDateString which handles this correctly
**Warning signs:** Dates appearing as day before written date

### Pitfall 4: Permalink Missing Quotes

**What goes wrong:** YAML parsing error or silent template failure
**Why it happens:** Template syntax `{{ }}` looks like YAML object notation
**How to avoid:** Always quote permalinks containing template syntax
**Warning signs:** Build errors mentioning YAML parsing, or unexpected permalink output

### Pitfall 5: Collection Mutation

**What goes wrong:** Posts appear in wrong order across different pages
**Why it happens:** Using `array.reverse()` mutates the collection in place
**How to avoid:** Use `| reverse` filter in Nunjucks or `toReversed()` in JavaScript
**Warning signs:** Inconsistent ordering between pages that use same collection

## Code Examples

Verified patterns from official sources and existing codebase:

### Directory Data File (now.json)

```json
// site/now/now.json
// Source: https://www.11ty.dev/docs/data-template-dir/
{
	"layout": "now",
	"tags": ["now"],
	"override:tags": ["now"]
}
```

### Now Page Content Template

```markdown
---
title: What I'm Doing Now
date: 2026-02-06
---

This is a [now page](https://nownownow.com/about). If you have your own site, you should make one too.

## Work

Current focus areas...

## Building

Side projects...

## Learning

What I'm studying...

## Reading

Current books...

## Life

Personal updates...
```

### Now Layout (extends existing page layout)

```nunjucks
---
layout: page
---
{# Date byline - uses existing prettyDate filter #}
<p class="now-date">As of {{ date | prettyDate }}</p>

{{ content | safe }}

{# Previous/next navigation #}
{% include "now-nav.njk" %}

{# Link to archive #}
<p><a href="/now/archive/">View previous updates</a></p>
```

### Archive Listing Page

```nunjucks
---
title: Now Page Archive
layout: page
permalink: /now/archive/
---
<p>Previous updates to my now page:</p>

<ul>
{% for entry in collections.now | reverse %}
  <li>
    <a href="{{ entry.url }}">{{ entry.date | prettyDate }}</a>
    {# Auto-summary: first paragraph or custom excerpt #}
  </li>
{% endfor %}
</ul>
```

### Previous/Next Navigation Include

```nunjucks
{# includes/now-nav.njk #}
{# Source: https://www.11ty.dev/docs/filters/collection-items/ #}
{% set previousNow = collections.now | getPreviousCollectionItem(page) %}
{% set nextNow = collections.now | getNextCollectionItem(page) %}

{% if previousNow or nextNow %}
<nav class="now-pagination">
  {% if previousNow %}
    <a href="{{ previousNow.url }}" rel="prev">Previous</a>
  {% endif %}
  {% if nextNow %}
    <a href="{{ nextNow.url }}" rel="next">Next</a>
  {% endif %}
</nav>
{% endif %}
```

### Date-Based Permalink (in directory data)

```json
// site/now/now.json - with computed permalink
{
	"layout": "now",
	"tags": ["now"],
	"override:tags": ["now"],
	"eleventyComputed": {
		"permalink": "/now/{{ page.date | date: '%Y-%m-%d' }}.html"
	}
}
```

## State of the Art

| Old Approach                | Current Approach                 | When Changed | Impact                                           |
| --------------------------- | -------------------------------- | ------------ | ------------------------------------------------ |
| Luxon for dates             | Native Date + Intl               | Eleventy 3.0 | Less dependencies, toLocaleDateString sufficient |
| Array.reverse()             | toReversed() or filter           | Node 20+     | Avoid collection mutation bugs                   |
| Custom collection iteration | getPreviousCollectionItem filter | Eleventy 2.0 | Built-in, cleaner templates                      |

**Deprecated/outdated:**

- Moment.js: Replaced by Luxon, but native Date methods often sufficient
- `page` in Data Cascade: Use `page.date` not raw `date` for resolved Date object

## Open Questions

Things that couldn't be fully resolved:

1. **Auto-generated summary for archive listing**

   - What we know: User wants "brief auto-generated summary" in archive listing
   - What's unclear: Best method - first paragraph extraction, or custom excerpt field
   - Recommendation: Use Nunjucks `truncate` filter on content, or extract first `<p>` tag; Claude's discretion per CONTEXT.md

2. **Index page approach: Pagination vs. Direct Content**
   - What we know: Both work - pagination auto-selects latest, direct content is simpler
   - What's unclear: User preference for manual vs. automatic latest selection
   - Recommendation: Direct content approach (user creates content in index.md) is simpler and matches user decision that they write content

## Sources

### Primary (HIGH confidence)

- https://www.11ty.dev/docs/pagination/ - Pagination for multiple pages from data
- https://www.11ty.dev/docs/pages-from-data/ - Creating pages with custom permalinks
- https://www.11ty.dev/docs/filters/collection-items/ - getPreviousCollectionItem/getNextCollectionItem
- https://www.11ty.dev/docs/data-template-dir/ - Directory data files
- https://www.11ty.dev/docs/data-cascade/ - Data cascade and override prefix
- https://www.11ty.dev/docs/dates/ - Date handling and frontmatter dates
- https://www.11ty.dev/docs/permalinks/ - Dynamic permalinks with template syntax
- https://nownownow.com/about - Now page concept and guidelines

### Secondary (MEDIUM confidence)

- Existing codebase patterns: posts.json, eleventy.config.js, layouts/

### Tertiary (LOW confidence)

- None required - all findings verified with official documentation

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Using only existing dependencies, all verified in package.json
- Architecture: HIGH - Patterns match existing codebase and official docs
- Pitfalls: HIGH - Well-documented in official Eleventy docs and verified against codebase

**Research date:** 2026-02-06
**Valid until:** 60 days (Eleventy 3.x is stable)
