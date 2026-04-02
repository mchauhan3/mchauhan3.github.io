# Resume Pipeline

The resume source of truth lives in `resume/resume.typ`.

Build commands:

- `npm run resume:build` compiles the PDF to `resume/out/Resume Single Column.pdf`
- `npm run resume:copy` copies the generated PDF into `static/Resume Single Column.pdf`
- `npm run resume:publish` runs both steps

If you install the `typst` CLI globally, you can also run:

- `npx typst compile resume/resume.typ resume/out/Resume Single Column.pdf`
