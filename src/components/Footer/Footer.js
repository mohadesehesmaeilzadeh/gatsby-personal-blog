import * as React from "react"

import * as styles from "./Footer.module.css"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>&copy; {year} Mohadeseh. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
