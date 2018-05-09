import React from 'react';
import Helmet from 'react-helmet';

export default function Template({
  data
}) {
  const post = data.markdownRemark;
  return (
    <div>
      <Helmet title={post.frontmatter.title} />
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        dateTimeStamp: date
        date(formatString: "MMM DD, YYYY")
      }
    }
  }
`
