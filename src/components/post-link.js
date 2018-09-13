import React from 'react'
import { Link } from 'gatsby'

const PostLink = ({ post }) => (
  <>
    <h2>
      <Link to={post.fields.slug.replace(/\/$/, '')}>
        {post.frontmatter.title}
      </Link>
    </h2>
    <p className="timestamp">{post.frontmatter.date}</p>
    {post.frontmatter.tags && (
      <footer>
        <p className="meta">
          Posted in{' '}
          {post.frontmatter.tags.map((tag, i) => (
            <span key={tag}>
              {!!i && ', '}
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </span>
          ))}
        </p>
      </footer>
    )}
  </>
)

export default PostLink
