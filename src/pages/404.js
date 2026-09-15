import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout/Layout"
import * as styles from "./404.module.css"

const NotFoundPage = () => {
  return (
    <Layout>
      <section className={styles.notFound}>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </section>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => (
  <>
    <title>Page Not Found | Mohadeseh</title>
    <meta
      name="description"
      content="The page you are looking for does not exist."
    />
  </>
)
