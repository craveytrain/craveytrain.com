import React from 'react'
import { Link } from 'gatsby'
import SearchIcon from 'img/search.svg'
import Logo from 'img/logo.svg'
import styles from 'styles/nav.module.scss'

const Nav = ({ title, isHome }) => {
  const navItems = [
    {
      name: 'Posts',
      url: '/posts'
    },
    {
      name: 'About',
      url: '/about'
    },
    {
      name: 'Contact',
      url: '/contact'
    }
  ]

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <Link to="/" className={styles.navLogo}>
            <Logo className={styles.navLogo} />
          </Link>
        </li>
        {navItems.map(navItem => (
          <li key={navItem.url} className={styles.navListItem}>
            <Link to={navItem.url} className={styles.navLink}>
              {navItem.name}
            </Link>
          </li>
        ))}
        <li className={styles.navListItem}>
          <a
            className={styles.navLink}
            href="https://www.google.com/search?sitesearch=craveytrain.com"
          >
            <SearchIcon className={styles.searchIcon} />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
