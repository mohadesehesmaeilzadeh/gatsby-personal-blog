import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
import blogContent from "../utils/blog-content"
import * as styles from "./blog-post.module.css"

const { getArchivePath } = blogContent

const BlogPostTemplate = ({ data, children, pageContext = {} }) => {
  const post = data.mdx
  const {
    title,
    date,
    dateTime,
    description,
    cover,
    category,
    tags,
  } = post.frontmatter
  const { previousPost, nextPost, relatedPosts = [] } = pageContext
  const postTags = tags || []
  const coverImage = getImage(cover)

  return (
    <Layout>
      <article className={styles.article}>
        <Link to="/blog" className={styles.backLink}>
          &larr; Back to Blog
        </Link>

        <header className={styles.header}>
          {date || category ? (
            <div className={styles.meta}>
              {date ? <time dateTime={dateTime}>{date}</time> : null}
              {category ? (
                <Link to={getArchivePath("categories", category)}>
                  {category}
                </Link>
              ) : null}
            </div>
          ) : null}
          <h1>{title}</h1>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
          {postTags.length > 0 ? (
            <ul className={styles.tags} aria-label="Post tags">
              {postTags.map(tag => (
                <li key={tag}>
                  <Link to={getArchivePath("tags", tag)}>{tag}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {coverImage ? (
          <GatsbyImage
            image={coverImage}
            alt={`Cover for ${title}`}
            className={styles.cover}
            loading="eager"
          />
        ) : null}

        <div className={styles.content}>{children}</div>

        {previousPost || nextPost ? (
          <nav className={styles.postNavigation} aria-label="Post navigation">
            {previousPost ? (
              <Link
                to={previousPost.slug}
                className={styles.postNavLink}
              >
                <span>&larr; Previous</span>
                <strong>{previousPost.title}</strong>
              </Link>
            ) : null}
            {nextPost ? (
              <Link
                to={nextPost.slug}
                className={`${styles.postNavLink} ${styles.nextPost}`}
              >
                <span>Next &rarr;</span>
                <strong>{nextPost.title}</strong>
              </Link>
            ) : null}
          </nav>
        ) : null}

        {relatedPosts.length > 0 ? (
          <section
            className={styles.relatedPosts}
            aria-labelledby="related-posts-title"
          >
            <h2 id="related-posts-title">Related Posts</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map(relatedPost => (
                <article key={relatedPost.slug} className={styles.relatedCard}>
                  {relatedPost.category ? (
                    <p>
                      <Link
                        to={getArchivePath(
                          "categories",
                          relatedPost.category
                        )}
                      >
                        {relatedPost.category}
                      </Link>
                    </p>
                  ) : null}
                  <h3>
                    <Link to={relatedPost.slug}>{relatedPost.title}</Link>
                  </h3>
                  {relatedPost.description ? (
                    <p>{relatedPost.description}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <div className={styles.articleFooter}>
          <Link to="/blog" className={styles.backLink}>
            &larr; Back to Blog
          </Link>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query BlogPostById($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        dateTime: date(formatString: "YYYY-MM-DD")
        description
        slug
        tags
        category
        published
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 1200
              quality: 85
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`

export const Head = ({ data, location }) => {
  const { title, description, cover, dateTime, category, tags } =
    data.mdx.frontmatter

  return (
    <Seo
      title={title}
      description={description}
      pathname={location.pathname}
      image={cover?.publicURL}
      article
      date={dateTime}
      category={category}
      tags={tags || []}
    />
  )
}
