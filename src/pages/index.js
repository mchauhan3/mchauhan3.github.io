import * as React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"

const links = [
  { text: "projects", url: "/projects/", internal: true },
  { text: "blog", url: "/blog/", internal: true },
  { text: "resume", url: "/resume.pdf" },
  { text: "code", url: "https://github.com/mchauhan3" },
  { text: "music", url: "https://soundcloud.com/mohit-chauhan-19" },
  { text: "linkedin", url: "https://www.linkedin.com/in/mohit-chauhan/" },
  { text: "email", url: "mailto:mhchauhan3@gmail.com" },
]

const IndexPage = () => (
  <Layout>
    <header className="global-header home-header">
      <h1 className="main-heading">Mohit Chauhan</h1>
      <p className="home-role">engineering @ p-1.ai</p>
      <p className="home-intro">
        I’m a software engineer based in Vancouver, interested in databases
        and distributed systems, with a focus on making the hard parts feel
        simple.
      </p>
    </header>
    <nav className="home-nav" aria-label="Primary navigation">
      {links.map(link =>
        link.internal ? (
          <Link key={link.text} to={link.url}>{link.text}</Link>
        ) : (
          <a key={link.text} href={link.url}>{link.text}</a>
        ),
      )}
    </nav>
  </Layout>
)

export const Head = () => (
  <Seo
    description="Mohit Chauhan is a software engineer in Vancouver interested in databases, distributed systems, infrastructure, and developer tools."
    pathname="/"
  />
)

export default IndexPage
