import * as React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"

// styles

const headingAccentStyles = {
  color: "#999999",
}
const listItemStyles = {
  fontSize: "24px"
}

const linkStyle = {
  color: "#000000",
  fontWeight: "bold",
  fontSize: "16px",
}

// data
const links = [
  {
    text: "code",
    url: "https://github.com/mchauhan3",
  },
  {
    text: "music",
    url: "https://soundcloud.com/mohit-chauhan-19",
  },
  {
    text: "linkedin",
    url: "https://www.linkedin.com/in/mohit-chauhan/",
  },
  {
    text: "email",
    url: "mailto:mhchauhan3@gmail.com",
  },
]

// markup
const IndexPage = () => {
  return (
    <Layout>
      <header className="global-header">
      <h1 className="main-heading">
        Mohit Chauhan
        <br />
        <div style={headingAccentStyles}>Software Developer II, Amazon</div>
      </h1>
      </header>
      {links.map(link => (
        <span style={listItemStyles}>
          <a style={linkStyle} href={`${link.url}`}>
            {link.text}
          </a>
          <br></br>
        </span>
      ))}
      <span style={listItemStyles}>
        <Link style={linkStyle} to="/blog/">
          blog
        </Link>
        <br></br>
      </span>
    </Layout>
  )
}

export const Head = () => <Seo title="Homepage" />

export default IndexPage
