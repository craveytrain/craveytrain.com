# Create a New Now Page

Create a new now page for the user's site. Follow these steps:

## Step 1: Gather Content for Each Category

Ask the user about each category one at a time using the AskUserQuestion tool. For each category, provide a text input field where they can share what's happening in that area of their life. Include an option to skip if they have nothing new to share.

The categories are:

1. **Work** - What are you working on professionally?
2. **Building** - What projects or side projects are you tinkering with?
3. **Learning** - What are you learning or exploring?
4. **Reading** - What books or content are you reading?
5. **Life** - What's happening in your personal life?

## Step 2: Draft the Now Page

Using the user's responses, draft the now page content. For each category:

- Keep the user's voice and intent
- Clean up grammar and punctuation
- Make it concise but conversational
- If the user skipped a category, use a brief placeholder or carry forward from the previous now page at `site/now/`
- Generate a descriptive `###` subheading for each item based on the content the user provides (e.g., "### UX Engineering", "### This Site, Always"), unless the user explicitly includes a subheading in their response
- If a category has multiple distinct topics, create separate subheadings for each

## Step 3: Review and Approval

Present the full draft to the user and ask for their approval. Allow them to request changes or approve as-is.

## Step 4: Write the File

Once approved, write the file to `site/now/YYYY-MM-DD.md` using today's date.

The file format should be:

```markdown
---
title: What I'm Doing Now
date: YYYY-MM-DD
---

## Work

### [Generated or user-provided subheading]

[content]

## Building

### [Generated or user-provided subheading]

[content]

## Learning

[content]

## Reading

[content]

## Life

[content]
```

Note: The intro sentence about what a now page is lives in the `layouts/now.njk` template, so don't include it in the markdown file.

Use the current date for both the filename and the front matter date field.
