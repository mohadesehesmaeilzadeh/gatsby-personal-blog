import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import blogContent from "../../utils/blog-content"
import * as styles from "./ArticleCard.module.css"

const { getArchivePath } = blogContent

const ArticleCard = ({
  title,
  date,
  description,
  slug,
  image,
  tags,
  category,
  headingLevel = 2,
}) => {
  const coverImage = getImage(image)
  const postTags = tags || []
  const Title = `h${headingLevel}`

  return (
    <article className={styles.card}>
      {coverImage ? (
        <GatsbyImage
          image={coverImage}
          alt=""
          className={styles.cover}
          loading="lazy"
        />
      ) : null}

      <div className={styles.content}>
        {date || category ? (
          <div className={styles.meta}>
            {date ? <p>{date}</p> : null}
            {category ? (
              <Link to={getArchivePath("categories", category)}>
                {category}
              </Link>
            ) : null}
          </div>
        ) : null}
        <Title className={styles.title}>
          <Link to={slug}>{title}</Link>
        </Title>
        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
        {postTags.length > 0 ? (
          <ul className={styles.tags} aria-label={`Tags for ${title}`}>
            {postTags.map(tag => (
              <li key={tag}>
                <Link to={getArchivePath("tags", tag)}>{tag}</Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Link to={slug} className={styles.link}>
          Read article <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  )
}

export default React.memo(ArticleCard)
