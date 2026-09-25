import * as React from "react"
import { graphql, Link } from "gatsby"

import ArticleCard from "../components/ArticleCard/ArticleCard"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
import * as styles from "./index.module.css"

const IndexPage = ({ data }) => {
  const latestArticles = data.allMdx.nodes

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
          <div className={styles.visualHeader}>
            <div className={styles.initials}>ME</div>
            <span>frontend-profile.js</span>
          </div>
          <dl>
            <div>
              <dt>Focus</dt>
              <dd>React interfaces</dd>
            </div>
            <div>
              <dt>Values</dt>
              <dd>Clarity and accessibility</dd>
            </div>
            <div>
              <dt>Learning</dt>
              <dd>Modern web architecture</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.latestPosts} aria-labelledby="latest-posts-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionLabel}>From the blog</p>
            <h2 id="latest-posts-title">Latest articles</h2>
          </div>
          <Link to="/blog" className={styles.textLink}>
            View all articles &rarr;
          </Link>
        </div>

        <div className={styles.articleGrid}>
          {latestArticles.map(article => (
            <ArticleCard
              key={article.id}
              title={article.frontmatter.title}
              date={article.frontmatter.date}
              description={article.frontmatter.description}
              slug={article.frontmatter.slug}
              image={article.frontmatter.cover}
              tags={article.frontmatter.tags}
              category={article.frontmatter.category}
              headingLevel={3}
            />
          ))}
        </div>
      </section>

      <section className={styles.introSection}>
        <p className={styles.sectionLabel}>About this site</p>
        <h2>Learning in public, one interface at a time</h2>
        <p>
          I share practical notes from building responsive interfaces with
          React, Gatsby, and the modern web platform.
        </p>
        <Link to="/about" className={styles.textLink}>
          More about me &rarr;
        </Link>
      </section>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomePageQuery {
    allMdx(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
          description
          slug
          tags
          category
          published
          cover {
            childImageSharp {
              gatsbyImageData(
                width: 700
                aspectRatio: 1.7778
                quality: 82
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`

export const Head = ({ location }) => <Seo pathname={location.pathname} />
