/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Mohit Chauhan`,
    author: {
      name: `Mohit Chauhan`,
      summary: `who lives and works in Vancouver, building (hopefully) useful things.`,
    },
    description: `Mohit Chauhan is a software engineer in Vancouver interested in databases, distributed systems, infrastructure, and developer tools.`,
    siteUrl: `https://mohitc.com`,
    social: {
      github: `mchauhan3`,
      linkedin: `https://www.linkedin.com/in/mohit-chauhan/`,
    },
    blogTitle: `Blog`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 630 },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: { wrapperStyle: `margin-bottom: 1.0725rem` },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map(node =>
                Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                }),
              ),
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields { slug }
                  frontmatter { title date }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Mohit Chauhan's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mohit Chauhan's Personal Website`,
        short_name: `Mohit's Website`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
}
