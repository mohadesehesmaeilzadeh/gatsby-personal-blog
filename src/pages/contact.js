import * as React from "react"

import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
import * as styles from "./contact.module.css"

const contactLinks = [
  {
    name: "GitHub",
    handle: "@mohadesehesmaeilzadeh",
    description: "Explore my code, experiments, and current projects.",
    href: "https://github.com/mohadesehesmaeilzadeh",
    featured: true,
  },
  {
    name: "LinkedIn",
    handle: "Mohadeseh Esmaeilzadeh",
    description: "Connect with me for professional conversations.",
    href: "https://www.linkedin.com/in/mohadeseh-esmaeilzadeh-1102303b2",
  },
  {
    name: "X",
    handle: "@Mohi7121",
    description: "Follow my short updates and things I find interesting.",
    href: "https://x.com/Mohi7121",
  },
  {
    name: "Telegram",
    handle: "@simply_mohitow",
    description: "Send me a direct message for a quick conversation.",
    href: "https://t.me/simply_mohitow",
  },
  {
    name: "Instagram",
    handle: "@mohadesehesmaeilzade",
    description: "Find more casual updates and moments from my work.",
    href: "https://www.instagram.com/mohadesehesmaeilzade",
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

const ContactPage = () => {
  return (
    <Layout>
      <section className={styles.header}>
        <p className={styles.pageEyebrow}>Contact</p>
        <h1>Let&apos;s connect.</h1>
        <p>
          Have a question, project idea, or want to talk about frontend work?
          Pick the channel that works best for you.
        </p>
      </section>

      <section
        className={styles.contactSection}
        aria-labelledby="connect-title"
      >
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Let&apos;s connect</p>
          <h2 id="connect-title">Find me around the web</h2>
          <p>
            Code, professional updates, or a quick hello—these are the places
            where I&apos;m active.
          </p>
        </div>

        <ul className={styles.contactGrid}>
          {contactLinks.map((link, index) => (
            <li
              key={link.name}
              className={link.featured ? styles.featuredItem : undefined}
            >
              <a
                className={styles.contactLink}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.linkTopline}>
                  <span className={styles.linkIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.linkAction}>
                    Open profile
                    <ExternalLinkIcon />
                  </span>
                </span>
                <span className={styles.linkName}>{link.name}</span>
                <span className={styles.linkHandle}>{link.handle}</span>
                <span className={styles.linkDescription}>
                  {link.description}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default ContactPage

export const Head = ({ location }) => (
  <Seo
    title="Contact"
    description="Connect with Mohadeseh Esmaeilzadeh, a frontend developer."
    pathname={location.pathname}
  />
)
