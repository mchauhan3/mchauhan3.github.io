import * as React from "react"
import { Link, graphql } from "gatsby"

import BlogLayout from "../components/blog-layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, markdownRemark: post },
}) => (
  <BlogLayout>
    <article className="blog-post" itemScope itemType="https://schema.org/Article">
      <header>
        <h1 itemProp="headline">{post.frontmatter.title}</h1>
        <p className="post-date">{post.frontmatter.date}</p>
      </header>
      <section
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
    </article>
    {(previous || next) && (
      <nav className="blog-post-nav" aria-label="More posts">
        <ul>
          <li>
            {previous && (
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    )}
  </BlogLayout>
)

export const Head = ({ data: { markdownRemark: post } }) => (
  <Seo
    title={post.frontmatter.title}
    description={post.frontmatter.description || post.excerpt}
    pathname={`/blog${post.fields.slug}`}
    article
    datePublished={post.frontmatter.dateISO}
  />
)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields { slug }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields { slug }
      frontmatter { title }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields { slug }
      frontmatter { title }
    }
  }
`
