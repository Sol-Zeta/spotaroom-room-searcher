import React from 'react';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.container}>
    <a
      href="https://github.com/Sol-Zeta/spotaroom-room-searcher"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.text}
    >
      An Erasmusu &#174; Technical Test made by <span>Sol</span>
    </a>
  </footer>
  )
}
