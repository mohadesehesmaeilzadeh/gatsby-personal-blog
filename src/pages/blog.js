import * as React from "react"
import { graphql, Link } from "gatsby"

import ArticleCard from "../components/ArticleCard/ArticleCard"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
import blogContent from "../utils/blog-content"
import * as styles from "./blog.module.css"

const { getArchivePath, getSearchState } = blogContent

const BlogPage = ({ data }) => {
  const articles = data.allMdx.nodes
  const [searchTerm, setSearchTerm] = React.useState("")
  const searchInputRef = React.useRef(null)
  const searchState = React.useMemo(
    () => getSearchState(articles, searchTerm),
    [articles, searchTerm]
  )
  const {
    articles: filteredArticles,
    hasSearch,
    hasResults,
    summary: resultsSummary,
  } = searchState
  const categories = React.useMemo(
    () =>
      [
        ...new Set(
          articles
            .map(article => article.frontmatter.category)
            .filter(Boolean)
        ),
      ].sort(),
    [articles]
  )
  const tags = React.useMemo(
    () =>
      [
        ...new Set(
          articles.flatMap(article => article.frontmatter.tags || [])
        ),
      ].sort(),
    [articles]
  )
  const clearSearch = React.useCallback(() => {
    setSearchTerm("")
    requestAnimationFrame(() => searchInputRef.current?.focus())
  }, [])

  const handleSearchKeyDown = event => {
    if (event.key === "Escape" && hasSearch) {
      clearSearch()
    }
  }

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
        <>
          <section
            className={styles.searchPanel}
            aria-labelledby="search-title"
          >
            <label id="search-title" htmlFor="blog-search">
              Search articles
            </label>
            <p id="blog-search-hint">
              Search by title, description, tag, or category.
            </p>
            <div className={styles.searchControls}>
              <input
                id="blog-search"
                ref={searchInputRef}
                type="search"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Try React, Gatsby, or responsive design"
                aria-describedby="blog-search-hint"
              />
              {hasSearch ? (
                <button type="button" onClick={clearSearch}>
                  Clear search
                </button>
              ) : null}
            </div>
          </section>

          <nav className={styles.taxonomyNav} aria-label="Browse blog topics">
            {categories.length > 0 ? (
              <div className={styles.taxonomyGroup}>
                <h2>Categories</h2>
                <div>
                  {categories.map(category => (
                    <Link
                      key={category}
                      to={getArchivePath("categories", category)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            {tags.length > 0 ? (
              <div className={styles.taxonomyGroup}>
                <h2>Tags</h2>
                <div>
                  {tags.map(tag => (
                    <Link key={tag} to={getArchivePath("tags", tag)}>
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </nav>

          <p
            id="blog-results-summary"
            className={styles.resultsSummary}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {resultsSummary}
          </p>

          {hasResults ? (
            <section
              className={styles.articleGrid}
              aria-labelledby="blog-results-summary"
            >
              {filteredArticles.map(article => (
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
            <section
              className={styles.emptyState}
              aria-labelledby="no-results-title"
            >
              <h2 id="no-results-title">No articles found</h2>
              <p>Try a different title, topic, tag, or category.</p>
              <button type="button" onClick={clearSearch}>
                Clear search
              </button>
            </section>
          )}
        </>
      ) : (
        <section className={styles.emptyState}>
          <h2>No articles yet</h2>
          <p>Published articles will appear here.</p>
        </section>
      )}
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query BlogPageQuery {
    allMdx(
      filter: { frontmatter: { published: { eq: true } } }
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

export const Head = ({ location }) => (
  <Seo
    title="Blog"
    description="Frontend development articles by Mohadeseh."
    pathname={location.pathname}
  />
)
