import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout/Layout"
import profilePhoto from "../images/profile.jpg"
import * as styles from "./about.module.css"

const skills = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Material UI",
  "Git",
  "GitHub",
  "Responsive Design",
  "Gatsby",
]

const AboutPage = () => {
  return (
    <Layout>
      <section className={styles.hero}>
        <div className={styles.imageWrap}>
          <img
            src={profilePhoto}
            alt="Mohadeseh"
            className={styles.profileImage}
          />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>About Me</p>
          <h1>Hi, I'm Mohadeseh.</h1>
          <p>
            I'm a frontend developer who enjoys creating clean, responsive, and
            user-friendly web interfaces.
          </p>
          <p>
            I mainly work with React, JavaScript, Material UI, and modern
            frontend development tools.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>A little more about me</h2>
        <p>
          I enjoy frontend development because it brings design and code
          together in a practical way. I like improving user interfaces, making
          layouts work well on different screen sizes, and learning new web
          technologies through real projects.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Skills &amp; Technologies</h2>
        <div className={styles.skillsList}>
          {skills.map(skill => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Currently Learning</h2>
        <p>
          I'm continuously improving my frontend skills and exploring modern
          React ecosystems, Next.js, Gatsby, APIs, GraphQL, and frontend
          architecture.
        </p>
      </section>

      <section className={styles.cta}>
        <div>
          <h2>Want to read what I'm learning?</h2>
          <p>Visit my blog or get in touch to follow along with my work.</p>
        </div>
        <div className={styles.actions}>
          <Link to="/blog" className={styles.primaryButton}>
            Visit My Blog
          </Link>
          <Link to="/contact" className={styles.secondaryButton}>
            Contact Me
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default AboutPage

export const Head = () => (
  <>
    <title>About | Mohadeseh</title>
    <meta
      name="description"
      content="Learn more about Mohadeseh, a frontend developer."
    />
  </>
)
