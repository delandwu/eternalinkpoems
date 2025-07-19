import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

const siteUrl = 'https://eternalinkpoems.com';

export const GET: APIRoute = async () => {
  try {
    console.log('Starting sitemap generation from JSON files...');
    
    // Read JSON files directly as fallback
    const dataPath = path.resolve(process.cwd(), 'src/database/json');
    
    const [worksData, authorsData, dynastiesData, collectionsData] = await Promise.all([
      fs.promises.readFile(path.join(dataPath, 'works.json'), 'utf8').then(JSON.parse),
      fs.promises.readFile(path.join(dataPath, 'authors.json'), 'utf8').then(JSON.parse),
      fs.promises.readFile(path.join(dataPath, 'dynasties.json'), 'utf8').then(JSON.parse),
      fs.promises.readFile(path.join(dataPath, 'collections.json'), 'utf8').then(JSON.parse)
    ]);
    
    const works = worksData.works || [];
    const authors = authorsData.authors || [];
    const dynasties = dynastiesData.dynasties || [];
    const collections = collectionsData.collections || [];
    
    console.log(`Found ${works.length} works, ${authors.length} authors, ${dynasties.length} dynasties, ${collections.length} collections`);
    
    // Generate XML file
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
    <loc>${siteUrl}/faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/reviews</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${siteUrl}/info</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${siteUrl}/works</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/authors</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/collections</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/dynasties</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/today</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 作品页面 -->
  ${works.map(work => `
  <url>
    <loc>${siteUrl}/works/${work.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>${work.quotes_count && work.quotes_count > 0 ? '0.8' : '0.6'}</priority>
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
    <loc>${siteUrl}/dynasties/${encodeURIComponent(dynasty.name)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- 集合页面 -->
  ${collections.filter(collection => collection.online_data === 0).map(collection => `
  <url>
    <loc>${siteUrl}/collections/${collection.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;
    
    console.log('Sitemap generated successfully from JSON files');
    
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap from JSON:', error);
    console.error('Error details:', error.message);
    
    // Return a basic sitemap with just static pages if JSON files fail
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  <url>
    <loc>${siteUrl}/works</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/authors</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/collections</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/dynasties</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/today</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=300'
      }
    });
  }
};