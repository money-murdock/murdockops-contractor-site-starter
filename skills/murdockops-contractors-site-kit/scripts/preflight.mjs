#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises"
import { extname, join, relative, resolve } from "node:path"

const args = process.argv.slice(2)
const valueFor = flag => {
  const index = args.indexOf(flag)
  return index === -1 ? undefined : args[index + 1]
}

const project = resolve(valueFor("--project") || process.cwd())
const mode = valueFor("--mode") || "client"
const productionUrl = valueFor("--url")?.replace(/\/$/, "")

if (!new Set(["template", "client"]).has(mode)) {
  console.error("Use --mode template or --mode client.")
  process.exit(2)
}

const failures = []
const warnings = []
const passes = []
const fail = message => failures.push(message)
const warn = message => warnings.push(message)
const pass = message => passes.push(message)

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function text(path) {
  return readFile(path, "utf8")
}

function extractString(source, key) {
  return source.match(new RegExp(`${key}\\s*:\\s*[\"']([^\"']*)[\"']`))?.[1]
}

function extractBrandAssets(source) {
  const block = source.match(/brandAssets\s*:\s*\{([\s\S]*?)\n\s*\}/)?.[1] || ""
  return Object.fromEntries(
    ["logo", "favicon", "appleTouchIcon", "socialPhoto", "truckPhoto", "socialImage"]
      .map(key => [key, extractString(block, key)])
      .filter(([, value]) => value),
  )
}

async function walk(directory) {
  if (!(await exists(directory))) return []
  const output = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", ".next", "node_modules"].includes(entry.name)) continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) output.push(...await walk(path))
    else output.push(path)
  }
  return output
}

async function dimensions(path) {
  const buffer = await readFile(path)
  if (buffer.length >= 24 && buffer.subarray(1, 4).toString() === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue }
      const marker = buffer[offset + 1]
      const length = buffer.readUInt16BE(offset + 2)
      if (new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]).has(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) }
      }
      if (length < 2) break
      offset += 2 + length
    }
  }
  return null
}

async function checkAsset(name, publicPath, rule) {
  if (!publicPath) return fail(`Missing business.brandAssets.${name}.`)
  const localPath = join(project, "public", publicPath.replace(/^\//, ""))
  if (!(await exists(localPath))) return fail(`${name} does not exist at public${publicPath}.`)
  const size = await dimensions(localPath)
  if (rule && !size) return fail(`${name} must be a PNG or JPEG that can be dimension-checked.`)
  if (rule && !rule(size)) fail(`${name} has invalid dimensions (${size.width}x${size.height}).`)
  else pass(`${name} is present${size ? ` (${size.width}x${size.height})` : ""}.`)
}

const requiredFiles = [
  "app/layout.tsx", "app/page.tsx", "app/icon/route.tsx", "app/apple-icon/route.tsx",
  "app/opengraph-image/route.tsx", "app/robots.ts", "app/sitemap.ts", "app/api/leads/route.ts",
  "components/site-header.tsx", "components/site-brand.tsx", "components/quote-form.tsx",
  "lib/site-config.ts",
]

for (const file of requiredFiles) {
  if (!(await exists(join(project, file)))) fail(`Required file is missing: ${file}`)
}

const configPath = join(project, "lib/site-config.ts")
const config = await text(configPath)
const layout = await text(join(project, "app/layout.tsx"))
const leadRoute = await text(join(project, "app/api/leads/route.ts"))
const packageJson = JSON.parse(await text(join(project, "package.json")))
const name = extractString(config, "name")
const phone = extractString(config, "phone")
const siteUrl = extractString(config, "siteUrl")
const brandAssets = extractBrandAssets(config)

if (!packageJson.scripts?.build || !packageJson.scripts?.lint) fail("package.json must define build and lint scripts.")
else pass("Build and lint scripts are defined.")

for (const marker of ["openGraph", "twitter", "alternates", "icons", "HVACBusiness", "FAQPage", "WebSite"]) {
  if (!layout.includes(marker)) fail(`Metadata/schema marker is missing: ${marker}`)
}
if (!leadRoute.includes("!A:U") || !leadRoute.includes("insertDataOption: \"INSERT_ROWS\"")) {
  fail("Lead append must target A:U and insert a new row.")
} else pass("Lead append targets A:U with INSERT_ROWS.")

const secretRules = [
  ["private key", /-----BEGIN (?:RSA )?PRIVATE KEY-----/],
  ["Google OAuth refresh token", /1\/\/[A-Za-z0-9_-]{20,}/],
  ["Google client secret", /GOCSPX-[A-Za-z0-9_-]{20,}/],
]
const sourceFiles = (await walk(project)).filter(path => [".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".yml", ".yaml"].includes(extname(path)))
for (const path of sourceFiles) {
  const source = await text(path)
  for (const [label, pattern] of secretRules) {
    if (pattern.test(source)) fail(`Possible ${label} committed in ${relative(project, path)}.`)
  }
}

if (mode === "template") {
  if (Object.keys(brandAssets).length) warn("The master template contains configured brand assets; confirm they are intentionally generic.")
  if (!/Starter/i.test(name || "")) fail("Template mode expects an explicitly labeled starter identity.")
  else pass("Template identity is explicitly labeled as a starter.")
} else {
  const placeholderPatterns = [/starter/i, /your contractor/i, /\(555\)/, /example\.com/i]
  for (const [label, value] of [["business name", name], ["phone", phone], ["site URL", siteUrl]]) {
    if (!value || placeholderPatterns.some(pattern => pattern.test(value))) fail(`${label} is missing or still uses starter/placeholder content.`)
  }
  if (!siteUrl?.startsWith("https://")) fail("business.siteUrl must use HTTPS.")
  if (/\.vercel\.app(?:\/|$)/i.test(siteUrl || "")) fail("Client production URL cannot be a vercel.app domain.")
  await checkAsset("logo", brandAssets.logo)
  await checkAsset("favicon", brandAssets.favicon, ({ width, height }) => width === height && width >= 48)
  await checkAsset("appleTouchIcon", brandAssets.appleTouchIcon, ({ width, height }) => width === 180 && height === 180)
  await checkAsset("socialImage", brandAssets.socialImage, ({ width, height }) => width === 1200 && height === 630)

  const clientSurfaceFiles = (await walk(join(project, "app"))).concat(await walk(join(project, "components")), [configPath])
  const forbidden = [/\bv0\b/i, /Vercel/i, /MurdockOps/i, /Your Contractor/i]
  for (const path of clientSurfaceFiles) {
    const source = await text(path)
    for (const pattern of forbidden) {
      if (pattern.test(source)) fail(`Client-facing source contains forbidden branding (${pattern}) in ${relative(project, path)}.`)
    }
  }
}

if (productionUrl) {
  const routes = ["/", "/services", "/service-areas", "/about", "/contact"]
  for (const route of routes) {
    const response = await fetch(productionUrl + route, { redirect: "follow" })
    if (!response.ok) { fail(`Production route ${route} returned ${response.status}.`); continue }
    const html = await response.text()
    if (mode === "client" && /(?:\bv0\b|Vercel|MurdockOps|Your Contractor)/i.test(html)) fail(`Production route ${route} exposes forbidden branding.`)
    if (route === "/") {
      if (!html.includes('rel="canonical"')) fail("Production homepage is missing a canonical URL.")
      if (!html.includes('property="og:image"')) fail("Production homepage is missing og:image.")
      if (!html.includes('name="twitter:card"')) fail("Production homepage is missing Twitter card metadata.")
    }
    pass(`Production route ${route} returned 200.`)
  }
  for (const route of ["/icon", "/apple-icon", "/opengraph-image", "/robots.txt", "/sitemap.xml"]) {
    const response = await fetch(productionUrl + route, { redirect: "follow" })
    if (!response.ok) fail(`Production asset ${route} returned ${response.status}.`)
    else pass(`Production asset ${route} returned 200.`)
  }
}

console.log(`\nMurdockOps preflight (${mode})`)
for (const message of passes) console.log(`PASS  ${message}`)
for (const message of warnings) console.log(`WARN  ${message}`)
for (const message of failures) console.log(`FAIL  ${message}`)
console.log(`\n${passes.length} passed, ${warnings.length} warned, ${failures.length} failed.`)
process.exit(failures.length ? 1 : 0)
