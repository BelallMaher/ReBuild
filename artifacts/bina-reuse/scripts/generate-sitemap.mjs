import { writeFile } from 'node:fs/promises';

const base = process.env.VITE_PUBLIC_SITE_URL?.replace(/\/+$/, '');
const routes = [
  '/', '/materials', '/materials/concrete-01', '/materials/wood-02',
  '/materials/metal-03', '/materials/door-04', '/materials/insulation-05',
  '/materials/tools-06', '/materials/concrete-07', '/materials/metal-08',
  '/pricing', '/services', '/blog', '/faq', '/register', '/login', '/sell',
];

const urls = base
  ? routes.map((route) => {
      const priority = route === '/' ? '1.0' : route === '/materials' ? '0.9' : '0.6';
      return `  <url><loc>${base}${route}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
    }).join('\n')
  : '  <!-- Set VITE_PUBLIC_SITE_URL to the published canonical origin to populate this sitemap. -->';

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml);
const robots = `User-agent: *\nAllow: /\n${base ? `Sitemap: ${base}/sitemap.xml\n` : ''}`;
await writeFile(new URL('../public/robots.txt', import.meta.url), robots);
