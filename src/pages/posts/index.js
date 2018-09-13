import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import PostLink from 'components/post-link'
import Helmet from 'react-helmet'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => (
      <li key={edge.node.id}>
        <PostLink post={edge.node} />
      </li>
    ))

  return (
    <Layout>
      <Helmet title="Posts" />
      <h1>Posts</h1>
      <ol>{Posts}</ol>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
