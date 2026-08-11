import { readFileSync } from "node:fs"
import { extname, join, normalize, sep } from "node:path"

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
}

export function localBrandAsset(asset?: string) {
  if (!asset?.startsWith("/")) return null
  const publicDirectory = join(process.cwd(), "public")
  const path = normalize(join(publicDirectory, asset))
  if (path !== publicDirectory && !path.startsWith(publicDirectory + sep)) return null
  const mimeType = mimeTypes[extname(path).toLowerCase()]
  if (!mimeType) return null

  try {
    return { data: new Uint8Array(readFileSync(path)), contentType: mimeType }
  } catch {
    return null
  }
}
