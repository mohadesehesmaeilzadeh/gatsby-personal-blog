import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import seoUtils from "../../utils/seo"

const { resolveSeoMetadata } = seoUtils

const Seo = ({
  title,
  description,
  pathname,
  image,
  article = false,
  date,
  category,
  tags = [],
  noIndex = false,
}) => {
  const { site } = useStaticQuery(graphql`
    query SeoSiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          language
        }
      }
    }
  `)
  const metadata = resolveSeoMetadata({
    siteMetadata: site.siteMetadata,
    title,
    description,
    pathname,
    image,
  })
  const cardType = metadata.imageUrl ? "summary_large_image" : "summary"

  return (
    <>
      <html lang={site.siteMetadata.language || "en"} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={metadata.canonicalUrl} />

      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={metadata.canonicalUrl} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={cardType} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />

      {metadata.imageUrl ? (
        <>
          <meta property="og:image" content={metadata.imageUrl} />
          <meta name="twitter:image" content={metadata.imageUrl} />
        </>
      ) : null}

      {article && date ? (
        <meta property="article:published_time" content={date} />
      ) : null}
      {article && category ? (
        <meta property="article:section" content={category} />
      ) : null}
      {article
        ? tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))
        : null}
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
    </>
  )
}

export default Seo
