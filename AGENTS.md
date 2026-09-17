# AGENTS.md

## Project overview

This repository contains Mohit Chauhan's personal website, built with Gatsby 5 and React 18. It includes a homepage, projects page, Markdown-powered blog, and a Typst resume that is published as a static PDF.

## Repository map

- `src/pages/`: Gatsby page components. File paths determine page routes.
- `src/components/`: Shared React components, including layouts and SEO metadata.
- `src/templates/blog-post.js`: Template and GraphQL query for individual blog posts.
- `content/blog/`: Blog posts. Each post lives in its own directory as `index.md`.
- `src/style.css`: Site-wide styles and design tokens.
- `src/normalize.css`: Browser normalization styles; avoid changing it for site-specific styling.
- `gatsby-config.js`: Site metadata, plugins, Markdown processing, RSS, and manifest configuration.
- `gatsby-node.js`: Blog slug generation and page creation.
- `static/`: Files copied directly into the generated site.
- `resume/resume.typ`: Source of truth for the resume.
- `resume/out/`: Generated resume output.

## Setup and commands

Use the npm version represented by `package-lock.json` and install dependencies with `npm ci`.

- `npm run develop`: Start the Gatsby development server at `http://localhost:8000`.
- `npm run build`: Create a production build in `public/`.
- `npm run serve`: Serve the production build locally.
- `npm run clean`: Clear Gatsby's generated cache and build artifacts.
- `npm run format`: Format supported JavaScript, TypeScript, JSON, and Markdown files with Prettier.
- `npm run resume:build`: Compile `resume/resume.typ` into a dated `resume/out/Resume_MohitChauhan_YYYY-MM-DD.pdf`.
- `npm run resume:publish`: Build the resume, copy the dated PDF into `static/`, and refresh the stable `static/resume.pdf` alias used by the site.
- `npm run deploy`: Build and publish `public/` to the `master` branch with `gh-pages`. Run this only when explicitly asked to deploy.

There are currently no automated test or lint scripts. Use `npm run build` as the primary validation because it checks Gatsby compilation, GraphQL queries, and static page generation.

## Implementation conventions

- Follow the existing JavaScript and JSX style: functional React components, double quotes, no semicolons, and trailing commas where Prettier adds them.
- Use Gatsby's `Link` for internal navigation and normal `<a>` elements for external URLs.
- Give every page a `Head` export that renders the shared `Seo` component.
- Keep shared metadata in `gatsby-config.js`; do not duplicate it in page components without a page-specific reason.
- Prefer reusable classes and variables in `src/style.css` for repeated styling. Small, one-off styles may remain inline when that matches nearby code.
- Preserve accessibility basics: semantic landmarks, useful link text, descriptive image alt text, and logical heading levels.
- Keep changes focused. Do not replace the site's deliberately minimal visual style or add dependencies unless the task requires it.

## Blog posts

Create posts under `content/blog/<slug>/index.md` with this frontmatter:

```md
---
title: Post title
date: "YYYY-MM-DD"
description: "A short summary used in listings, metadata, and the RSS feed."
---
```

Gatsby derives the slug from the directory name and publishes the post at `/blog/<slug>/`. Images referenced by a post should live alongside its `index.md` when they are specific to that post.

## Resume workflow

Edit `resume/resume.typ`, not the generated PDFs. After resume changes, run `npm run resume:publish` so the dated PDF in `resume/out/`, its public dated copy, and `static/resume.pdf` stay synchronized. Commit all generated PDF copies when the resume source changes.

## Validation checklist

Before handing off a change:

1. Run Prettier on files you changed, or run `npm run format` if formatting the whole repository is intended.
2. Run `npm run build`.
3. Check the affected page at narrow and wide viewport sizes for visual changes.
4. Confirm internal links, external links, page metadata, and blog routes relevant to the change.
5. If the resume changed, run `npm run resume:publish` and verify that both PDF copies were updated.

Do not commit generated Gatsby directories such as `.cache/` or `public/`, and never deploy unless the user explicitly requests it.
