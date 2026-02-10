# craveytrain.com — Design Handoff Document

**Warm Editorial Redesign — Variation 3**
February 2026

---

## Template Files

| File                     | Page                  |
| ------------------------ | --------------------- |
| `variation-3-clean.html` | Homepage              |
| `v3-now.html`            | Now page              |
| `v3-posts.html`          | Posts listing page    |
| `v3-post.html`           | Single blog post page |

These four HTML files are the source of truth for the design. Each is a self-contained, fully styled prototype. In production, the shared CSS and components should be extracted into a single stylesheet and reusable Eleventy partials.

---

## Design Overview

The design direction is called **Warm Editorial**. It pairs the optical serif **Fraunces** with the geometric sans **Inter**, uses a cream/parchment background with a terracotta accent color, and follows a consistent **200px / 1fr editorial grid** pattern across all pages.

The design prioritizes readability, warmth, and a print-editorial sensibility. Every page shares the same accent bar, header, footer, divider, and section-grid components.

**Tech stack:** Eleventy (11ty) static site generator.

---

## Color Palette

All colors are stored as CSS custom properties on `:root`.

### Core Palette

| Swatch      | Name         | Hex       | CSS Variable     | Usage                                                       |
| ----------- | ------------ | --------- | ---------------- | ----------------------------------------------------------- |
| ■ `#FAF6F1` | Warm BG      | `#FAF6F1` | `--warm-bg`      | Page background                                             |
| ■ `#F0E8DD` | Warm BG Deep | `#F0E8DD` | `--warm-bg-deep` | Cards, code blocks, tag chip backgrounds                    |
| ■ `#2C2420` | Ink          | `#2C2420` | `--ink`          | Primary text, headings                                      |
| ■ `#6B5D52` | Ink Light    | `#6B5D52` | `--ink-light`    | Secondary text, dates, metadata                             |
| ■ `#B44D2D` | Accent       | `#B44D2D` | `--accent`       | Terracotta. Links, section labels, hover states, accent bar |
| ■ `#943D22` | Accent Hover | `#943D22` | `--accent-hover` | Darker terracotta (available but rarely used)               |
| ■ `#E8C4B0` | Accent Soft  | `#E8C4B0` | `--accent-soft`  | Link underlines at rest, dashed borders                     |
| ■ `#DDD2C5` | Border       | `#DDD2C5` | `--border`       | Horizontal rules, tag chip borders, post item dividers      |
| ■ `#FFFFFF` | White        | `#FFFFFF` | `--white`        | Text on accent-colored hover backgrounds                    |

### Syntax Highlighting Palette

Code blocks use a warm-toned syntax highlighting theme. These are applied as `<span>` classes inside `<pre><code>` blocks.

| Swatch      | Token       | Hex       | CSS Class      | Usage                               |
| ----------- | ----------- | --------- | -------------- | ----------------------------------- |
| ■ `#B44D2D` | Properties  | `#B44D2D` | `.property`    | CSS properties, JS object keys      |
| ■ `#6B4C8A` | Values      | `#6B4C8A` | `.value`       | CSS values, strings, numbers        |
| ■ `#5B7A3A` | At-rules    | `#5B7A3A` | `.at-rule`     | `@container`, `@media`, etc. (bold) |
| ■ `#2C2420` | Selectors   | `#2C2420` | `.selector`    | CSS selectors (bold)                |
| ■ `#9B8E82` | Comments    | `#9B8E82` | `.comment`     | Comments (italic)                   |
| ■ `#9B8E82` | Punctuation | `#9B8E82` | `.punctuation` | Braces, colons, semicolons          |

**Note:** The purple (`#6B4C8A`) and purple-soft (`#D4C5E2`) appear in some template files as `--purple` and `--purple-soft`. These should be consolidated into the `:root` block as syntax highlighting variables.

---

## Typography

### Font Families

| Role    | Font                              | CSS Variable             | Fallbacks                 |
| ------- | --------------------------------- | ------------------------ | ------------------------- |
| Display | Fraunces (variable optical serif) | `--font-display`         | Georgia, serif            |
| Body    | Inter (geometric sans)            | `--font-body`            | -apple-system, sans-serif |
| Code    | SFMono-Regular, Consolas          | _(not yet variabilized)_ | monospace                 |

**Google Fonts load string:**

```
https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,800;1,9..144,400&family=Inter:wght@400;500;600&display=swap
```

### Font Weights Loaded

- **Fraunces:** 300 (light), 600 (semibold), 800 (extrabold), plus italic 400
- **Inter:** 400 (regular), 500 (medium), 600 (semibold)

### Type Scale

All sizes in rem, relative to 16px base. `clamp()` is used for responsive headings.

| Element                         | Font            | Size                       | Weight | Extra                                                                        |
| ------------------------------- | --------------- | -------------------------- | ------ | ---------------------------------------------------------------------------- |
| Hero h1 (homepage)              | Fraunces        | `clamp(2.5rem, 5vw, 4rem)` | 800    | `letter-spacing: -0.03em`, `line-height: 1.1`                                |
| Page title h1 (Now, Posts)      | Fraunces        | `clamp(2rem, 4vw, 2.5rem)` | 800    | `letter-spacing: -0.03em`                                                    |
| Post title h1 (single)          | Fraunces        | `clamp(2rem, 5vw, 2.8rem)` | 800    | `letter-spacing: -0.03em`, `line-height: 1.15`                               |
| Section h2 (Now page)           | Fraunces        | `1.2rem`                   | 600    | —                                                                            |
| Post body h2                    | Fraunces        | `1.5rem`                   | 600    | `letter-spacing: -0.02em`                                                    |
| Logo                            | Fraunces        | `1.25rem`                  | 800    | `letter-spacing: -0.02em`                                                    |
| Section label                   | Fraunces        | `0.85rem`                  | 600    | `text-transform: uppercase`, `letter-spacing: 0.1em`, `color: var(--accent)` |
| Nav links                       | Inter           | `0.9rem`                   | 500    | `color: var(--ink-light)`, hover → accent                                    |
| Body prose                      | Inter           | `1.05–1.15rem`             | 400    | `line-height: 1.65–1.8`                                                      |
| Post listing title              | Fraunces        | `1.15rem`                  | 600    | `line-height: 1.3`                                                           |
| Tag filter chips                | Inter           | `0.75rem`                  | 500    | `border-radius: 20px`                                                        |
| Inline post tags (display-only) | Inter           | `0.7rem`                   | 400    | `color: var(--ink-light)`, `opacity: 0.7`                                    |
| Dates / metadata                | Inter           | `0.8–0.85rem`              | 400    | `font-variant-numeric: tabular-nums`, `color: var(--ink-light)`              |
| Footer text                     | Inter           | `0.85rem`                  | 400    | `opacity: 0.6`, hover → `opacity: 1`                                         |
| Inline code                     | SFMono/Consolas | `0.88em`                   | 400    | `background: rgba(0,0,0,0.05)`, `border-radius: 3px`                         |
| Code blocks                     | SFMono/Consolas | `0.88rem`                  | 400    | `line-height: 1.5`                                                           |

---

## CSS Custom Properties — Recommended `:root` Block

Currently each HTML file defines its own `:root`. In production, consolidate into a single shared stylesheet:

```css
:root {
	/* Palette */
	--warm-bg: #faf6f1;
	--warm-bg-deep: #f0e8dd;
	--ink: #2c2420;
	--ink-light: #6b5d52;
	--accent: #b44d2d;
	--accent-hover: #943d22;
	--accent-soft: #e8c4b0;
	--border: #ddd2c5;
	--white: #ffffff;

	/* Syntax highlighting */
	--syntax-property: #b44d2d;
	--syntax-value: #6b4c8a;
	--syntax-at-rule: #5b7a3a;
	--syntax-selector: #2c2420;
	--syntax-comment: #9b8e82;
	--syntax-punctuation: #9b8e82;

	/* Typography */
	--font-display: 'Fraunces', Georgia, serif;
	--font-body: 'Inter', -apple-system, sans-serif;
	--font-mono: 'SFMono-Regular', 'Consolas', monospace;

	/* Layout */
	--max-width: 1100px;
	--gutter-width: 200px;
	--content-gap: 3rem;
	--prose-max-width: 640px;
	--page-padding: 2rem;
}
```

**Recommendation:** The code font stack should be variabilized as `--font-mono`. The syntax highlighting colors currently use raw hex in the post template; moving them to variables enables future theming (e.g., dark mode).

---

## Layout System

### Container

Every content area is constrained to `max-width: 1100px` with `margin: 0 auto` and horizontal padding of `2rem` (reduces to `1.5rem` on mobile). There is no single outer wrapper element — each section applies this independently.

### Editorial Grid

The site's signature layout is a **200px / 1fr** two-column CSS Grid. The narrow left column holds section labels (e.g., "About," "2024," "Work," "Tagged") while the wide right column holds the content.

This grid is used on **every page**:

- **Homepage:** About section, Recent Writing section
- **Now page:** Each topical section (Work, Building, Learning, Reading, Life)
- **Posts listing:** Tags section, each year group of posts
- **Single post:** Sidebar metadata + article body

```css
.section-grid {
	max-width: 1100px;
	margin: 0 auto;
	padding: 0 2rem;
	display: grid;
	grid-template-columns: 200px 1fr;
	gap: 3rem;
}
```

### Prose Measure

Body text in the content column is capped at `max-width: 640px` for comfortable reading line lengths. This applies to: About section prose, Now page section content, and the single post article body.

### Dividers

Horizontal rules are wrapped in a `.divider` container that provides the same `max-width` and padding as the section grid, ensuring the rule spans the full 1100px content width.

```css
.divider {
	max-width: 1100px;
	margin: 0 auto;
	padding: 0 2rem;
}

.divider hr {
	border: none;
	border-top: 1px solid var(--border);
}
```

---

## Shared Components

These components appear identically on every page. Build as reusable Eleventy partials/includes.

### Accent Bar

A fixed-position terracotta bar at the very top of the viewport. Its primary purpose is to tint the **Safari browser chrome** on iOS/macOS.

```html
<div class="accent-bar" aria-hidden="true"></div>
```

```css
.accent-bar {
	height: 0.5rem;
	background: var(--accent);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
}
```

**⚠️ Critical:** Safari chrome coloring only works with a **real DOM element** that touches the top of the viewport. A `::before` pseudo-element will NOT work. The element must be `position: fixed` (or `sticky`) at `top: 0` with a minimum rendered height.

### Header

Flex container with logo left, nav right, constrained to 1100px. `margin-top: 0.5rem` offsets below the accent bar.

```html
<header>
	<a href="/" class="logo">craveytrain</a>
	<nav>
		<a href="/now">Now</a>
		<a href="/posts">Posts</a>
		<a href="/uses">Uses</a>
	</nav>
</header>
```

```css
header {
	margin-top: 0.5rem;
	padding: 2rem 2rem 0;
	max-width: 1100px;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.logo {
	font-family: var(--font-display);
	font-size: 1.25rem;
	font-weight: 800;
	color: var(--ink);
	text-decoration: none;
	letter-spacing: -0.02em;
}

nav {
	display: flex;
	gap: 2rem;
}

nav a {
	font-size: 0.9rem;
	font-weight: 500;
	color: var(--ink-light);
	text-decoration: none;
	transition: color 0.2s;
}

nav a:hover {
	color: var(--accent);
}
nav a[aria-current='page'] {
	color: var(--accent);
}
```

**Active state:** Use `aria-current="page"` on the current page's nav link.
**Important:** The single post page does NOT mark "Posts" as active — `aria-current` is only applied on the actual listing page (`v3-posts.html`).

### Section Label

The editorial left-column label used across all grid sections:

```css
.section-label {
	font-family: var(--font-display);
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--accent);
	text-transform: uppercase;
	letter-spacing: 0.1em;
	padding-top: 0.3rem;
}
```

### Footer

Dark footer with `var(--ink)` background and `var(--warm-bg-deep)` text. Contains copyright and nav (Colophon, RSS). All text at 0.6 opacity, rising to 1.0 on hover.

```html
<footer>
	<div class="footer-inner">
		<span class="copyright">&copy; 1999–2025 Mike Cravey</span>
		<div class="footer-nav">
			<a href="/colophon">Colophon</a>
			<a href="/feed.xml">RSS</a>
		</div>
	</div>
</footer>
```

```css
footer {
	background: var(--ink);
	color: var(--warm-bg-deep);
	padding: 3rem 2rem;
}

.footer-inner {
	max-width: 1100px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
}

.footer-inner .copyright {
	font-size: 0.85rem;
	opacity: 0.6;
}

.footer-nav {
	display: flex;
	gap: 1.5rem;
}

.footer-nav a {
	font-size: 0.85rem;
	color: var(--warm-bg-deep);
	text-decoration: none;
	opacity: 0.6;
	transition: opacity 0.2s;
}

.footer-nav a:hover {
	opacity: 1;
}
```

### Body Links

Links within prose sections use a consistent treatment:

```css
a {
	color: var(--accent);
	text-decoration: none;
	border-bottom: 1.5px solid var(--accent-soft);
	padding-bottom: 1px;
	transition: border-color 0.2s;
}

a:hover {
	border-color: var(--accent);
}
```

---

## Page Templates

### Homepage (`variation-3-clean.html`)

Three unique sections: Hero, About, and Recent Writing.

#### Hero Section

Two-column grid: `1fr / 320px`, `gap: 4rem`, vertically centered.

**Left column:**

- h1 greeting: `"Hey y'all, I'm Mike Cravey."` — Fraunces `clamp(2.5rem, 5vw, 4rem)` weight 800, with the comma in `var(--accent)`
- Subtitle paragraph: Inter 1.15rem, `color: var(--ink-light)`, `max-width: 520px`
- Social links row (GitHub, Mastodon, LinkedIn): same border-bottom treatment as body links, with `→` arrow entities

**Right column:**

- Arch-framed portrait photo — `280×340px`, `border-radius: 200px 200px 24px 24px` (creates arch shape), `3px border` in `var(--border)`, `margin-left: auto` (right-aligned within column)
- Photo filter: `grayscale(30%) contrast(1.05)`, transitions to full color on hover over 0.4s

```css
.hero-portrait {
	width: 280px;
	height: 340px;
	border-radius: 200px 200px 24px 24px;
	overflow: hidden;
	border: 3px solid var(--border);
	margin-left: auto;
}

.hero-portrait img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center top;
	filter: grayscale(30%) contrast(1.05);
	transition: filter 0.4s;
}

.hero-portrait:hover img {
	filter: grayscale(0%) contrast(1);
}
```

#### About Section

Uses section-grid (200px/1fr). Left label: "About". Prose with inline links to Now, Colophon, and Uses pages. Prose max-width: 640px.

#### Recent Writing Section

Uses section-grid (200px/1fr). Left label: "Recent Writing".

Each post item is a `120px / 1fr` grid: date on the left, title + excerpt + tag chips on the right.

**Tag chips on the homepage ARE interactive:**

```css
.post-tags span {
	font-size: 0.75rem;
	font-weight: 500;
	padding: 3px 10px;
	background: var(--warm-bg-deep);
	color: var(--ink-light);
	border-radius: 20px;
	border: 1px solid var(--border);
	cursor: pointer;
	transition:
		background 0.2s,
		border-color 0.2s,
		color 0.2s;
}

.post-tags span:hover {
	background: var(--accent);
	border-color: var(--accent);
	color: var(--white);
}
```

"View all posts →" link at the bottom uses the standard body link treatment.

---

### Now Page (`v3-now.html`)

A `/now` page inspired by the [nownownow.com](https://nownownow.com/about) movement.

- **Page header:** h1 "What I'm Doing Now", subtitle paragraph with link to nownownow.com, italic last-updated date (Fraunces 0.9rem, `font-style: italic`, `color: var(--ink-light)`)
- **Sections:** Work, Building, Learning, Reading, Life — each in a section-grid with label + content
- Each section has an h2 (Fraunces 1.2rem weight 600) and prose paragraphs or unordered lists
- **Bottom of page:** right-aligned "Previously →" link to Now archive (no heading above it)

```css
.archive-link {
	text-align: right;
	margin-bottom: 4rem;
}
```

- Content sections are separated by full-width `<hr>` dividers
- **Updated line format:** "Last updated February 6, 2026" (no location)

---

### Posts Listing Page (`v3-posts.html`)

Lists all blog posts grouped by year, with a tag filtering system.

#### Page Header

h1 "Posts" with a post count subtitle (e.g., "12 posts") in `var(--ink-light)`.

#### Tag Filter Section

Uses section-grid. Left label: **"Tags"**. Right column contains:

**Tag bar (always visible):**

```html
<div class="tag-bar">
	<a href="#" class="tag-filter active">All</a>
	<a href="#" class="tag-filter">psa</a>
	<a href="#" class="tag-filter">colophon</a>
	<a href="#" class="tag-filter">javascript</a>
	<a href="#" class="tag-filter">html</a>
	<a href="#" class="tag-filter">jquery</a>
	<a href="#" class="tag-filter">glgui</a>
	<button class="tag-more" id="tagMore">+44 more</button>
</div>
```

- Shows "All" chip + **6 most popular tags** by post count (psa, colophon, javascript, html, jquery, glgui)
- **"+44 more" pill** (`.tag-more`): dashed border in `var(--accent-soft)`, terracotta text. On hover, fills with accent background and white text. On click, reveals the full tag cloud and changes text to "Show less"

**Expanded tag cloud (hidden by default):**

```html
<div class="tag-cloud" id="tagCloud">
	<a href="#" class="tag-filter">about</a>
	<a href="#" class="tag-filter">accessibility</a>
	<!-- ... remaining 44 tags alphabetically ... -->
</div>
```

```css
.tag-bar {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	align-items: center;
}

.tag-more {
	font-family: var(--font-body);
	font-size: 0.75rem;
	font-weight: 500;
	padding: 4px 12px;
	background: none;
	color: var(--accent);
	border-radius: 20px;
	border: 1px dashed var(--accent-soft);
	cursor: pointer;
	transition:
		background 0.2s,
		border-color 0.2s,
		color 0.2s;
}

.tag-more:hover {
	background: var(--accent);
	border-color: var(--accent);
	border-style: solid;
	color: var(--white);
}

.tag-cloud {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	max-height: 0;
	overflow: hidden;
	opacity: 0;
	transition:
		max-height 0.3s ease,
		opacity 0.2s ease,
		margin 0.3s ease;
	margin-top: 0;
}

.tag-cloud.open {
	max-height: 500px;
	opacity: 1;
	margin-top: 0.5rem;
}
```

**All tag chips (`.tag-filter`) share this style:**

```css
.tag-filter {
	font-family: var(--font-body);
	font-size: 0.75rem;
	font-weight: 500;
	padding: 4px 12px;
	background: var(--warm-bg-deep);
	color: var(--ink-light);
	border-radius: 20px;
	border: 1px solid var(--border);
	text-decoration: none;
	cursor: pointer;
	transition:
		background 0.2s,
		border-color 0.2s,
		color 0.2s;
}

.tag-filter:hover,
.tag-filter.active {
	background: var(--accent);
	border-color: var(--accent);
	color: var(--white);
}
```

#### Year Sections

Each year is a section-grid with the year as the section label (e.g., "2024") and a `.year-articles` flex column containing post items.

#### Post Items (in listing)

Each post is a flex row: `.post-item-main` (title + inline tags) on the left, date on the right.

```html
<article class="post-item" data-tags="css,web platform,design">
	<div class="post-item-main">
		<a href="#" class="post-item-title">Container Queries Changed Everything</a>
		<div class="post-item-tags">
			<span class="post-item-tag">CSS</span>
			<span class="post-item-tag">Web Platform</span>
			<span class="post-item-tag">Design</span>
		</div>
	</div>
	<time class="post-item-date">Mar 14</time>
</article>
```

- **Title:** Fraunces 1.15rem weight 600, hover color → accent
- **Inline tags:** Display-only, NOT interactive. Tiny text (0.7rem) in `var(--ink-light)` at 0.7 opacity, separated by a middle dot (`·`) via `::before` pseudo-element
- **Date:** Inter 0.8rem, `font-variant-numeric: tabular-nums`, `var(--ink-light)`
- **Bottom border:** Each post item has a `1px solid var(--border)` bottom. On hover of the title, border transitions to accent color using `:has()`

```css
.post-item {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	padding: 0.75rem 0;
	border-bottom: 1px solid var(--border);
	transition: border-color 0.2s;
	gap: 1rem;
}

.post-item:has(.post-item-title:hover) {
	border-color: var(--accent);
}

/* Display-only inline tags */
.post-item-tag {
	font-size: 0.7rem;
	color: var(--ink-light);
	opacity: 0.7;
	white-space: nowrap;
}

.post-item-tag + .post-item-tag::before {
	content: '·';
	margin-right: 0.5rem;
}
```

#### Tag Filtering Behavior (JavaScript)

The tag filter is implemented in **vanilla JavaScript** at the bottom of `v3-posts.html`. Here is exactly how it works:

1. **Data model:** Each `<article class="post-item">` has a `data-tags` attribute containing comma-separated lowercase tag names (e.g., `data-tags="css,web platform,design"`).

2. **Selecting a tag:** Clicking any `.tag-filter` chip (in either the always-visible bar OR the expanded cloud) adds `.active` to that chip and removes it from all others. The selected tag text is matched case-insensitively against each post's `data-tags`.

3. **Hiding non-matching posts:** Posts that don't match get a `.hidden` class (`display: none`). Posts that match remain visible.

4. **Highlighting matched inline tags:** Within visible posts, the inline `.post-item-tag` spans are compared to the active filter. Matching tags receive a `.matched` class: `color: var(--accent); opacity: 1; font-weight: 600`.

5. **Hiding empty year sections:** After filtering, each `.year-section` is checked for visible posts. If ALL posts in a year are hidden, the year section itself gets `.hidden`.

6. **Hiding orphaned dividers:** Dividers adjacent to hidden year sections also get `.hidden`, preventing stacked or trailing horizontal rules.

7. **Reset:** Clicking "All" removes all `.hidden` and `.matched` classes, restoring the full unfiltered list.

**Toggle behavior:** The "+44 more" button toggles the `.tag-cloud` open/closed by adding/removing the `.open` class, and swaps its own text between "+44 more" and "Show less".

**Full JavaScript:**

```javascript
const moreBtn = document.getElementById('tagMore')
const cloud = document.getElementById('tagCloud')
const allFilters = document.querySelectorAll('.tag-filter')
const posts = document.querySelectorAll('.post-item')
const yearSections = document.querySelectorAll('.year-section')
const dividers = document.querySelectorAll('.divider')

// Toggle expanded tag cloud
moreBtn.addEventListener('click', () => {
	const open = cloud.classList.toggle('open')
	moreBtn.textContent = open ? 'Show less' : '+44 more'
})

// Filter posts by tag
allFilters.forEach(filter => {
	filter.addEventListener('click', e => {
		e.preventDefault()
		const tag = filter.textContent.trim().toLowerCase()

		// Update active state across both bar and cloud
		allFilters.forEach(f => f.classList.remove('active'))
		filter.classList.add('active')

		if (tag === 'all') {
			posts.forEach(p => p.classList.remove('hidden'))
			document
				.querySelectorAll('.post-item-tag')
				.forEach(t => t.classList.remove('matched'))
		} else {
			posts.forEach(post => {
				const postTags = (post.dataset.tags || '').toLowerCase().split(',')
				const matches = postTags.some(t => t.trim() === tag)
				post.classList.toggle('hidden', !matches)

				post.querySelectorAll('.post-item-tag').forEach(t => {
					t.classList.toggle(
						'matched',
						t.textContent.trim().toLowerCase() === tag
					)
				})
			})
		}

		yearSections.forEach(section => {
			const visiblePosts = section.querySelectorAll('.post-item:not(.hidden)')
			section.classList.toggle('hidden', visiblePosts.length === 0)
		})

		dividers.forEach(div => {
			const next = div.nextElementSibling
			if (
				next &&
				next.classList.contains('year-section') &&
				next.classList.contains('hidden')
			) {
				div.classList.add('hidden')
			} else {
				div.classList.remove('hidden')
			}
		})
	})
})
```

**CSS for filtering states:**

```css
.post-item.hidden {
	display: none;
}
.year-section.hidden {
	display: none;
}
.year-section.hidden + .divider,
.divider.hidden {
	display: none;
}
.post-item-tag.matched {
	color: var(--accent);
	opacity: 1;
	font-weight: 600;
}
```

**Complete list of 50 tags (alphabetical):** about, accessibility, anecdotal, austin, austinjs, bash, bidet, colophon, cors, couchdb, css, css3, design, express, font stack, forms, gist, git, git-svn, github, glgui, honeymoon, html, humor, interview, jade, javascript, jquery, labels, macOS, markdown, mastodon, media queries, meetup, metro, modal, node, nodejs, oauth, octopress, prompt, prototype, psa, rail, scripty2, tutorial, twitter, web standards, webmentions, xhr

**Top 6 by count (shown in tag bar):** psa (9), colophon (9), javascript (8), html (3), jquery (3), glgui (3)

---

### Single Post Page (`v3-post.html`)

The article detail page for individual blog posts.

#### Post Header

Full-width title area (1100px container), NOT in a grid. Just the title centered above a divider.

```css
.post-title {
	font-family: var(--font-display);
	font-size: clamp(2rem, 5vw, 2.8rem);
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1.15;
	color: var(--ink);
}
```

**No nav link is marked active** — `aria-current="page"` is NOT applied to "Posts" on this page.

#### Article Grid

Uses section-grid (200px/1fr) for the main article body.

**Left column (200px) — Sidebar metadata:**

```html
<div class="post-sidebar-meta">
	<div class="meta-date">March 14, 2024</div>
	<div class="meta-read">6 min read</div>
	<div class="sidebar-tags">
		<div class="sidebar-tags-label">Tagged</div>
		<span class="tag">CSS</span>
		<span class="tag">Web Platform</span>
		<span class="tag">Design</span>
	</div>
</div>
```

- Date: 0.85rem, `var(--ink-light)`
- Read time: 0.8rem, `var(--ink-light)`, `opacity: 0.7`
- "Tagged" label: uses the same section-label style (Fraunces 0.85rem, accent color, uppercase, `letter-spacing: 0.1em`)
- Tag chips: interactive (hover fills accent), linking to the posts page filtered by that tag

```css
.sidebar-tags-label {
	width: 100%;
	font-family: var(--font-display);
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--accent);
	text-transform: uppercase;
	letter-spacing: 0.1em;
	margin-bottom: 0.25rem;
}
```

**Right column (1fr) — Article prose:**

- Capped at `max-width: 640px`
- Paragraphs: Inter 1.1rem, `line-height: 1.8`, `margin-bottom: 1.5rem`
- h2 subheadings: Fraunces 1.5rem weight 600, `letter-spacing: -0.02em`, `margin: 2.5rem 0 1rem`
- Blockquotes: `border-left: 3px solid var(--accent)`, `padding-left: 1.5rem`, italic, `color: var(--ink-light)`
- Inline links: standard body link treatment

#### Code Blocks

```css
.post-body pre {
	background-color: var(--warm-bg-deep);
	border: 1px solid var(--border);
	border-radius: 6px;
	padding: 1.25rem;
	overflow-x: auto;
	font-size: 0.88rem;
	font-family: 'SFMono-Regular', 'Consolas', monospace;
	line-height: 1.5;
	margin: 2rem 0;
	color: var(--ink);
}

/* Syntax highlighting classes applied to <span> inside <code> */
.post-body pre .comment {
	color: #9b8e82;
	font-style: italic;
}
.post-body pre .property {
	color: var(--accent);
}
.post-body pre .value {
	color: #6b4c8a;
}
.post-body pre .selector {
	color: var(--ink);
	font-weight: 600;
}
.post-body pre .at-rule {
	color: #5b7a3a;
	font-weight: 600;
}
.post-body pre .punctuation {
	color: #9b8e82;
}
```

#### Design Decisions

- **No previous/next post navigation** at the bottom (intentionally removed)
- **Tags live in the left sidebar gutter**, not below the article
- Tag chips on single posts ARE interactive (hover fills accent), intended to link to the posts page filtered by that tag

---

## Hover States & Transitions

All interactive elements transition over `0.2s` unless noted otherwise.

| Element              | Hover Behavior                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| Nav links            | `color` transitions from `var(--ink-light)` to `var(--accent)`                                 |
| Body links           | `border-bottom-color` transitions from `var(--accent-soft)` to `var(--accent)`                 |
| Tag filter chips     | Background fills `var(--accent)`, border matches, text turns `var(--white)`. `cursor: pointer` |
| Homepage tag chips   | Same as filter chips: accent bg + white text. `cursor: pointer`                                |
| "+N more" pill       | Dashed border becomes solid, fills `var(--accent)`, text turns white                           |
| Post item (listing)  | Bottom border transitions to `var(--accent)` on title hover (via `:has()`)                     |
| Post title (listing) | `color` transitions from `var(--ink)` to `var(--accent)`                                       |
| Hero portrait        | Photo `filter` transitions from `grayscale(30%)` to `grayscale(0%)`, duration `0.4s`           |
| Footer links         | `opacity` transitions from `0.6` to `1.0`                                                      |

---

## Responsive Design

All pages share a single breakpoint at **768px**. The strategy is to collapse the two-column editorial grid into a single column and adjust spacing.

### Global Changes at ≤ 768px

- **Section grid:** collapses from `200px 1fr` to `1fr`, gap reduces to `1–2rem`
- **Horizontal padding:** reduces from `2rem` to `1.5rem` across header, page-header, dividers, and grids
- **Section labels:** stack above their content instead of sitting in the left gutter

### Homepage (768px)

- Hero grid → single column, centered text
- Portrait reorders to top (`order: -1`), shrinks to `200×240px`, `margin: 0 auto`
- Social links center (`justify-content: center`)
- About and Posts sections → single column
- Post items within Recent Writing → single column (no date column)

### Now Page (768px)

- Header stacks vertically (`flex-direction: column`), nav centers
- Sections grid → single column, `gap: 2rem`
- Footer stacks vertically, left-aligned

### Posts Listing (768px)

- Section grids → single column
- Post items stack vertically (`flex-direction: column`, `gap: 0.25rem`)
- Post item main content stacks (title above tags)
- Inline tags get slight `margin-top: 0.15rem`

### Single Post (768px)

- Header stacks vertically with reduced nav gap (`1rem`)
- Article grid collapses — metadata sits above article body
- Post body font reduces to `1rem`, h2 to `1.3rem`
- Title clamp range shifts: `clamp(1.75rem, 4vw, 2.3rem)`

---

## Implementation Notes for Eleventy

### File Architecture Recommendation

| Template                 | Eleventy Layout               |
| ------------------------ | ----------------------------- |
| `variation-3-clean.html` | `_includes/layouts/home.njk`  |
| `v3-now.html`            | `_includes/layouts/now.njk`   |
| `v3-posts.html`          | `_includes/layouts/posts.njk` |
| `v3-post.html`           | `_includes/layouts/post.njk`  |

### Shared Partials to Extract

- `_includes/partials/accent-bar.njk` — the fixed accent bar div
- `_includes/partials/header.njk` — logo + nav with dynamic `aria-current`
- `_includes/partials/footer.njk` — dark footer with copyright + nav
- `_includes/partials/divider.njk` — the `.divider` wrapper around `<hr>`

### Shared CSS to Extract

Currently each HTML file duplicates the full stylesheet. In production, extract a single `base.css` containing: reset, `:root` variables, accent-bar, header, nav, section-grid, section-label, divider, footer, body link treatment, and responsive breakpoint rules. Page-specific styles (hero, tag-filter, post-body, etc.) can live in per-layout CSS files or remain in the layout templates.

### Tag Filtering: Static vs. Dynamic

The current implementation uses client-side JavaScript. For Eleventy you have two options:

- **Client-side (current approach):** Render all posts on a single page, use the JS from `v3-posts.html` to filter. Works well for sites with fewer than ~200 posts.
- **Server-side (Eleventy pagination):** Generate separate `/tags/{tag}/` pages using Eleventy's pagination feature. Each tag page lists only matching posts. The tag bar links to these pages. Better for very large sites or if JavaScript-free is a goal.

### Syntax Highlighting Integration

The `<span>` class approach (`.property`, `.value`, `.at-rule`, etc.) maps well to **Prism.js** or **Shiki** token classes. Configure your syntax highlighter to output spans with these class names, then the CSS handles the colors. If using Eleventy's built-in syntax highlighting plugin (which uses Prism), you'll need to map Prism's default token names to the warm palette colors.

### Key CSS Techniques Used

- **`:has()` selector** — used on `.post-item:has(.post-item-title:hover)` to color the item's border on title hover. Supported in all modern browsers.
- **`clamp()`** — responsive font sizing without media queries for headings
- **`font-variant-numeric: tabular-nums`** — ensures date columns align evenly
- **`max-height` transition** — used for the expanding tag cloud animation (0 to 500px)
- **`filter: grayscale()`** — hero portrait desaturation effect with hover transition
- **`::before` pseudo-element** with `content: '·'` — dot separators between inline tags
