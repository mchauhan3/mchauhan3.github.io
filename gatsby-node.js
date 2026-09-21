const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const blogPost = path.resolve(`./src/templates/blog-post.js`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes { id fields { slug } }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes
  posts.forEach((post, index) => {
    createPage({
      path: `/blog${post.fields.slug}`,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId: index === 0 ? null : posts[index - 1].id,
        nextPostId: index === posts.length - 1 ? null : posts[index + 1].id,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    actions.createNodeField({
      name: `slug`,
      node,
      value: createFilePath({ node, getNode }),
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      github: String
      linkedin: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
