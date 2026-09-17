import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SiteHeader from "../components/site-header"

const projects = [
  {
    name: "qLog",
    status: "work in progress",
    description:
      "A local-first iOS reading queue for saving articles, reflecting with on-device quizzes and takeaways, and keeping notes.",
    launchUrl: "https://qlog.mohitc.com",
    testFlightInvite: true,
  },
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
              {project.status && (
                <span className="project-status">{project.status}</span>
              )}
            </h2>
            <p>
              {project.description}
              {project.testFlightInvite && (
                <span className="project-invite">
                  <a href="mailto:mhchauhan3@gmail.com?subject=qLog%20TestFlight%20invite">
                    Hit me up
                  </a>{" "}
                  for a TestFlight invite!
                </span>
              )}
            </p>
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
    description="Selected projects, including qLog, an iOS reading queue, VibeCheck, a collaborative music loop builder, and PyPoller, a modular polling toolkit."
  />
)

export default ProjectsPage
