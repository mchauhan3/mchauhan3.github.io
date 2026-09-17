import { copyFileSync, mkdirSync, readdirSync } from "node:fs"
import { basename, join } from "node:path"
import { spawnSync } from "node:child_process"

const root = process.cwd()
const source = join(root, "resume", "resume.typ")
const fontDirectory = join(root, "resume", "fonts")
const outputDirectory = join(root, "resume", "out")
const publicDirectory = join(root, "static")
const prefix = "Resume_MohitChauhan_"

const today = new Date()
const date = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-")

const filename = `${prefix}${date}.pdf`
const output = join(outputDirectory, filename)

const compile = watch => {
  mkdirSync(outputDirectory, { recursive: true })

  const result = spawnSync(
    "typst",
    [watch ? "watch" : "compile", "--font-path", fontDirectory, source, output],
    {
      stdio: "inherit",
    },
  )

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

const latestOutput = () => {
  const files = readdirSync(outputDirectory)
    .filter(file => file.startsWith(prefix) && file.endsWith(".pdf"))
    .sort()

  if (files.length === 0) {
    throw new Error(
      "No dated resume PDF found. Run npm run resume:build first.",
    )
  }

  return join(outputDirectory, files.at(-1))
}

const copy = input => {
  mkdirSync(publicDirectory, { recursive: true })
  const destination = join(publicDirectory, basename(input))
  const stableDestination = join(publicDirectory, "resume.pdf")
  copyFileSync(input, destination)
  copyFileSync(input, stableDestination)
  console.log(`Published ${destination}`)
  console.log(`Updated ${stableDestination}`)
}

const command = process.argv[2]

if (command === "build") {
  compile(false)
} else if (command === "watch") {
  compile(true)
} else if (command === "copy") {
  copy(latestOutput())
} else if (command === "publish") {
  compile(false)
  copy(output)
} else {
  console.error("Usage: node scripts/resume.mjs <build|watch|copy|publish>")
  process.exit(1)
}
