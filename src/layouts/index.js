import React from 'react';
import Helmet from 'react-helmet';

import Footer from '../components/footer';
import Nav from '../components/nav';
import './index.css';
import 'prismjs/themes/prism-solarizedlight.css';

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      htmlAttributes={{
         className: 'no-js',
         lang: 'en-us',
         dir: 'ltr'
      }}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description },
        { name: 'author', content: data.site.siteMetadata.author }
      ]}
      link={[
        { rel: 'author', href: '/#author', title: 'About the author'},
        { rel: 'home', href: '/', title: 'Home'}
      ]}
    >
    </Helmet>
    <section className="main" role="main">
      {children()}
    </section>
    <Nav />
    <Footer />
  </div>
);

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
