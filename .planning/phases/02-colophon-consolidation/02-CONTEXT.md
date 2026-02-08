# Phase 2: Colophon Consolidation - Context

**Gathered:** 2026-02-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Move the 9 colophon blog posts out of the `/posts/` directory to remove them from the main blog listing. The consolidated colophon page at `/colophon/` already exists and uses a collection to display all versions.

**Key discovery:** The consolidation work is already done. `site/colophon.njk` pulls in all posts tagged `colophon` via `collections['colophon'] | reverse` and displays them stacked with the intro paragraph.

</domain>

<decisions>
## Implementation Decisions

### File organization

- Move all 9 `colophon-vX.md` files from `site/posts/` to a new `site/colophon/` directory
- This removes them from the `posts` collection while preserving the `colophon` tag
- Update `colophon.njk` collection reference if needed after the move

### Anchors for version navigation

- Add id anchors to each version section (e.g., `id="v5"`)
- Enables direct linking to specific versions: `/colophon/#v5`

### Redirects

- Skipped — user not concerned about old post URLs breaking
- Old URLs (`/posts/colophon-vX/`) will return 404

### Existing structure preserved

- Keep intro paragraph at top of colophon page
- Keep "Version X" as h2 heading format
- Keep "YYYY - YYYY" date range as h3 subheading
- Keep whitespace separation between entries (no horizontal rules)

### Claude's Discretion

- Directory data file structure for the new colophon folder
- How to ensure the collection still works after file move
- Whether to update colophon.njk template or just move files

</decisions>

<specifics>
## Specific Ideas

- Existing format already matches user's vision: "Version X" headings with year range subheadings
- Content from existing blog posts is used as-is (no reformatting needed)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 02-colophon-consolidation_
_Context gathered: 2026-02-08_
