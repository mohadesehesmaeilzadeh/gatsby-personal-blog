const test = require("node:test")
const assert = require("node:assert/strict")

const { getAbsoluteUrl, resolveSeoMetadata } = require("../src/utils/seo")

const siteMetadata = {
  title: "Frontend Notes",
  author: "Mohadeseh Esmaeilzadeh",
  description: "Practical frontend development articles.",
  siteUrl: "https://example.com",
}

test("homepage SEO uses site-level title and description fallbacks", () => {
  assert.deepEqual(resolveSeoMetadata({ siteMetadata }), {
    title: "Frontend Notes",
    description: "Practical frontend development articles.",
    canonicalUrl: "https://example.com/",
    imageUrl: undefined,
  })
})

test("post SEO uses post metadata and resolves its cover URL", () => {
  assert.deepEqual(
    resolveSeoMetadata({
      siteMetadata,
      title: "Testing Gatsby",
      description: "A focused testing guide.",
      pathname: "/testing-gatsby/",
      image: "/covers/testing.png",
    }),
    {
      title: "Testing Gatsby | Mohadeseh Esmaeilzadeh",
      description: "A focused testing guide.",
      canonicalUrl: "https://example.com/testing-gatsby/",
      imageUrl: "https://example.com/covers/testing.png",
    }
  )
})

test("missing post description falls back without requiring a cover", () => {
  const metadata = resolveSeoMetadata({
    siteMetadata,
    title: "Post without optional metadata",
    pathname: "/minimal-post/",
  })

  assert.equal(metadata.description, siteMetadata.description)
  assert.equal(metadata.imageUrl, undefined)
})

test("absolute social image URLs remain unchanged", () => {
  assert.equal(
    getAbsoluteUrl("https://cdn.example.com/cover.png", siteMetadata.siteUrl),
    "https://cdn.example.com/cover.png"
  )
})
