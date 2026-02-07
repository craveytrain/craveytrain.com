# Feature Research: Personal Website Now/Colophon/Uses Pages

**Domain:** Personal website meta-content pages (now, colophon, uses)
**Researched:** 2026-02-06
**Confidence:** MEDIUM

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = page feels incomplete.

#### Now Page

| Feature                  | Why Expected                            | Complexity | Notes                             |
| ------------------------ | --------------------------------------- | ---------- | --------------------------------- |
| Current update date      | Core principle - shows freshness        | LOW        | ISO format YYYY-MM-DD recommended |
| Current priorities/focus | Answers "what are you doing now?"       | LOW        | 3-5 major areas typically         |
| Personal tone            | Expected to be authentic, not marketing | LOW        | First-person narrative            |
| Link to /now movement    | Community convention                    | LOW        | Link to nownownow.com/about       |

#### Colophon Page

| Feature            | Why Expected                       | Complexity | LOW                             | Notes |
| ------------------ | ---------------------------------- | ---------- | ------------------------------- | ----- |
| Technology stack   | Core purpose of colophon           | LOW        | Framework, hosting, build tools |
| Typography details | Design community expectation       | LOW        | Fonts used, designers credited  |
| Site principles    | Privacy, accessibility commitments | LOW        | What governs site development   |
| Brief format       | Publishing tradition               | LOW        | Concise, not exhaustive         |

#### Uses Page

| Feature              | Why Expected                     | Complexity | Notes                            |
| -------------------- | -------------------------------- | ---------- | -------------------------------- |
| Editor + terminal    | Developer community standard     | LOW        | Code editor, theme, terminal app |
| Hardware setup       | Originated with desk setup posts | LOW        | Computer, monitors, peripherals  |
| Categorized sections | Improves scannability            | LOW        | Group by function/category       |
| Links to products    | Helpful for readers              | LOW        | Direct links to mentioned tools  |

#### Archive Systems

| Feature                     | Why Expected                       | Complexity | Notes                         |
| --------------------------- | ---------------------------------- | ---------- | ----------------------------- |
| Reverse chronological order | Standard web convention            | LOW        | Latest first                  |
| Date-based listing          | Users expect temporal navigation   | LOW        | YYYY-MM-DD format             |
| Direct links to versions    | Must be able to access old content | LOW        | Permalink to each dated entry |

### Differentiators (Competitive Advantage)

Features that set the page apart. Not required, but valued.

#### Now Page

| Feature                              | Value Proposition                  | Complexity | Notes                              |
| ------------------------------------ | ---------------------------------- | ---------- | ---------------------------------- |
| Historical archive of dated versions | Shows personal evolution over time | MEDIUM     | /now/archive/ with dated snapshots |
| Sections/categories                  | Better organization for readers    | LOW        | E.g. "Work", "Learning", "Life"    |
| Photos/imagery                       | Adds personality and context       | LOW        | Current location, activities       |
| Update frequency note                | Sets reader expectations           | LOW        | "Updated monthly" or similar       |

#### Colophon Page

| Feature                | Value Proposition                 | Complexity | Notes                                |
| ---------------------- | --------------------------------- | ---------- | ------------------------------------ |
| Detailed changelog     | Documents site evolution          | MEDIUM     | Dated entries with version titles    |
| Performance metrics    | Demonstrates technical care       | MEDIUM     | Load times, Core Web Vitals          |
| Sustainability notes   | Shows environmental consciousness | LOW        | Green hosting, efficiency            |
| Analytics transparency | Builds trust through openness     | LOW        | Public stats link if using analytics |
| Year-in-gutter design  | Elegant timeline presentation     | MEDIUM     | Year markers alongside content       |

#### Uses Page

| Feature                         | Value Proposition                     | Complexity | Notes                     |
| ------------------------------- | ------------------------------------- | ---------- | ------------------------- |
| Why/explanation sections        | Context beyond just listing           | LOW        | "Why I switched to X"     |
| Backup strategy section         | Often overlooked but valuable         | LOW        | How you protect your work |
| Recording/content creation gear | Valuable for content creators         | LOW        | If applicable to creator  |
| Affiliate disclosure            | Transparency if using affiliate links | LOW        | Ethical practice          |

#### Archive Systems

| Feature              | Value Proposition                    | Complexity | Notes                      |
| -------------------- | ------------------------------------ | ---------- | -------------------------- |
| Count/stats          | Shows productivity/longevity         | LOW        | "23 updates over 3 years"  |
| Search/filter        | Easier navigation for large archives | MEDIUM     | By year, category, keyword |
| Preview/excerpts     | Helps scanning without clicking      | LOW        | First paragraph or summary |
| RSS feed for updates | Allows following via feed reader     | LOW        | Standard for blogs/updates |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature                              | Why Requested            | Why Problematic                                       | Alternative                             |
| ------------------------------------ | ------------------------ | ----------------------------------------------------- | --------------------------------------- |
| Real-time "now" updates              | Sounds dynamic           | Defeats purpose - now page is about longer timeframes | Update monthly/quarterly manually       |
| Social media integration on now page | Want to show activity    | Creates noise, undermines "what matters now" focus    | Keep now page intentionally slower      |
| Comments on colophon                 | Want engagement          | Becomes outdated Q&A, maintenance burden              | Use contact link for questions          |
| Full detailed specs on uses page     | Want to be comprehensive | Overwhelming, maintenance burden, irrelevant details  | Focus on what meaningfully impacts work |
| Version comparison view              | Seems useful             | Complex to build, rarely used, unclear value          | Simple list with links to versions      |
| Edit history with diffs              | Technical appeal         | Overkill for personal sites, Git already tracks this  | Link to GitHub if transparency needed   |

## Feature Dependencies

```
Now Page Core
    └──requires──> Update Date
    └──requires──> Current Focus Content

Now Page Archive
    └──requires──> Dated Version Storage
    └──requires──> Archive Listing Page
    └──enhances──> Now Page Core (adds historical context)

Colophon Core
    └──requires──> Technology Stack Info

Colophon Changelog
    └──requires──> Dated Entry Format
    └──enhances──> Colophon Core (adds evolution story)

Uses Page Core
    └──requires──> Categorized Sections
    └──requires──> Product/Tool Links

Archive System (General)
    └──requires──> Permalink Structure
    └──requires──> Date Formatting Standard (ISO 8601)
    └──conflicts──> Complex Search (LOW value for personal sites)
```

### Dependency Notes

- **Now Page Archive requires Dated Version Storage:** Can't show history without saving snapshots
- **Archive Listing enhances Now Page:** Adds depth without cluttering current page
- **Colophon Changelog enhances Colophon:** Tells site evolution story beyond just current tech
- **Complex search conflicts with simplicity:** Personal sites rarely need advanced search - simple chronological lists work better

## MVP Definition

### Launch With (v1)

Minimum viable implementation - what's needed for each page type.

#### Now Page

- [ ] Single /now/ page with current content
- [ ] Update date clearly visible
- [ ] 3-5 current focus areas
- [ ] Link to nownownow.com explanation

#### Colophon

- [ ] Technology stack (framework, hosting)
- [ ] Typography details (fonts used)
- [ ] Site principles (privacy, accessibility)
- [ ] Brief format (concise, not exhaustive)

#### Uses Page

- [ ] Editor + Terminal section
- [ ] Desktop/Hardware section
- [ ] Categorized by function
- [ ] Links to mentioned products

#### Archive (for Now page)

- [ ] Reverse chronological listing
- [ ] Date for each version (YYYY-MM-DD)
- [ ] Direct link to each dated version
- [ ] Stored at /now/<date>.html pattern

### Add After Validation (v1.x)

Features to add once core is working.

#### Now Page Enhancements

- [ ] Section headers (Work/Learning/Life)
- [ ] Update frequency note
- [ ] Photos/imagery

#### Colophon Enhancements

- [ ] Detailed changelog with dated entries
- [ ] Version titles for major redesigns
- [ ] Year-in-gutter timeline design

#### Uses Page Enhancements

- [ ] "Why" explanations for key tools
- [ ] Backup strategy section (if relevant)
- [ ] Content creation gear (if applicable)

#### Archive Enhancements

- [ ] Count/stats on listing page
- [ ] Brief preview/excerpt for each entry
- [ ] RSS feed for updates

### Future Consideration (v2+)

Features to defer until pattern is established.

- [ ] Search/filter for large archives (wait until 20+ entries)
- [ ] Analytics transparency on colophon (only if using analytics)
- [ ] Performance metrics on colophon (nice to have, not essential)
- [ ] Multi-language support (only if audience demands)
- [ ] Affiliate disclosure on uses (only if using affiliate links)

## Feature Prioritization Matrix

### Now Page

| Feature                   | User Value | Implementation Cost | Priority |
| ------------------------- | ---------- | ------------------- | -------- |
| Current content with date | HIGH       | LOW                 | P1       |
| Link to nownownow.com     | MEDIUM     | LOW                 | P1       |
| Archive listing           | MEDIUM     | LOW                 | P1       |
| Dated version storage     | HIGH       | LOW                 | P1       |
| Section headers           | MEDIUM     | LOW                 | P2       |
| Photos/imagery            | MEDIUM     | MEDIUM              | P2       |
| Update frequency note     | LOW        | LOW                 | P3       |

### Colophon

| Feature                | User Value | Implementation Cost | Priority |
| ---------------------- | ---------- | ------------------- | -------- |
| Technology stack       | HIGH       | LOW                 | P1       |
| Typography details     | MEDIUM     | LOW                 | P1       |
| Site principles        | MEDIUM     | LOW                 | P1       |
| Changelog entries      | HIGH       | LOW                 | P1       |
| Version titles         | MEDIUM     | LOW                 | P1       |
| Year-in-gutter design  | MEDIUM     | MEDIUM              | P2       |
| Performance metrics    | LOW        | MEDIUM              | P3       |
| Analytics transparency | LOW        | LOW                 | P3       |

### Uses Page

| Feature              | User Value | Implementation Cost | Priority |
| -------------------- | ---------- | ------------------- | -------- |
| Editor + Terminal    | HIGH       | LOW                 | P1       |
| Hardware setup       | HIGH       | LOW                 | P1       |
| Categorized sections | MEDIUM     | LOW                 | P1       |
| Product links        | MEDIUM     | LOW                 | P1       |
| Why/explanations     | MEDIUM     | LOW                 | P2       |
| Backup strategy      | LOW        | LOW                 | P2       |
| Recording gear       | LOW        | LOW                 | P3       |

### Archive System

| Feature                    | User Value | Implementation Cost | Priority |
| -------------------------- | ---------- | ------------------- | -------- |
| Reverse chronological list | HIGH       | LOW                 | P1       |
| Date formatting (ISO)      | HIGH       | LOW                 | P1       |
| Permalinks to versions     | HIGH       | LOW                 | P1       |
| Count/stats                | LOW        | LOW                 | P2       |
| Preview/excerpts           | MEDIUM     | LOW                 | P2       |
| RSS feed                   | MEDIUM     | LOW                 | P2       |
| Search/filter              | LOW        | MEDIUM              | P3       |

**Priority key:**

- P1: Must have for launch - table stakes
- P2: Should have - adds value but not critical
- P3: Nice to have - defer until established

## Pattern Analysis

### Now Page Pattern (nownownow.com movement)

**Core principle:** Answer "what would you tell a friend you haven't seen in a year?"

**Standard features:**

- Single page at /now/
- Current snapshot, not historical
- Personal and authentic
- Updated manually (monthly/quarterly typical)
- Link to nownownow.com/about

**Archive pattern (not standard but emerging):**

- Historical versions at /now/<date>.html
- Archive listing at /now/archive/
- Shows personal evolution over time
- LOW complexity to implement

**Confidence:** HIGH - Based on nownownow.com official guidance and movement founder Derek Sivers' implementation

### Colophon Pattern (IndieWeb community)

**Core principle:** Document how site is made and what principles govern it

**Standard features:**

- Technology stack (framework, hosting, tools)
- Typography (fonts, designers)
- Site principles (privacy, accessibility)
- Brief format (publishing tradition)

**Changelog pattern:**

- Reverse chronological dated entries
- ISO date format (YYYY-MM-DD)
- Version titles for major changes
- Shows site evolution

**Confidence:** MEDIUM - Based on IndieWeb wiki and observed examples (Harper Reed, others)

### Uses Page Pattern (Wes Bos community)

**Core principle:** Share tools and setup that make you productive

**Standard features:**

- Editor + Terminal section (primary workspace)
- Hardware/Desk Setup
- Desktop Apps
- Categorized by function
- Links to products

**Optional sections:**

- Backup strategy
- Recording/content gear
- Other tools

**Confidence:** MEDIUM - Based on uses.tech directory and Wes Bos' original implementation

### Archive System Pattern (General web convention)

**Core principles:**

- Reverse chronological (latest first)
- Dated entries (ISO 8601 format)
- Direct permalinks
- Simple navigation

**Keep it simple:**

- Personal sites rarely need search
- Simple chronological list sufficient
- RSS feed more valuable than search

**Confidence:** HIGH - Standard web convention across platforms

## Implementation Notes for Eleventy

### Now Page Architecture

```
/now/               → Current version (index.html)
/now/2026-02-06/    → Dated version (can also be .html)
/now/archive/       → Listing of all versions
```

**Data structure:** Markdown files with date in frontmatter or filename
**Template needs:** Single now page template, archive listing template
**Navigation:** Latest at /now/, "View archive" link prominent

### Colophon Architecture

```
/colophon/          → Single stacked page
```

**Data structure:** Single markdown file or collection of changelog entries
**Template needs:** Timeline design with year markers in gutter
**Content:** Technology, typography, principles, then changelog in reverse chronological

### Uses Architecture

```
/uses/              → Single article page
```

**Data structure:** Single markdown file with sections
**Template needs:** Simple article template, section headers
**Content:** Categorized sections with product links

### General Considerations

- All dates use ISO 8601 (YYYY-MM-DD)
- Permalinks must be stable
- Mobile-first responsive design
- Semantic HTML
- Fast load times (static content, minimal JS)

## Sources

**Primary sources (HIGH confidence):**

- [nownownow.com/about](https://nownownow.com/about) - Official /now page movement guidance
- [IndieWeb colophon wiki](https://indieweb.org/colophon) - Community standards
- [Wes Bos /uses page](https://wesbos.com/uses) - Original uses page pattern
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) - Changelog standards

**Examples analyzed (MEDIUM confidence):**

- [Harper Reed's colophon](https://harper.blog/colophon/) - Changelog implementation
- [Derek Sivers /now page](https://sive.rs/now) - Movement founder's implementation
- [GitHub awesome-uses](https://github.com/wesbos/awesome-uses) - Uses page directory

**Community research (LOW-MEDIUM confidence):**

- [Personal Websites: 35 Inspiring Examples (2026)](https://www.sitebuilderreport.com/inspiration/personal-websites)
- [Modern Web Design Trends 2026](https://mytasker.com/blog/modern-web-design-trends-best-practices)
- [Website Archives Design: Good Practices](https://www.smashingmagazine.com/2010/05/website-archives-best-practices-and-showcase/)

---

_Feature research for: Eleventy personal website - now/colophon/uses pages_
_Researched: 2026-02-06_
