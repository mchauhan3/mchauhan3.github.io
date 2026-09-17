import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SiteHeader from "../components/site-header"

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

const ProjectsPage = () => {
  return (
    <Layout>
      <SiteHeader current="projects" />
      <header className="page-intro">
        <h1 className="main-heading">Projects</h1>
        <p>
          A living list of things I am building and maintaining. Reach out if
          you want a deeper dive or have feedback.
        </p>
      </header>
      <section className="project-list" aria-label="Projects">
        {projects.map(project => (
          <article className="project-list-item" key={project.name}>
            <h2>
              <a href={project.launchUrl}>{project.name}</a>
            </h2>
            <p>{project.description}</p>
            <a className="project-link" href={project.launchUrl}>
              view project <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </section>
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
