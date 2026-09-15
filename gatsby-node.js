const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query BlogPostRoutesQuery {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
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

  result.data.allMdx.nodes.forEach(node => {
    if (!node.frontmatter.slug) {
      reporter.warn(`Skipping MDX post without a slug: ${node.id}`)
      return
    }

    createPage({
      path: node.frontmatter.slug,
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    })
  })
}
