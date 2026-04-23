# Create a New Now Page

Scaffold a new now page. The user fills in the content themselves — this skill only creates the empty dated file.

## What to do

Write a new file at `site/now/YYYY-MM-DD.md` using today's date, with frontmatter only and an empty body:

```markdown
---
title: What I'm Doing Now
date: YYYY-MM-DD
---
```

That's it. Do not add section headings, placeholders, or content.

## Why this is all that's needed

The `/now/` route and the archive update themselves:

- `site/now/now.11tydata.js` applies `override:tags: ['now']` to every entry in this directory, so the new file joins `collections.now` automatically.
- `layouts/now.njk` renders the latest entry in that collection at `/now/`, so the new file becomes the live now page as soon as it's the newest by date.
- `site/now/archive.njk` iterates the same collection, so the entry appears in the archive automatically.
- Eleventy's default URL for `site/now/YYYY-MM-DD.md` is `/now/YYYY-MM-DD/` — the permanent dated URL.

No edits to `index.njk`, `archive.njk`, or any layout are required.
