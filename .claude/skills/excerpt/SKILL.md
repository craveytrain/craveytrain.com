# Polish a Blog Post

Review a blog post and help finalize it for publishing: write an excerpt, suggest tags, offer title options if needed, and flag any spelling or grammar issues.

## Step 1: Identify the Post

Ask the user which post needs review. They can provide:

- A file path
- A post title or slug
- Or say "the current post" if they've been working on one

If unclear, list recent posts from `site/posts/` and ask them to pick one.

## Step 2: Read and Analyze the Post

Read the full post content to understand:

- The main topic and thesis
- Key takeaways or points
- The tone the user used
- Whether the title field is empty or filled in

## Step 3: Check Existing Tags

Look at `site/posts/` to see what tags are already in use across posts. This helps maintain consistency. Run a grep for `tags:` lines to see the existing tag vocabulary.

## Step 4: Spelling and Grammar Review

Carefully read through the post content and look for:

- Spelling errors
- Grammatical mistakes
- Typos or word repetition
- Missing or extra words
- Punctuation issues

**Important:** Do NOT automatically fix these. Instead, compile a list of potential issues with:

- The problematic text
- Where it appears (quote enough context to find it)
- What the issue is
- A suggested correction

If no issues are found, note that the text looks clean.

## Step 5: Write the Excerpt

Write a 1-2 sentence description that:

### Voice Guidelines (from Michael's writing style)

**Do:**

- Write conversationally, like you're talking to someone
- Use contractions naturally ("I'm", "it's", "that's", "won't")
- Be direct and get to the point
- Lead with what the post is actually about
- Use short sentences, mix in a longer one if needed

**Don't:**

- Use em-dashes (—). Ever. Use commas or periods instead.
- Be overly formal or stiff
- Use marketing-speak or clickbait
- Over-explain or hedge
- Use phrases like "In this post, I explore..."

### Examples of Good Excerpts

From existing posts:

- "A walkthrough of my bash configuration. Git branch in the prompt, completion scripts, and the little things that make the terminal feel like home."
- "How to verify your Mastodon profile link without cluttering your page. Using a link tag in the head instead of a visible anchor."

Notice: conversational, specific, gets to the point.

## Step 6: Recommend Tags

Based on the post content, recommend 1-3 relevant tags. Consider:

- Technical topics (javascript, css, html, git, etc.)
- Post type (tutorial, opinion, announcement, etc.)
- Domain (web development, tooling, personal, etc.)

Keep tags lowercase and simple. Prefer existing tags when they fit to maintain consistency.

## Step 7: Suggest Titles (if needed)

If the post's `title:` field is empty or missing:

1. Based on the content and theme, come up with 3-4 title options
2. Vary the style:
   - One straightforward/descriptive
   - One shorter/punchier
   - One that hints at the main takeaway
   - Optionally one that's slightly playful (if it fits the tone)

Keep titles concise. They should work well in a list of posts and in browser tabs.

If the post already has a title, skip this step.

## Step 8: Present for Approval

Show the user everything in a clear format:

1. **Spelling/Grammar Issues** (if any were found)

   - List each issue with the suggested fix
   - If none found, say "No issues found"

2. **Proposed Excerpt**

   - The 1-2 sentence description

3. **Recommended Tags**

   - The suggested tags

4. **Title Options** (only if the title was empty)
   - The 3-4 options to choose from

Ask the user what they'd like to do:

- Which items to accept
- What changes to make
- Which title to use (if applicable)

## Step 9: Update the File

Once approved, update the post's frontmatter:

- Set the `title:` field if they chose one
- Set the `description:` field with the excerpt
- Set the `tags:` field with the approved tags (as a YAML array)

Only make changes the user approved. For spelling/grammar fixes, only apply the ones they specifically accept.
