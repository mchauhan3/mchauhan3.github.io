import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SiteHeader from "../components/site-header"

const projects = [
  {
    name: "qLog",
    featured: true,
    description:
      "A local-first iOS reading queue for saving articles, reflecting with on-device quizzes and takeaways, and keeping notes.",
    launchUrl: "https://qlog.mohitc.com",
    inviteUrl: "mailto:mhchauhan3@gmail.com?subject=qLog%20TestFlight%20invite",
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
  const featuredProject = projects.find(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <Layout>
      <SiteHeader current="projects" />
      <header className="page-intro">
        <h1 className="main-heading">Projects</h1>
        <p>
          Selected work, experiments, and tools. Reach out if you want a deeper
          dive or have feedback.
        </p>
      </header>
      <section
        className="featured-project"
        aria-labelledby="featured-project-title"
      >
        <div className="featured-project-heading">
          <div>
            <p className="eyebrow">Currently building</p>
            <h2 id="featured-project-title">
              <a href={featuredProject.launchUrl}>{featuredProject.name}</a>
            </h2>
          </div>
        </div>
        <p>{featuredProject.description}</p>
        <div className="project-actions">
          <a href={featuredProject.launchUrl}>
            view project <span aria-hidden="true">↗</span>
          </a>
          <a href={featuredProject.inviteUrl}>request a TestFlight invite →</a>
        </div>
      </section>

      <section className="project-archive" aria-labelledby="other-work-title">
        <h2 className="section-label" id="other-work-title">
          Other work
        </h2>
        <div className="project-list">
          {otherProjects.map(project => (
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
        </div>
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
