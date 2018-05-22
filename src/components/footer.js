import React from 'react';
import styles from './footer.module.css';
import Link from 'gatsby-link';

const Footer = () => (
  <footer className={styles.footer}>Brought to you by a <Link to="/colophon">lot of technologies</Link> and the number 7.</footer>
);

export default Footer;
