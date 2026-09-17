import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SiteHeader from "../components/site-header"

const NotFoundPage = () => {
  return (
    <Layout>
      <SiteHeader />
      <section className="page-intro not-found">
        <p className="eyebrow">404</p>
        <h1 className="main-heading">Page not found</h1>
        <p>
          We couldn’t find what you were looking for.{" "}
          <Link to="/">Go home</Link>.
        </p>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Page not found" />

export default NotFoundPage
