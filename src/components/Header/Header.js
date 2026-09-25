import * as React from "react"
import { Link } from "gatsby"

import ThemeToggle from "../ThemeToggle/ThemeToggle"
import * as styles from "./Header.module.css"

const navigationLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
]

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.siteName}>
          Mohadeseh Esmaeilzadeh
        </Link>

        <div className={styles.controls}>
          <nav className={styles.nav} aria-label="Main navigation">
            {navigationLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={styles.navLink}
                activeClassName={styles.activeNavLink}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
