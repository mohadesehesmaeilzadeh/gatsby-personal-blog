const path = require("path")
const {
  getArchiveGroups,
  getArchivePath,
  getPostNavigation,
  getRelatedPosts,
} = require("./src/utils/blog-content")

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MdxFrontmatter @dontInfer {
      title: String!
      slug: String!
      date: Date @dateformat
      description: String
      tags: [String!]
      category: String
      cover: File @fileByRelativePath
      published: Boolean
    }
  `)
}

const createArchivePages = ({
  posts,
  field,
  pathSegment,
  archiveType,
  component,
  createPage,
}) => {
  getArchiveGroups(posts, field).forEach(({ value, postIds }) => {
    createPage({
      path: getArchivePath(pathSegment, value),
      component,
      context: {
        archiveType,
        archiveValue: value,
        postIds,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query BlogPostRoutesQuery {
      allMdx(
        filter: { frontmatter: { published: { eq: true } } }
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          id
          frontmatter {
            title
            slug
            description
            tags
            category
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX posts", result.errors)
    return
  }

  const blogPostTemplate = path.resolve("./src/templates/blog-post.js")
  const archiveTemplate = path.resolve("./src/templates/archive.js")

  const posts = result.data.allMdx.nodes

  posts.forEach((node, index) => {
    if (!node.frontmatter.slug) {
      reporter.warn(`Skipping MDX post without a slug: ${node.id}`)
      return
    }

    const { previousPost, nextPost } = getPostNavigation(posts, index)

    createPage({
      path: node.frontmatter.slug,
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        previousPost,
        nextPost,
        relatedPosts: getRelatedPosts(node, posts),
      },
    })
  })

  createArchivePages({
    posts,
    field: "tags",
    pathSegment: "tags",
    archiveType: "Tag",
    component: archiveTemplate,
    createPage,
  })

  createArchivePages({
    posts,
    field: "category",
    pathSegment: "categories",
    archiveType: "Category",
    component: archiveTemplate,
    createPage,
  })
}
