import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import styles from 'styles/index.module.scss'

const IndexPage = ({ data: { about, contact } }) => (
  <Layout isHome>
    <section className={styles.hero}>
      <span>
        <span className={styles.heroLargeText}>Hey y'all,</span> my name is{' '}
        <strong>Mike Cravey</strong> and I'm a father, husband, and geek in Lake
        Jackson, TX.
      </span>
    </section>
    <section className={styles.body}>
      <article>
        <h2 className={styles.bodyTitle}>Github</h2>
        <p>
          On the intenet is where I was raised, on{' '}
          <a href="https://github.com/">Github</a> is where I spend most my
          days. One of my fav projects is my{' '}
          <a href="https://github.com/craveytrain/dotfiles">dotfiles</a>.
        </p>
      </article>

      <article>
        <h2 className={styles.bodyTitle}>CodePen</h2>
        <p>
          I've rekindled my love for <a href="https://codepen.io/">CodePen</a>.
          I'm maintaining a{' '}
          <a href="https://codepen.io/craveytrain/pen/xaeXBm">
            sample recipe card
          </a>{' '}
          for a web development course I'm teaching.
        </p>
      </article>

      <article>
        <h2 className={styles.bodyTitle}>LinkedIn</h2>
        <p>
          For a more professional view of my career, I maintain my{' '}
          <a href="https://www.linkedin.com/in/craveytrain/">
            LinkedIn profile page
          </a>
          .
        </p>
      </article>
    </section>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query Home {
    site {
      siteMetadata {
        title
      }
    }
    about: markdownRemark(fields: { slug: { eq: "/about/" } }) {
      ...doc
    }
    contact: markdownRemark(fields: { slug: { eq: "/contact/" } }) {
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
