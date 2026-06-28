# Create a New Blog Post

Create a new blog post file with frontmatter ready to fill in.

## Step 1: Determine the Title

Check if a title was provided as an argument: $ARGUMENTS

- If arguments were provided, use them as the post title
- If no arguments were provided, assume the user doesn't have a title yet and proceed without one

## Step 2: Create the File

1. If a title was provided, convert it to a kebab-case slug (lowercase, spaces to hyphens, remove special characters)
2. If no title, use `draft-YYYY-MM-DD-N` (check `site/posts/` for existing drafts with today's date and use the next available number)
3. Write the file to `site/posts/[slug].md` with this format:

```markdown
---
title: [The Title They Provided, or empty if skipped]
date: YYYY-MM-DD
description:
tags:
---
```

Use today's date in YYYY-MM-DD format for the date field. If they skipped the title, leave it empty so they can fill it in later.

## Step 3: Confirm

Tell the user the file was created and remind them they can use `/excerpt` when they're done writing to generate a description and get tag recommendations.
