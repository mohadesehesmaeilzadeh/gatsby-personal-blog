import * as React from "react"
import { Link } from "gatsby"

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
          Mohadeseh
        </Link>

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
      </div>
    </header>
  )
}

export default Header
