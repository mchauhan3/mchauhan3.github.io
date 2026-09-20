/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })

  setHeadComponents([
    React.createElement("script", {
      key: "umami-analytics",
      defer: true,
      src: "https://analytics.mohitc.com/script.js",
      "data-website-id": "f5c51a68-19d3-4c6f-8b44-8a9716c64c1b",
      "data-domains": "mohitc.com,www.mohitc.com",
    }),
  ])
}
