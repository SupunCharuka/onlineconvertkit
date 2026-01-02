#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'public')
const outFile = path.join(outDir, 'robots.txt')
const configPath = path.join(__dirname, '..', 'config', 'robots.json')

let config
if (fs.existsSync(configPath)) {
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  } catch (err) {
    console.error('Invalid JSON in', configPath, err)
    process.exit(1)
  }
} else {
  config = {
    host: 'https://onlineconvertkit.com',
    sitemap: '/sitemap.xml',
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: []
      }
    ]
  }
}

function buildRobots(cfg) {
  const lines = [];
  ;(cfg.rules || []).forEach((r) => {
    lines.push(`User-agent: ${r.userAgent}`)
    ;(r.disallow || []).forEach((d) => lines.push(`Disallow: ${d}`))
    ;(r.allow || []).forEach((a) => lines.push(`Allow: ${a}`))
    lines.push('')
  })
  if (cfg.sitemap) {
    const sitemap = cfg.sitemap.startsWith('http') ? cfg.sitemap : `${cfg.host || ''}${cfg.sitemap}`
    lines.push(`Sitemap: ${sitemap}`)
  }
  if (cfg.host) lines.push(`Host: ${cfg.host}`)
  return lines.join('\n') + '\n'
}

try {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outFile, buildRobots(config), 'utf8')
  console.log('Wrote robots:', outFile)
} catch (err) {
  console.error(err)
  process.exit(1)
}
