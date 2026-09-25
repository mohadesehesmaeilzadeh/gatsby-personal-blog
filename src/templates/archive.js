import * as React from "react"
import { graphql, Link } from "gatsby"

import ArticleCard from "../components/ArticleCard/ArticleCard"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
import * as styles from "./archive.module.css"

const ArchiveTemplate = ({ data, pageContext }) => {
  const articles = data.allMdx.nodes
  const { archiveType, archiveValue } = pageContext
  const isTag = archiveType === "Tag"

  return (
    <Layout>
      <section className={styles.header}>
        <Link to="/blog" className={styles.backLink}>
          &larr; Back to Blog
        </Link>
        <p className={styles.eyebrow}>{archiveType}</p>
        <h1>
          {isTag ? "Posts tagged" : "Posts in"} “{archiveValue}”
        </h1>
        <p>
          {articles.length} published article{articles.length === 1 ? "" : "s"}
        </p>
      </section>

      {articles.length > 0 ? (
        <section className={styles.articleGrid} aria-label="Matching articles">
          {articles.map(article => (
            <ArticleCard
              key={article.id}
              title={article.frontmatter.title}
              date={article.frontmatter.date}
              description={article.frontmatter.description}
              slug={article.frontmatter.slug}
              image={article.frontmatter.cover}
              tags={article.frontmatter.tags}
              category={article.frontmatter.category}
            />
          ))}
        </section>
      ) : (
        <section className={styles.emptyState}>
          <h2>No matching articles</h2>
          <p>This archive does not contain any published posts yet.</p>
          <Link to="/blog">Browse all articles</Link>
        </section>
      )}
    </Layout>
  )
}

export default ArchiveTemplate

export const query = graphql`
  query ArchivePageQuery($postIds: [String!]!) {
    allMdx(
      filter: { id: { in: $postIds } }
      sort: { frontmatter: { date: DESC } }
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

export const Head = ({ pageContext, location }) => (
  <Seo
    title={`${pageContext.archiveValue} ${pageContext.archiveType}`}
    description={`Frontend development posts filed under ${pageContext.archiveValue}.`}
    pathname={location.pathname}
  />
)
