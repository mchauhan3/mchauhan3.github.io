import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({
  description,
  title,
  pathname = "/",
  article = false,
  datePublished,
  noindex = false,
  children,
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author {
            name
          }
          social {
            github
            linkedin
          }
        }
      }
    }
  `)

  const metadata = site.siteMetadata
  const metaDescription = description || metadata.description
  const canonicalUrl = new URL(pathname, metadata.siteUrl).toString()
  const fullTitle = title ? `${title} | ${metadata.title}` : metadata.title

  const structuredData = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: metaDescription,
        datePublished,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: {
          "@type": "Person",
          name: metadata.author.name,
          url: metadata.siteUrl,
        },
      }
    : pathname === "/"
      ? {
          "@context": "https://schema.org",
          "@type": "Person",
          name: metadata.author.name,
          url: metadata.siteUrl,
          jobTitle: "Software Engineer",
          sameAs: [
            `https://github.com/${metadata.social.github}`,
            metadata.social.linkedin,
          ],
          knowsAbout: [
            "Databases",
            "Distributed Systems",
            "Infrastructure",
            "Developer Tools",
          ],
        }
      : null

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {!noindex && <link rel="canonical" href={canonicalUrl} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? "article" : "website"} />
      {!noindex && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={metadata.title} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      {children}
    </>
  )
}

export default Seo
