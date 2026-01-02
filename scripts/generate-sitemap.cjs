#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const HOST = 'https://onlineconvertkit.com'
const outDir = path.join(__dirname, '..', 'public')
const outFile = path.join(outDir, 'sitemap.xml')

function extractSlugs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const re = /slug:\s*"(.*?)"/g
  const slugs = []
  let m
  while ((m = re.exec(content)) !== null) {
    slugs.push(m[1])
  }
  return slugs
}

function unique(arr) {
  return Array.from(new Set(arr))
}

function buildUrlset(urls) {
  const lastmod = new Date().toISOString().split('T')[0]
  const items = urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`
}

;(async function main(){
  try {
    const staticPages = ['/', '/image-converter', '/unit-converter', '/math', '/privacy', '/terms', '/contact']

    const imageDataPath = path.join(__dirname, '..', 'data', 'imageConverters.ts')
    const unitDataPath = path.join(__dirname, '..', 'data', 'unitConverters.ts')

    const imageSlugs = fs.existsSync(imageDataPath) ? extractSlugs(imageDataPath) : []
    const unitSlugs = fs.existsSync(unitDataPath) ? extractSlugs(unitDataPath) : []

    const urls = []
    staticPages.forEach((p) => urls.push(HOST + p))
    imageSlugs.forEach((s) => urls.push(`${HOST}/image-converter/${s}`))
    unitSlugs.forEach((s) => urls.push(`${HOST}/unit-converter/${s}`))

    const all = unique(urls).sort()

    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

    fs.writeFileSync(outFile, buildUrlset(all), 'utf8')
    console.log('Wrote sitemap:', outFile)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
