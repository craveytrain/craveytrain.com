import React from 'react';
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import styles from 'styles/index.module.scss'

const IndexPage = ({data: { about, contact }}) => (
  <Layout isHome={true}>
    <article id="about">
      <h2>{about.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: about.html }} />
    </article>
    <article className={styles.contact} id="contact">
      <h2>{contact.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: contact.html }} />
    </article>
  </Layout>
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
