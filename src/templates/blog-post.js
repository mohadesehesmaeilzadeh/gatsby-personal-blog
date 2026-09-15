import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/Layout/Layout"
import * as styles from "./blog-post.module.css"

const BlogPostTemplate = ({ data, children }) => {
  const post = data.mdx
  const { title, date, description, cover } = post.frontmatter
  const coverImage = getImage(cover)

  return (
    <Layout>
      <article className={styles.article}>
        <Link to="/blog" className={styles.backLink}>
          &larr; Back to Blog
        </Link>

        <header className={styles.header}>
          <h1>{title}</h1>
          <p className={styles.date}>{date}</p>
          <p className={styles.description}>{description}</p>
        </header>

        {coverImage ? (
          <GatsbyImage
            image={coverImage}
            alt={`Cover for ${title}`}
            className={styles.cover}
          />
        ) : null}

        <div className={styles.content}>{children}</div>

        <Link to="/blog" className={styles.backLink}>
          &larr; Back to Blog
        </Link>
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
        description
        slug
        cover {
          childImageSharp {
            gatsbyImageData(
              width: 900
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title} | Mohadeseh</title>
    <meta name="description" content={data.mdx.frontmatter.description} />
  </>
)
