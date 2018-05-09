import React from 'react';

const IndexPage = ({data}) => (
  <div>
    <article id="about">
      <h2>{data.about.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: data.about.html }} />
    </article>
    <article id="contact">
      <h2>{data.contact.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: data.contact.html }} />
    </article>
  </div>
);

export default IndexPage;

export const pageQuery = graphql`
  query Home {
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
