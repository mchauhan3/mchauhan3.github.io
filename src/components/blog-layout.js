import * as React from "react"
import Layout from "./layout"
import SiteHeader from "./site-header"

const BlogLayout = ({ children }) => {
  return (
    <Layout>
      <SiteHeader current="blog" />
      {children}
    </Layout>
  )
}

export default BlogLayout
