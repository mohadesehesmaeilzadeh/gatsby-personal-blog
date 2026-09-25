const normalizeValue = value => String(value || "").trim().toLowerCase()

const slugifyArchiveValue = value =>
  normalizeValue(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const getArchivePath = (type, value) =>
  `/${type}/${slugifyArchiveValue(value)}/`

const filterArticles = (articles, searchTerm) => {
  const query = normalizeValue(searchTerm)

  if (!query) {
    return articles
  }

  return articles.filter(article => {
    const { title, description, tags, category } = article.frontmatter
    const searchableText = [title, description, category, ...(tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    return searchableText.includes(query)
  })
}

const getSearchState = (articles, searchTerm) => {
  const query = String(searchTerm || "").trim()
  const filteredArticles = filterArticles(articles, query)
  const hasSearch = query.length > 0

  return {
    articles: filteredArticles,
    hasSearch,
    hasResults: filteredArticles.length > 0,
    summary: hasSearch
      ? `${filteredArticles.length} result${
          filteredArticles.length === 1 ? "" : "s"
        } for “${query}”`
      : `${articles.length} published article${
          articles.length === 1 ? "" : "s"
        }`,
  }
}

const getArchiveGroups = (posts, field) => {
  const archives = new Map()

  posts.forEach(post => {
    const fieldValue = post.frontmatter[field]
    const values = Array.isArray(fieldValue) ? fieldValue : [fieldValue]

    values.filter(Boolean).forEach(value => {
      const key = value.toLowerCase()
      const archive = archives.get(key) || { value, postIds: [] }

      archive.postIds.push(post.id)
      archives.set(key, archive)
    })
  })

  return [...archives.values()]
}

const getPostNavigation = (posts, index) => {
  const toNavigationPost = post =>
    post
      ? {
          title: post.frontmatter.title,
          slug: post.frontmatter.slug,
        }
      : null

  return {
    previousPost: toNavigationPost(posts[index - 1]),
    nextPost: toNavigationPost(posts[index + 1]),
  }
}

const getRelatedPosts = (currentPost, posts) => {
  const currentTags = new Set(
    (currentPost.frontmatter.tags || []).map(tag => tag.toLowerCase())
  )
  const currentCategory = currentPost.frontmatter.category?.toLowerCase()

  return posts
    .filter(candidate => candidate.id !== currentPost.id)
    .map(candidate => {
      const sharedTagCount = (candidate.frontmatter.tags || []).filter(tag =>
        currentTags.has(tag.toLowerCase())
      ).length
      const categoryMatches = Boolean(
        currentCategory &&
          candidate.frontmatter.category?.toLowerCase() === currentCategory
      )

      return {
        post: candidate,
        score: sharedTagCount * 2 + (categoryMatches ? 1 : 0),
      }
    })
    .filter(candidate => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ post }) => ({
      title: post.frontmatter.title,
      slug: post.frontmatter.slug,
      description: post.frontmatter.description,
      category: post.frontmatter.category,
    }))
}

module.exports = {
  filterArticles,
  getArchiveGroups,
  getArchivePath,
  getPostNavigation,
  getRelatedPosts,
  getSearchState,
}
