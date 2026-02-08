# Phase 2: Colophon Consolidation - Research

**Researched:** 2026-02-08
**Domain:** Eleventy Static Site Generator - File Organization and Collections
**Confidence:** HIGH

## Summary

This phase involves relocating 9 colophon blog posts from `site/posts/` to a new `site/colophon/` directory to remove them from the main blog listing while preserving their display in the consolidated colophon page. The research focused on understanding Eleventy's collection system, directory data file inheritance, permalink behavior, and HTML anchor patterns.

The key discovery is that Eleventy collections are tag-based and tags are inherited from directory data files. Moving files from `site/posts/` (which has `posts.json` adding the "post" tag) to `site/colophon/` will automatically remove them from the `collections.post` collection while preserving their `colophon` tag (specified in each file's front matter). The consolidated display page at `site/colophon.njk` already exists and uses `collections['colophon']` to render all versions.

The codebase already follows this pattern: the `site/now/` directory uses a `now.json` directory data file with `override:tags` to manage collection membership independent of content location.

**Primary recommendation:** Create a `site/colophon/colophon.json` directory data file with `override:tags: ["colophon"]` to ensure files remain in the colophon collection only, then move all 9 colophon-vX.md files to the new directory.

## Standard Stack

The established tools for this domain:

### Core

| Library  | Version        | Purpose               | Why Standard                                         |
| -------- | -------------- | --------------------- | ---------------------------------------------------- |
| Eleventy | ~2.0+          | Static Site Generator | Project's existing SSG, handles collections via tags |
| Nunjucks | (via Eleventy) | Templating language   | Used in colophon.njk template                        |

### Supporting

| Library | Version | Purpose                        | When to Use                         |
| ------- | ------- | ------------------------------ | ----------------------------------- |
| N/A     | N/A     | No additional libraries needed | This is pure Eleventy configuration |

### Alternatives Considered

| Instead of          | Could Use               | Tradeoff                                              |
| ------------------- | ----------------------- | ----------------------------------------------------- |
| Directory data file | Individual front matter | Manually updating 9 files vs. single config file      |
| `override:tags`     | Additive tags           | More explicit control over exact tags vs. tag merging |

**Installation:**

```bash
# No installation needed - using existing Eleventy setup
```

## Architecture Patterns

### Recommended Project Structure

```
site/
├── posts/                # Blog posts only
│   └── posts.json        # Adds "post" tag to all files
├── colophon/             # Colophon versions (NEW)
│   ├── colophon.json     # Adds "colophon" tag only
│   ├── colophon-v1.md
│   ├── colophon-v2.md
│   └── ...
├── now/                  # Existing pattern to follow
│   ├── now.json          # Uses override:tags: ["now"]
│   └── *.md
└── colophon.njk          # Collection display page
```

### Pattern 1: Directory Data Files for Collection Membership

**What:** Use directory-scoped JSON files to control which collections files belong to
**When to use:** When entire directories should share common metadata (tags, layout, etc.)
**Example:**

```json
// Source: Codebase site/now/now.json
{
	"layout": "now",
	"override:tags": ["now"]
}
```

**How it works (verified via official Eleventy docs):**

- Directory data file must match directory name: `colophon/colophon.json`
- Applies to all templates in that directory AND subdirectories
- `override:tags` replaces inherited tags instead of merging them
- Without `override:`, tags from directory data merge with front matter tags

### Pattern 2: Tag-Based Collections

**What:** Eleventy automatically creates collections from tags
**When to use:** Always - this is Eleventy's primary collection mechanism
**Example:**

```markdown
---
title: Colophon v9
tags:
  - colophon
---
```

Creates `collections['colophon']` accessible in templates via:

```njk
{% set posts = collections['colophon'] | reverse %}
```

### Pattern 3: Default Permalink Behavior

**What:** File location determines output URL when no permalink is specified
**When to use:** Default behavior - only override when you need custom URLs
**Rules:**

- `site/posts/colophon-v5.md` → `_site/posts/colophon-v5/index.html` (URL: `/posts/colophon-v5/`)
- `site/colophon/colophon-v5.md` → `_site/colophon/colophon-v5/index.html` (URL: `/colophon/colophon-v5/`)
- Moving files changes output URL unless permalink is explicitly set

**Impact for this phase:** Old URLs (`/posts/colophon-vX/`) will break. User decision: accept 404s, skip redirects.

### Anti-Patterns to Avoid

- **Manually setting tags in every file:** Use directory data files for consistency
- **Using `tags: []` to remove from collections:** Use `override:tags` or `eleventyExcludeFromCollections: true`
- **Relying on file location for collection membership:** Collections are tag-based, not directory-based

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem                             | Don't Build                 | Use Instead                              | Why                                                          |
| ----------------------------------- | --------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| Removing files from post collection | Manual front matter edits   | Directory data file with `override:tags` | Single source of truth, follows existing pattern in codebase |
| Version navigation anchors          | Custom JavaScript scrolling | HTML `id` attributes + fragment URLs     | Standard web platform, accessible, SEO-friendly              |
| Collection filtering logic          | Custom filter functions     | Eleventy's built-in tag collections      | Automatic, performant, standard pattern                      |

**Key insight:** Eleventy's data cascade and collection system are designed for this exact use case. Using the framework's built-in features ensures consistency with existing codebase patterns (e.g., `site/now/now.json`).

## Common Pitfalls

### Pitfall 1: Tag Merging vs. Override Confusion

**What goes wrong:** Files end up in both `collections.post` and `collections.colophon` after move
**Why it happens:** By default, Eleventy merges tags from directory data files and front matter
**How to avoid:** Use `override:tags: ["colophon"]` in `colophon.json` to replace all inherited tags
**Warning signs:** Colophon files still appear in blog post listings after move

### Pitfall 2: Forgetting Directory Data File Name Must Match Directory

**What goes wrong:** Directory data file is ignored, files get no tags
**Why it happens:** Eleventy requires exact name match: `colophon/colophon.json`, not `colophon/data.json`
**How to avoid:** Always name directory data file identically to its containing directory
**Warning signs:** Files don't appear in collections, build warnings about missing data

### Pitfall 3: URL Changes Break External Links

**What goes wrong:** Moving files changes their output URLs, breaking bookmarks and external links
**Why it happens:** Eleventy's default permalink uses file location: `posts/X/` → `colophon/X/`
**How to avoid:** Either accept broken links (user decision for this phase) or set explicit permalinks
**Warning signs:** 404s on old URLs, broken search engine results

### Pitfall 4: Inaccessible Fragment Identifiers

**What goes wrong:** Adding `id` attributes without semantic structure confuses screen readers
**Why it happens:** Fragment identifiers on non-heading elements don't follow accessibility best practices
**How to avoid:** Add `id` to existing heading elements (h2/h3), not wrapper divs
**Warning signs:** Screen reader announces link destination unclearly

### Pitfall 5: Collection Reference Breaks After File Move

**What goes wrong:** `collections['colophon']` returns empty array after moving files
**Why it happens:** Files lost their "colophon" tag during move (possibly overwritten by directory data)
**How to avoid:** Verify each moved file retains `tags: [colophon]` in front matter OR relies on directory data file
**Warning signs:** Colophon page renders intro but no version entries

## Code Examples

Verified patterns from official sources and codebase:

### Directory Data File with Tag Override

```json
// File: site/colophon/colophon.json
// Pattern from: site/now/now.json (codebase)
{
	"override:tags": ["colophon"]
}
```

### Accessing Tag Collections in Templates

```njk
{# Source: site/colophon.njk (codebase) #}
{% set posts = collections['colophon'] | reverse %}
{%- for post in posts -%}
  <article class="h-entry">
    <h1 class="post-title p-name">{{ post.title }}</h1>
    <div class="e-content">
      {{ post.content | safe }}
    </div>
  </article>
{%- endfor -%}
```

### Adding Fragment Identifier Anchors

```markdown
---
title: Colophon v5
tags:
  - colophon
---

## Version 5

{id="v5"}

### 2012 - 2016

Content here...
```

Alternative Nunjucks approach if modifying template:

```njk
{%- for post in posts -%}
  <article class="h-entry" id="{{ post.data.title | slugify }}">
    {# or extract version number for cleaner id="v5" #}
```

### Front Matter Tag Syntax

```yaml
# Source: Eleventy official docs
# Single tag
tags: colophon

# Multiple tags (array notation)
tags: ["colophon", "archive"]

# Multiple tags (YAML list)
tags:
  - colophon
  - archive
```

## State of the Art

| Old Approach                      | Current Approach                 | When Changed          | Impact                                                    |
| --------------------------------- | -------------------------------- | --------------------- | --------------------------------------------------------- |
| Collections via getFilteredByGlob | Collections via tags             | Eleventy v0.x → v2.0+ | Tags are more flexible, allow multi-collection membership |
| NAME attribute for anchors        | ID attribute for anchors         | HTML5 specification   | ID is standard, NAME deprecated                           |
| Manual permalink generation       | Default permalink from file path | Eleventy core feature | Simpler config, predictable URLs                          |

**Deprecated/outdated:**

- `NAME` attribute for fragment identifiers: Use `id` attribute instead (HTML5 standard)
- Custom collection API when tags suffice: Use built-in tag collections for simpler cases

## Open Questions

Things that couldn't be fully resolved:

1. **Should version anchors be in markdown or template?**

   - What we know: Both approaches work (markdown `{id="v5"}` or template `id="{{ ... }}"`)
   - What's unclear: Which fits codebase style better (minimal markdown vs. template control)
   - Recommendation: Check if markdown files use any existing id attributes; if not, prefer template-based for consistency with existing Nunjucks usage

2. **Should layout be specified in directory data file?**
   - What we know: `now.json` sets `"layout": "now"`, colophon files currently inherit from `posts.json`
   - What's unclear: Do colophon files need a special layout or can they use default?
   - Recommendation: Check what layout colophon files currently use; if they don't need post layout, add `"layout": "page"` to `colophon.json`

## Sources

### Primary (HIGH confidence)

- [Eleventy Collections Documentation](https://www.11ty.dev/docs/collections/) - Tag-based collection behavior
- [Eleventy Template and Directory Data Files](https://www.11ty.dev/docs/data-template-dir/) - Directory data file inheritance and override behavior
- [Eleventy Permalinks Documentation](https://www.11ty.dev/docs/permalinks/) - Default permalink behavior and URL generation
- Codebase files:
  - `/site/posts/posts.json` - Directory data pattern
  - `/site/now/now.json` - Override tags pattern
  - `/site/colophon.njk` - Collection iteration pattern

### Secondary (MEDIUM confidence)

- [Are your Anchor Links Accessible? | Amber Wilson](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/) - Fragment identifier accessibility
- [MDN: The Anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a) - HTML anchor best practices
- [11ty Rocks: Creating and Using Eleventy Collections](https://11ty.rocks/posts/creating-and-using-11ty-collections/) - Collection patterns
- [Structuring Eleventy projects - Webstoemp](https://www.webstoemp.com/blog/eleventy-projects-structure/) - Project organization patterns

### Tertiary (LOW confidence)

- WebSearch results about SSG best practices (general guidance, not Eleventy-specific)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Using existing project dependencies, verified in package.json and config
- Architecture: HIGH - Patterns verified in official Eleventy docs and existing codebase
- Pitfalls: HIGH - Tag merging behavior confirmed in official docs, URL changes are standard Eleventy behavior
- Code examples: HIGH - All examples either from official docs or existing codebase files
- Accessibility: MEDIUM - Based on authoritative sources (MDN, accessibility experts) but not Eleventy-specific

**Research date:** 2026-02-08
**Valid until:** 60 days (Eleventy is stable, core behavior unlikely to change)
