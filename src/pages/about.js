import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
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

const projects = [
  {
    title: "NebulaDesk",
    type: "Interactive portfolio",
    description:
      "A browser-based operating system with a window manager, searchable Start Menu, portfolio apps, themes, and persistent preferences.",
    technologies: ["React 19", "Vite", "Canvas API"],
    href: "https://github.com/mohadesehesmaeilzadeh/nebula-desk",
  },
  {
    title: "Bookloom",
    type: "Reading tracker",
    description:
      "A local-first personal library with Open Library search, reading sessions, analytics, backups, and English/Persian support.",
    technologies: ["React 19", "Recharts", "Open Library API"],
    href: "https://github.com/mohadesehesmaeilzadeh/bookloom",
  },
  {
    title: "NextStore",
    type: "E-commerce",
    description:
      "A responsive storefront with server-rendered products, search and filters, a persistent Redux cart, guarded routes, and demo checkout.",
    technologies: ["Next.js 16", "Redux Toolkit", "GraphQL"],
    href: "https://github.com/mohadesehesmaeilzadeh/nextjs-store",
  },
  {
    title: "Crypto Price Tracker",
    type: "Live data application",
    description:
      "A responsive tracker for live cryptocurrency prices, market data, search, error states, and automatic refreshes.",
    technologies: ["React", "Kraken API", "Fetch API"],
    href: "https://github.com/mohadesehesmaeilzadeh/crypto-price-tracker",
  },
  {
    title: "STM32 Mastermind",
    type: "Embedded game",
    description:
      "A timed bomb-defusal game using USART, LCD, interrupts, LEDs, a seven-segment display, and a buzzer on STM32F401.",
    technologies: ["C", "STM32F401", "Proteus"],
    href: "https://github.com/mohadesehesmaeilzadeh/stm32-mastermind-game",
  },
  {
    title: "Vending Machine FSM",
    type: "Digital systems",
    description:
      "A Verilog vending-machine controller with purchase, change, and refund states, plus an interactive web demo of the FSM.",
    technologies: ["Verilog", "ModelSim", "JavaScript"],
    href:
      "https://github.com/mohadesehesmaeilzadeh/verilog-vending-machine-fsm",
  },
]

const ExternalLinkIcon = () => (
  <svg
    className={styles.externalIcon}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

const AboutPage = () => {
  return (
    <Layout>
      <section className={styles.hero}>
        <div className={styles.imageWrap}>
          <StaticImage
            src="../images/profile.jpg"
            alt="Portrait of Mohadeseh Esmaeilzadeh"
            className={styles.profileImage}
            width={760}
            quality={85}
            placeholder="blurred"
            formats={["auto", "webp", "avif"]}
            loading="eager"
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

      <section id="projects" className={styles.projectsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Selected work</p>
            <h2>Projects I've built</h2>
            <p>
              A mix of frontend products and engineering projects—from
              interactive React experiences to embedded systems.
            </p>
          </div>
          <a
            className={styles.allProjectsLink}
            href="https://github.com/mohadesehesmaeilzadeh?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all repositories
            <ExternalLinkIcon />
          </a>
        </div>

        <ul className={styles.projectGrid}>
          {projects.map((project, index) => (
            <li key={project.title}>
              <a
                className={styles.projectCard}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.projectTopline}>
                  <span className={styles.projectNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.projectType}>{project.type}</span>
                </span>
                <span className={styles.projectTitleRow}>
                  <span className={styles.projectTitle}>{project.title}</span>
                  <ExternalLinkIcon />
                </span>
                <span className={styles.projectDescription}>
                  {project.description}
                </span>
                <span className={styles.projectTech}>
                  {project.technologies.map(technology => (
                    <span key={technology}>{technology}</span>
                  ))}
                </span>
              </a>
            </li>
          ))}
        </ul>
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

export const Head = ({ location }) => (
  <Seo
    title="About"
    description="Learn more about Mohadeseh, a frontend developer."
    pathname={location.pathname}
  />
)
