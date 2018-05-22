import React from 'react';
import styles from './nav.module.scss';
import Link from 'gatsby-link';
import Logo from '../../img/logo.svg';
import SearchIcon from '../../img/search.svg';

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
            <Logo className={styles.logo} />
            <span className={styles.siteTitle}>{title}</span>
          </Link>
        </li>
        {navItems.map(navItem => <li key={navItem.url} className={styles.navListItem}>
          <Link to={navItem.url} className={styles.navLink}>
            {navItem.name}
          </Link>
        </li>)}
        <li className={styles.navListItem}>
          <a className={styles.navLink} href="https://www.google.com/search?sitesearch=craveytrain.com">
            <SearchIcon className={styles.searchIcon} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
