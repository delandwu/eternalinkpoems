import type { APIRoute } from 'astro';
import { localdb as db } from "@/database/localdb";
import { table_works, table_authors, table_dynasties, table_collections } from "@/database/schema_sqlite";

const siteUrl = 'https://eternalinkpoems.com';

export const GET: APIRoute = async () => {
  // 获取所有作品页面
  const works = await db.select().from(table_works);
  
  // 获取所有作者页面
  const authors = await db.select().from(table_authors);
  
  // 获取所有朝代页面
  const dynasties = await db.select().from(table_dynasties);
  
  // 获取所有集合页面
  const collections = await db.select().from(table_collections);
  
  // 生成XML文件
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 静态页面 -->
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/info</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- 作品页面 -->
  ${works.map(work => `
  <url>
    <loc>${siteUrl}/works/${work.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>${work.quotes_count > 0 ? '0.8' : '0.6'}</priority>
  </url>`).join('')}
  
  <!-- 作者页面 -->
  ${authors.map(author => `
  <url>
    <loc>${siteUrl}/authors/${author.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- 朝代页面 -->
  ${dynasties.map(dynasty => `
  <url>
    <loc>${siteUrl}/dynasties/${dynasty.name}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- 集合页面 -->
  ${collections.map(collection => `
  <url>
    <loc>${siteUrl}/collections/${collection.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;
  
  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}; 