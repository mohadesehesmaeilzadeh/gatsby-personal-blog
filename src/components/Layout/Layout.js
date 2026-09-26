import * as React from "react"

import "../../styles/globals.css"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import * as styles from "./Layout.module.css"

const Layout = ({ children }) => {
  return (
    <div className={styles.page}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Header />

      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout
