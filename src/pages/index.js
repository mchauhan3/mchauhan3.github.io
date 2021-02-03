import * as React from "react"

// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
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
    url: "https://github.com/mchauhan3"
  },
  {
    text: "music",
    url: "https://soundcloud.com/mohit-chauhan-19"
  },
  {
    text: "writing",
    url: ""
  },
  {
    text: "linkedin",
    url: "https://www.linkedin.com/in/mohit-chauhan/"
  },
  {
    text: "email",
    url: "mailto:mhchauhan3@gmail.com"
  }
]

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Mohit Chauhan
        <br />
        Software Engineer at Alexa AI
      </h1>
      {links.map(link => (
          <span style={listItemStyles}>
            <a
              style={linkStyle}
              href={`${link.url}`}
            >
              {link.text}
            </a>
            <br></br>
          </span>
      ))}
    </main>
  )
}

export default IndexPage
