#!/usr/bin/env node

import { createHash } from "node:crypto"
import { readFile, readdir, writeFile } from "node:fs/promises"
import { basename, extname, join, resolve } from "node:path"

const args = process.argv.slice(2)
const valueFor = flag => {
  const index = args.indexOf(flag)
  return index === -1 ? undefined : args[index + 1]
}
const project = resolve(valueFor("--project") || process.cwd())
const sourcePath = valueFor("--sources")
const brandDir = join(project, "public", "brand")
const output = resolve(project, valueFor("--output") || "brand-assets.json")
const sources = sourcePath ? JSON.parse(await readFile(resolve(sourcePath), "utf8")) : {}
const inferUse = filename => {
  if (/logo/i.test(filename)) return "logo"
  if (/favicon/i.test(filename)) return "favicon"
  if (/apple/i.test(filename)) return "apple-touch-icon"
  if (/social|share|open.?graph/i.test(filename)) return "social-preview"
  if (/truck|van|vehicle/i.test(filename)) return "truck-photo"
  if (/team|staff|employee/i.test(filename)) return "team-photo"
  return "website-photo"
}

let filenames
try {
  filenames = (await readdir(brandDir)).filter(name => !name.startsWith("."))
} catch {
  console.error(`No brand directory found at ${brandDir}`)
  process.exit(1)
}

const assets = []
for (const filename of filenames.sort()) {
  const buffer = await readFile(join(brandDir, filename))
  const supplied = sources[filename] || {}
  assets.push({
    filename,
    publicPath: `/brand/${filename}`,
    extension: extname(filename).slice(1).toLowerCase(),
    bytes: buffer.length,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    use: supplied.use || inferUse(filename),
    sourceUrl: supplied.sourceUrl || null,
    retrievedAt: supplied.retrievedAt || null,
    originalFilename: supplied.originalFilename || basename(filename),
    notes: supplied.notes || "",
  })
}

const missingProvenance = assets.filter(asset => !asset.sourceUrl || !asset.retrievedAt)
await writeFile(output, JSON.stringify({ generatedAt: new Date().toISOString(), assets }, null, 2) + "\n")
console.log(`Wrote ${assets.length} assets to ${output}`)
if (missingProvenance.length) {
  console.error(`Missing sourceUrl/retrievedAt for: ${missingProvenance.map(asset => asset.filename).join(", ")}`)
  process.exitCode = 1
}
