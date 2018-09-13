const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const kebabCase = require('lodash.kebabcase')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/page.js')
    const tagsTemplate = path.resolve('src/templates/tags.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          // eslint-disable-next-line no-console
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        // Create blog posts pages.
        posts.forEach(post => {
          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug
            }
          })
        })

        // Tag pages
        const tags = posts.reduce((acc, post) => {
          const postTags = post.node.frontmatter.tags

          if (postTags) {
            postTags.forEach(tag => {
              if (!acc.includes(tag)) {
                acc.push(tag)
              }
            })
          }

          return acc
        }, [])

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: `/tags/${kebabCase(tag)}/`,
            component: tagsTemplate,
            context: {
              tag
            }
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: 'slug',
      node,
      value
    })
  }
}
