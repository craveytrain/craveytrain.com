## What changed and why

Redesigned the now page archive (/now/archive/) to use the same grouped-by-year editorial pattern as tag pages, replacing a basic bulleted list with the section-grid layout system. This brings visual consistency across the site's archive pages and provides better information hierarchy.

## What I considered and rejected

Considered adapting the existing post-list-grouped.njk partial to handle both posts and now entries, but rejected this because now entries have fundamentally different data (no title, no tags) - creating a sibling now-list-grouped.njk partial keeps concerns separated and follows the project's principle of minimal code footprint.

## Where to look first

includes/now-list-grouped.njk:1-24 — the new partial that adapts the grouped layout pattern for now entries, using date as the primary identifier instead of post titles.

## What I'm unsure about

Fully confident because the implementation mirrors the established tag page pattern exactly, uses existing CSS classes from posts.css, and maintains the same responsive behavior and visual hierarchy.

## How I verified

Manual browser review at http://localhost:8086/now/archive/ — confirmed section-grid layout with year groupings, proper date formatting, working links to individual entries, and responsive behavior matching tag pages.

## Dock task

http://localhost:3000/tasks/67
