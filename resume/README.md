# Resume Pipeline

The resume source of truth lives in `resume/resume.typ`.

The Fira Sans and Noto Sans files in `resume/fonts/` are part of the build so
the resume renders consistently across machines. Their licenses are included
alongside the font files.

Build commands:

- `npm run resume:build` compiles a dated PDF to `resume/out/Resume_MohitChauhan_YYYY-MM-DD.pdf`
- `npm run resume:copy` copies the latest dated output into `static/` and refreshes `static/resume.pdf`
- `npm run resume:publish` builds and publishes today's dated PDF plus the stable `resume.pdf` alias
- `npm run resume:watch` watches the Typst source and writes to today's dated output

If you install the `typst` CLI globally, you can also run:

- `npx typst compile resume/resume.typ resume/out/Resume_MohitChauhan_YYYY-MM-DD.pdf`

The website links to `/resume.pdf`, while the dated file remains available as an archival artifact.
