const fs = require('fs');
const path = require('path');

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/products-live.json'), 'utf8'));
const newsFile = fs.readFileSync(path.join(__dirname, '../src/data/news.ts'), 'utf8');

// Parse news items
const newsItems = [];
const newsRegex = /\{[\s\S]*?"slug":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"image":\s*"([^"]+)"[\s\S]*?\}/g;
let m;
while ((m = newsRegex.exec(newsFile)) !== null) {
  newsItems.push({
    slug: m[1],
    title: m[2],
    image: m[3]
  });
}

const baseUrl = 'https://www.bmtbharat.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  {
    url: '',
    priority: '1.0',
    changefreq: 'daily',
    image: 'https://bmtbharat.com/logo.png',
    title: 'Bharat Machine Tools Bangalore'
  },
  {
    url: '/products',
    priority: '0.95',
    changefreq: 'daily',
    image: 'https://bmtbharat.com/logo.png',
    title: 'Bharat Machine Tools Products Catalogue'
  },
  {
    url: '/services',
    priority: '0.9',
    changefreq: 'weekly',
    image: 'https://bmtbharat.com/images/images/image-4.png',
    title: 'BMT Specialized Machine Tool Services'
  },
  {
    url: '/services/servicing-and-reconditioning',
    priority: '0.85',
    changefreq: 'weekly',
    image: 'https://bmtbharat.com/images/images/image-4.png',
    title: 'CNC Machine Reconditioning & Retrofitting'
  },
  {
    url: '/services/thermal-process-and-coatings',
    priority: '0.85',
    changefreq: 'weekly',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
    title: 'Thermal Process & Surface Coatings'
  },
  {
    url: '/company-profile',
    priority: '0.85',
    changefreq: 'monthly',
    image: 'https://bmtbharat.com/logo.png',
    title: 'Bharat Machine Tools Corporate Profile'
  },
  {
    url: '/news',
    priority: '0.85',
    changefreq: 'daily',
    image: 'https://bmtbharat.com/logo.png',
    title: 'Technical Journal & Industry Updates'
  },
  {
    url: '/gallery',
    priority: '0.8',
    changefreq: 'weekly',
    image: 'https://bmtbharat.com/images/images/image-1.png',
    title: 'Machine Works & Factory Gallery'
  },
  {
    url: '/careers',
    priority: '0.8',
    changefreq: 'weekly',
    image: 'https://bmtbharat.com/logo.png',
    title: 'Careers at Bharat Machine Tools'
  },
  {
    url: '/faq',
    priority: '0.75',
    changefreq: 'weekly',
    image: 'https://bmtbharat.com/logo.png',
    title: 'Frequently Asked Questions'
  },
  {
    url: '/contact',
    priority: '0.85',
    changefreq: 'monthly',
    image: 'https://bmtbharat.com/logo.png',
    title: 'Contact Bharat Machine Tools Desk'
  },
  {
    url: '/enquiry',
    priority: '0.7',
    changefreq: 'monthly',
    image: 'https://bmtbharat.com/logo.png',
    title: 'Request a Quote / Technical Enquiry'
  }
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

for (const p of staticPages) {
  xml += '  <url>\n';
  xml += '    <loc>' + baseUrl + p.url + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>' + p.changefreq + '</changefreq>\n';
  xml += '    <priority>' + p.priority + '</priority>\n';
  if (p.image) {
    xml += '    <image:image>\n';
    xml += '      <image:loc>' + escapeXml(p.image) + '</image:loc>\n';
    xml += '      <image:title>' + escapeXml(p.title) + '</image:title>\n';
    xml += '    </image:image>\n';
  }
  xml += '  </url>\n';
}

for (const prod of products) {
  const slug = prod.slug || prod.id;
  const rawImg = prod.image || (Array.isArray(prod.images) && prod.images[0]) || '';
  const fullImg = rawImg.startsWith('http')
    ? rawImg
    : rawImg
    ? `${baseUrl}${rawImg.startsWith('/') ? '' : '/'}${rawImg}`
    : 'https://bmtbharat.com/logo.png';

  xml += '  <url>\n';
  xml += '    <loc>' + baseUrl + '/products/' + slug + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.85</priority>\n';
  if (fullImg) {
    xml += '    <image:image>\n';
    xml += '      <image:loc>' + escapeXml(fullImg) + '</image:loc>\n';
    xml += '      <image:title>' + escapeXml(prod.name) + '</image:title>\n';
    xml += '      <image:caption>' + escapeXml(prod.shortDescription || prod.name) + '</image:caption>\n';
    xml += '    </image:image>\n';
  }
  xml += '  </url>\n';
}

for (const item of newsItems) {
  xml += '  <url>\n';
  xml += '    <loc>' + baseUrl + '/news/' + item.slug + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>monthly</changefreq>\n';
  xml += '    <priority>0.75</priority>\n';
  if (item.image) {
    xml += '    <image:image>\n';
    xml += '      <image:loc>' + escapeXml(item.image) + '</image:loc>\n';
    xml += '      <image:title>' + escapeXml(item.title) + '</image:title>\n';
    xml += '    </image:image>\n';
  }
  xml += '  </url>\n';
}

xml += '</urlset>\n';

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
fs.writeFileSync(path.join(__dirname, '../public/sitemap-main.xml'), xml, 'utf8');
fs.writeFileSync(path.join(__dirname, '../public/sitemap_index.xml'), xml, 'utf8');

// Also write plain text sitemap
const allUrls = [
  ...staticPages.map(p => baseUrl + p.url),
  ...products.map(p => baseUrl + '/products/' + (p.slug || p.id)),
  ...newsItems.map(item => baseUrl + '/news/' + item.slug)
];
fs.writeFileSync(path.join(__dirname, '../public/sitemap.txt'), allUrls.join('\n'), 'utf8');

console.log('Successfully generated Google Image Sitemap files with ' + (staticPages.length + products.length + newsItems.length) + ' URLs and image tags.');

