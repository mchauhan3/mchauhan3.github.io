import * as React from "react"
import { Link } from "gatsby"

const SiteHeader = ({ current }) => {
  return (
    <header className="site-header">
      <Link className="site-title" to="/">
        Mohit Chauhan
      </Link>
      <nav className="site-nav" aria-label="Site navigation">
        <Link
          to="/projects/"
          aria-current={current === "projects" ? "page" : undefined}
        >
          projects
        </Link>
        <Link
          to="/blog/"
          aria-current={current === "blog" ? "page" : undefined}
        >
          blog
        </Link>
      </nav>
    </header>
  )
}

export default SiteHeader
