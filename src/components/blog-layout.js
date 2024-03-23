import * as React from "react"
import { Link } from "gatsby"
import Layout from "./layout"

const BlogLayout = ({ location, title, children }) => {
  const blogPath = `${__PATH_PREFIX__}/blog/`
  const isBlogPath = location.pathname === blogPath

  let header

  if (isBlogPath) {
    header = <h1 className="main-heading">{title}</h1>
  } else {
    header = (
      <Link className="header-link-home" to="/blog">
        {title}
      </Link>
    )
  }

  return (
    <Layout location={location} title={title}>
      <header className="global-header">{header}</header>
      {children}
    </Layout>
  )
}

export default BlogLayout
