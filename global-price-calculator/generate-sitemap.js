import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// 在ES模块中获取 __dirname 的等效值
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const baseURL = 'https://global-price-calculator.vercel.app'
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  // 添加你的其他路由
]

const sitemap = new SitemapStream({ hostname: baseURL })
const writeStream = createWriteStream(resolve(__dirname, './dist/sitemap.xml'))

sitemap.pipe(writeStream)
links.forEach(link => sitemap.write(link))
sitemap.end()

console.log('Sitemap generated successfully in ES module mode!')