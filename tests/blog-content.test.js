const test = require("node:test")
const assert = require("node:assert/strict")

const {
  filterArticles,
  getArchiveGroups,
  getPostNavigation,
  getRelatedPosts,
  getSearchState,
} = require("../src/utils/blog-content")

const posts = [
  {
    id: "one",
    frontmatter: {
      title: "Getting started with Gatsby",
      slug: "/gatsby-start/",
      description: "Build a fast personal site.",
      tags: ["Gatsby", "React"],
      category: "Frontend",
    },
  },
  {
    id: "two",
    frontmatter: {
      title: "Accessible React forms",
      slug: "/accessible-forms/",
      description: "Labels, errors, and keyboard interaction.",
      tags: ["React", "Accessibility"],
      category: "Frontend",
    },
  },
  {
    id: "three",
    frontmatter: {
      title: "CSS layout notes",
      slug: "/css-layout/",
      description: "Practical Grid patterns.",
      tags: ["CSS"],
      category: "Design",
    },
  },
  {
    id: "four",
    frontmatter: {
      title: "React and Gatsby together",
      slug: "/react-gatsby/",
      description: "A framework comparison.",
      tags: ["react", "gatsby"],
      category: "Tools",
    },
  },
  {
    id: "five",
    frontmatter: {
      title: "Frontend workflow",
      slug: "/frontend-workflow/",
      description: "Small improvements for daily work.",
      tags: [],
      category: "Frontend",
    },
  },
]

test("search matches title, description, tag, and category", () => {
  assert.deepEqual(filterArticles(posts, "forms").map(post => post.id), ["two"])
  assert.deepEqual(filterArticles(posts, "keyboard").map(post => post.id), ["two"])
  assert.deepEqual(filterArticles(posts, "css").map(post => post.id), ["three"])
  assert.deepEqual(filterArticles(posts, "design").map(post => post.id), ["three"])
})

test("search is case-insensitive and ignores surrounding whitespace", () => {
  assert.deepEqual(filterArticles(posts, "  GATSBY ").map(post => post.id), [
    "one",
    "four",
  ])
})

test("search state reports results and a useful summary", () => {
  const state = getSearchState(posts, "React")

  assert.equal(state.hasSearch, true)
  assert.equal(state.hasResults, true)
  assert.equal(state.summary, "3 results for “React”")
})

test("search state reports an empty result without dropping the query", () => {
  const state = getSearchState(posts, "Vue")

  assert.deepEqual(state.articles, [])
  assert.equal(state.hasResults, false)
  assert.equal(state.summary, "0 results for “Vue”")
})

test("blank search returns every published article", () => {
  const state = getSearchState(posts, "  ")

  assert.equal(state.articles, posts)
  assert.equal(state.hasSearch, false)
  assert.equal(state.summary, "5 published articles")
})

test("tag archives group posts case-insensitively", () => {
  const groups = getArchiveGroups(posts, "tags")
  const react = groups.find(group => group.value === "React")

  assert.deepEqual(react.postIds, ["one", "two", "four"])
  assert.equal(groups.filter(group => group.value.toLowerCase() === "react").length, 1)
})

test("category archives contain only matching posts", () => {
  const groups = getArchiveGroups(posts, "category")
  const frontend = groups.find(group => group.value === "Frontend")

  assert.deepEqual(frontend.postIds, ["one", "two", "five"])
})

test("post navigation returns adjacent posts and safe edge values", () => {
  assert.deepEqual(getPostNavigation(posts, 1), {
    previousPost: { title: "Getting started with Gatsby", slug: "/gatsby-start/" },
    nextPost: { title: "CSS layout notes", slug: "/css-layout/" },
  })
  assert.equal(getPostNavigation(posts, 0).previousPost, null)
  assert.equal(getPostNavigation(posts, posts.length - 1).nextPost, null)
})

test("related posts prioritize shared tags and exclude the current post", () => {
  const related = getRelatedPosts(posts[0], posts)

  assert.deepEqual(related.map(post => post.slug), [
    "/react-gatsby/",
    "/accessible-forms/",
    "/frontend-workflow/",
  ])
  assert.equal(related.some(post => post.slug === posts[0].frontmatter.slug), false)
})

test("related posts are hidden when no tag or category matches", () => {
  const isolatedPost = {
    id: "isolated",
    frontmatter: {
      title: "A unique post",
      slug: "/unique/",
      tags: ["Unique"],
      category: "Other",
    },
  }

  assert.deepEqual(getRelatedPosts(isolatedPost, posts), [])
})
