import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout/Layout"
import * as styles from "./index.module.css"

const quickLinks = [
  {
    title: "Blog",
    text: "Read my latest articles.",
    path: "/blog",
  },
  {
    title: "About",
    text: "Learn more about me.",
    path: "/about",
  },
  {
    title: "Contact",
    text: "Get in touch with me.",
    path: "/contact",
  },
]

const IndexPage = () => {
  return (
    <Layout>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Frontend Developer</p>
          <h1>Hi, I'm Mohadeseh</h1>
          <p className={styles.heroText}>
            I enjoy building clean, responsive, and user-friendly web
            experiences with React and modern frontend tools.
          </p>

          <div className={styles.heroActions}>
            <Link to="/blog" className={styles.primaryButton}>
              View My Blog
            </Link>
            <Link to="/about" className={styles.secondaryButton}>
              About Me
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.initials}>ME</div>
          <p>React</p>
          <span>Responsive websites</span>
        </div>
      </section>

      <section className={styles.introSection}>
        <h2>About this website</h2>
        <p>
          This website is where I share what I'm learning, projects I'm working
          on, and articles about frontend development.
        </p>
        <Link to="/about" className={styles.textLink}>
          Learn more about me &rarr;
        </Link>
      </section>

      <section className={styles.quickLinks} aria-labelledby="quick-links-title">
        <h2 id="quick-links-title">Explore</h2>
        <div className={styles.cardGrid}>
          {quickLinks.map(link => (
            <Link key={link.path} to={link.path} className={styles.card}>
              <h3>{link.title}</h3>
              <p>{link.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Mohadeseh | Frontend Developer</title>
    <meta
      name="description"
      content="Personal website and blog of Mohadeseh, a frontend developer."
    />
  </>
)
