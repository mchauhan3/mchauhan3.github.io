import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const projects = [
  {
    name: "VibeCheck",
    description:
      "Collaborative music loop builder where visitors take turns shaping a shared four-bar progression with live updates.",
    launchUrl: "https://vibecheck.mohitc.com",
  },
  {
    name: "PyPoller",
    description:
      "Python toolkit for polling external resources on a schedule and triggering pluggable notifications when they change.",
    launchUrl: "https://www.mohitc.com/pypoller/docs/",
  },
]

const cardStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "1.5rem",
  marginBottom: "1.5rem",
  backgroundColor: "#ffffff",
  boxShadow: "0 12px 25px rgba(15, 23, 42, 0.05)",
}

const ProjectsPage = () => {
  return (
    <Layout>
      <header className="global-header">
        <h1 className="main-heading">Projects</h1>
        <p>
          A living list of things I am building and maintaining. Reach out if
          you want a deeper dive or have feedback.
        </p>
      </header>
      <section>
        {projects.map(project => (
          <article key={project.name} style={cardStyle}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>
              <a href={project.launchUrl}>Launch</a>
            </p>
          </article>
        ))}
      </section>
      <div className="post-footer-nav">
        <Link className="home-link" to="/">
          home
        </Link>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Projects"
    description="Selected projects, including VibeCheck, a collaborative music loop builder, and PyPoller, a modular polling + notification toolkit."
  />
)

export default ProjectsPage
