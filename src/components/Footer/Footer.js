import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./Footer.module.css"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.name}>Mohadeseh Esmaeilzadeh</p>
          <p>Frontend notes, practical lessons, and projects.</p>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/blog">Blog</Link>
          <a href="/rss.xml">RSS</a>
          <a
            href="https://github.com/mohadesehesmaeilzadeh"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub (opens in a new tab)"
          >
            GitHub
          </a>
        </nav>
      </div>
      <p className={styles.copyright}>&copy; {year} Built with Gatsby.</p>
    </footer>
  )
}

export default Footer
