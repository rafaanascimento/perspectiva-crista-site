import { getCollection } from 'astro:content';

const site = 'https://seudominio.com';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export async function GET() {
  const posts = await getCollection('posts');

  const categories = [...new Set(posts.map((post) => post.data.category).filter(Boolean))];
  const tags = [
    ...new Set(posts.flatMap((post) => post.data.tags ?? []).filter(Boolean))
  ];

  const urls = [
    `${site}/`,
    `${site}/artigos/`,
    ...posts.map((post) => `${site}/posts/${post.data.slug ?? post.id}/`),
    ...categories.map((category) => `${site}/categorias/${encodeURIComponent(category)}/`),
    ...tags.map((tag) => `${site}/tags/${encodeURIComponent(tag)}/`)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
