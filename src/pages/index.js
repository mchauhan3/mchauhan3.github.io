import * as React from "react"
import { Link } from "gatsby"
// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 30,
}
const headingAccentStyles = {
  color: "#999999",
}
const listItemStyles = {
  fontWeight: "300",
  fontSize: "24px",
  maxWidth: "560px",
}

const linkStyle = {
  color: "#000000",
  fontWeight: "bold",
  fontSize: "16px",
  verticalAlign: "5%",
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
    <main style={pageStyles}>
      <title>Mohit Chauhan's Personal Website</title>
      <h1 style={headingStyles}>
        Mohit Chauhan
        <br />
        <div style={headingAccentStyles}>Software Developer II, Amazon</div>
      </h1>
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
    </main>
  )
}

export default IndexPage
