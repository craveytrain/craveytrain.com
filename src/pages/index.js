import React from 'react';

const IndexPage = ({data: { about, contact}}) => (
  <div>
    <article id="about">
      <h2>{about.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: about.html }} />
    </article>
    <article id="contact">
      <h2>{contact.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: contact.html }} />
    </article>
  </div>
);

export default IndexPage;

export const pageQuery = graphql`
query Home {
  site {
    siteMetadata {
      title
    }
  }
  about: markdownRemark(fields: {slug: {eq: "/about/"}}) {
    ...doc
  }
  contact: markdownRemark(fields: {slug: {eq: "/contact/"}}) {
    ...doc
  }
  }

  fragment doc on MarkdownRemark {
  html
  frontmatter {
    title
  }
}
`
