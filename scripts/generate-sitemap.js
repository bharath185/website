const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/products-live.json'), 'utf8'));
const newsFile = fs.readFileSync(path.join(__dirname, '../src/data/news.ts'), 'utf8');

const newsMatches = [];
const regex = /"slug":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(newsFile)) !== null) {
  newsMatches.push(match[1]);
}

const baseUrl = 'https://www.bmtbharat.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/products', priority: '0.95', changefreq: 'daily' },
  { url: '/services', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/servicing-and-reconditioning', priority: '0.85', changefreq: 'weekly' },
  { url: '/services/thermal-process-and-coatings', priority: '0.85', changefreq: 'weekly' },
  { url: '/company-profile', priority: '0.85', changefreq: 'monthly' },
  { url: '/news', priority: '0.85', changefreq: 'daily' },
  { url: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { url: '/careers', priority: '0.8', changefreq: 'weekly' },
  { url: '/faq', priority: '0.75', changefreq: 'weekly' },
  { url: '/contact', priority: '0.85', changefreq: 'monthly' },
  { url: '/enquiry', priority: '0.7', changefreq: 'monthly' }
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const p of staticPages) {
  xml += '  <url>\n';
  xml += '    <loc>' + baseUrl + p.url + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>' + p.changefreq + '</changefreq>\n';
  xml += '    <priority>' + p.priority + '</priority>\n';
  xml += '  </url>\n';
}

for (const prod of products) {
  const slug = prod.slug || prod.id;
  xml += '  <url>\n';
  xml += '    <loc>' + baseUrl + '/products/' + slug + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.8</priority>\n';
  xml += '  </url>\n';
}

for (const slug of newsMatches) {
  xml += '  <url>\n';
  xml += '    <loc>' + baseUrl + '/news/' + slug + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>monthly</changefreq>\n';
  xml += '    <priority>0.7</priority>\n';
  xml += '  </url>\n';
}

xml += '</urlset>\n';

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log('Successfully generated public/sitemap.xml with ' + (staticPages.length + products.length + newsMatches.length) + ' URLs');
