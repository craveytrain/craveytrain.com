import React from 'react';
import Link from 'gatsby-link';

<<<<<<< Updated upstream
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
=======
const Nav = ({title}) => {
  const navItems = [
    {
      name: 'Posts',
      url: '/posts'
    },
    {
      name: 'About',
      url: '/#about'
    },
    {
      name: 'Contact',
      url: '/#contact'
    }
  ];
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <Link to="/" className={styles.homeNavLink}>
            <Logo className={styles.logo} />{title}
          </Link>
        </li>
        {navItems.map(navItem => <li key={navItem.url} className={styles.navListItem}>
          <Link to={navItem.url} className={styles.navLink}>
            {navItem.name}
          </Link>
        </li>)}
        <li className={styles.navListItem}>
          <a href="#search-box" className={styles.navLink}>
            <SearchIcon className={styles.searchIcon} />
          </a>
          <form className={styles.searchBox} id="search-box" method="get" action="http://google.com/search" role="search">
            <input type="hidden" name="sitesearch" value="http://craveytrain.com" />
            <input id="q" type="search" name="q" placeholder="search" />
          </form>
        </li>
      </ul>
    </nav>
  );
};
>>>>>>> Stashed changes

export default Nav;
