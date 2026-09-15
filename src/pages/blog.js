import * as React from "react"
import { graphql } from "gatsby"

import ArticleCard from "../components/ArticleCard/ArticleCard"
import Layout from "../components/Layout/Layout"
import * as styles from "./blog.module.css"

const BlogPage = ({ data }) => {
  const articles = data.allMdx.nodes

  return (
    <Layout>
      <section className={styles.header}>
        <h1>Blog</h1>
        <p>
          Articles about frontend development, React, Gatsby, responsive
          design, and things I'm learning.
        </p>
      </section>

      {articles.length > 0 ? (
        <section className={styles.articleGrid} aria-label="Blog articles">
          {articles.map(article => (
            <ArticleCard
              key={article.id}
              title={article.frontmatter.title}
              date={article.frontmatter.date}
              description={article.frontmatter.description}
              slug={article.frontmatter.slug}
              image={article.frontmatter.cover}
            />
          ))}
        </section>
      ) : (
        <p className={styles.emptyState}>No articles available yet.</p>
      )}
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query BlogPageQuery {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
          description
          slug
          cover {
            childImageSharp {
              gatsbyImageData(
                width: 700
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

export const Head = () => (
  <>
    <title>Blog | Mohadeseh</title>
    <meta
      name="description"
      content="Frontend development articles by Mohadeseh."
    />
  </>
)
