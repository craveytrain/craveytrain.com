import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Footer from 'components/footer'
import Nav from 'components/nav'
import 'styles/index.scss'
import 'prismjs/themes/prism-okaidia.css'

const Layout = ({ children, isHome }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          htmlAttributes={{
            className: 'no-js',
            lang: 'en-us',
            dir: 'ltr'
          }}
          defaultTitle={data.site.siteMetadata.title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description
            },
            { name: 'author', content: data.site.siteMetadata.author }
          ]}
          link={[
            { rel: 'author', href: '/#author', title: 'About the author' },
            { rel: 'home', href: '/', title: 'Home' }
          ]}
        />
        <Nav title={data.site.siteMetadata.title} isHome={isHome} />
        <main className='main' role='main'>
          {children}
        </main>
        <Footer />
      </>
    )}
  />
)

export default Layout
