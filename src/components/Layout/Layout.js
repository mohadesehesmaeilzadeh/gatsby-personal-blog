import * as React from "react"

import "../../styles/globals.css"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import * as styles from "./Layout.module.css"

const Layout = ({ children }) => {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
