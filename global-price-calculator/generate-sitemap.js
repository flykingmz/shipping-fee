// scripts/generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')
const { resolve } = require('path')

// 定义你的网站基本URL
const baseURL = 'https://global-price-calculator.vercel.app'

// 定义你的所有路由
// 对于动态路由，你可以在这里加入从API或数据库获取的列表
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  // 示例：假设你有动态产品页面
  // ...products.map(p => ({ url: `/product/${p.id}`, changefreq: 'weekly', priority: 0.6 }))
]

// 创建Sitemap流
const sitemap = new SitemapStream({ hostname: baseURL })

// 创建输出流，指向dist目录
const writeStream = createWriteStream(resolve(__dirname, '../dist/sitemap.xml'))

// 管道连接
sitemap.pipe(writeStream)

// 写入链接
links.forEach(link => sitemap.write(link))
sitemap.end()

console.log('Sitemap generated successfully!')