import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./ArticleCard.module.css"

const ArticleCard = ({ title, date, description, slug, image }) => {
  const coverImage = getImage(image)

  return (
    <article className={styles.card}>
      {coverImage ? (
        <GatsbyImage
          image={coverImage}
          alt={`${title} cover`}
          className={styles.cover}
        />
      ) : null}

      <div className={styles.content}>
        <p className={styles.date}>{date}</p>
        <h2>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Link to={slug} className={styles.link}>
          Read Article
        </Link>
      </div>
    </article>
  )
}

export default ArticleCard
