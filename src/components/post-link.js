import React from 'react';
import Link from 'gatsby-link';

const PostLink = ({ post }) => (
  <div>
    <h2>
      <Link to={post.fields.slug.replace(/\/$/, '')}>
        {post.frontmatter.title}
      </Link>
    </h2>
    <p className="timestamp"><time dateTime={post.frontmatter.date} pubdate>{post.frontmatter.date}</time></p>
    {post.frontmatter.tags && (
      <footer>
        <p className="meta">Posted in {post.frontmatter.tags.map((tag, i) =>
          <span key={tag}>{!!i && ', '}
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </span>
        )}</p>
      </footer>
    )}
  </div>
);

export default PostLink;
