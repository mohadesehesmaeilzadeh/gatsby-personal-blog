const getAbsoluteUrl = (value, siteUrl) => {
  if (!value) return undefined

  try {
    return new URL(value, siteUrl).toString()
  } catch {
    return value
  }
}

const resolveSeoMetadata = ({
  siteMetadata,
  title,
  description,
  pathname = "/",
  image,
}) => {
  const resolvedDescription = description || siteMetadata.description

  return {
    title: title ? `${title} | ${siteMetadata.author}` : siteMetadata.title,
    description: resolvedDescription,
    canonicalUrl: getAbsoluteUrl(pathname, siteMetadata.siteUrl),
    imageUrl: getAbsoluteUrl(image, siteMetadata.siteUrl),
  }
}

module.exports = {
  getAbsoluteUrl,
  resolveSeoMetadata,
}
