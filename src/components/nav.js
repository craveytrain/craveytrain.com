import React from 'react';
import Link from 'gatsby-link';

const Nav = () => (
  <nav className="page-nav" role="navigation">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="/#about">About</Link></li>
      <li><Link to="/#contact">Contact</Link></li>
      <li className="nav-search">
        <form id="search" method="get" action="http://google.com/search" role="search">
          <input type="hidden" name="sitesearch" value="http://craveytrain.com" />
          <input id="q" type="search" name="q" placeholder="search" />
        </form>
      </li>
    </ul>
  </nav>
);

export default Nav;
