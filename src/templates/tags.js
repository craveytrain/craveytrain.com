import React from 'react';

// Components
import Link from 'gatsby-link';
import PostLink from '../components/post-link';
import Helmet from 'react-helmet';

const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;
  const tagTitle = `${tag} posts`;

  return (
    <div>
      <Helmet title={tagTitle} />
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields;
          return (
            <li key={slug}><PostLink post={node} /></li>
          );
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
      <Link to="/tags">All tags</Link>
    </div>
  );
};

export default Tags;

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
`;
