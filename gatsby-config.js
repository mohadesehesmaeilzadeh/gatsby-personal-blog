const siteUrl =
  process.env.SITE_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  "http://localhost:8000"

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Mohadeseh Esmaeilzadeh | Frontend Developer",
    description:
      "Frontend development notes, projects, and practical lessons from Mohadeseh Esmaeilzadeh.",
    author: "Mohadeseh Esmaeilzadeh",
    siteUrl,
    language: "en",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog`,
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/404", "/404/", "/404.html"],
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                author
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            title: "Mohadeseh Esmaeilzadeh | Frontend Development RSS Feed",
            output: "/rss.xml",
            match: "^/blog/",
            query: `
              {
                allMdx(
                  filter: { frontmatter: { published: { eq: true } } }
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    excerpt
                    frontmatter {
                      title
                      slug
                      date
                      description
                      tags
                      category
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.nodes.map(node => {
                const postPath = node.frontmatter.slug.endsWith("/")
                  ? node.frontmatter.slug
                  : `${node.frontmatter.slug}/`
                const postUrl = new URL(
                  postPath,
                  site.siteMetadata.siteUrl
                ).toString()
                const categories = [...new Set([
                  ...(node.frontmatter.tags || []),
                  ...(node.frontmatter.category
                    ? [node.frontmatter.category]
                    : []),
                ])]

                return {
                  title: node.frontmatter.title,
                  description:
                    node.frontmatter.description || node.excerpt,
                  date: node.frontmatter.date,
                  url: postUrl,
                  guid: postUrl,
                  categories,
                  author: site.siteMetadata.author,
                }
              }),
          },
        ],
      },
    },
  ],
}
