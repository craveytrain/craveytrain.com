import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from 'components/layout'
import PostLink from 'components/post-link'
import Helmet from 'react-helmet'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`
  const tagTitle = `${tag} posts`

  return (
    <Layout>
      <Helmet title={tagTitle} />
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          return (
            <li key={slug}>
              <PostLink post={node} />
            </li>
          )
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            dateTimeStamp: date
            date(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`
