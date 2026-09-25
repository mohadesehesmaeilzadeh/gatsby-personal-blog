import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
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

export const Head = ({ location }) => (
  <Seo
    title="Page Not Found"
    description="The page you are looking for does not exist."
    pathname={location.pathname}
    noIndex
  />
)
