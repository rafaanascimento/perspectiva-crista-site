import { getCollection } from 'astro:content';
import authors from '../data/authors.json';
import { getPostSlug, slugifyTerm } from '../utils/postHelpers';

const DEFAULT_SITE = 'https://perspectiva-crista-site.pages.dev';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export async function GET({ site, url }: { site?: URL; url: URL }) {
  const baseSite = site?.origin ?? url.origin ?? DEFAULT_SITE;
  const posts = await getCollection('posts');

  const categories = [...new Set(posts.map((post) => post.data.category).filter(Boolean))];
  const tags = [...new Set(posts.flatMap((post) => post.data.tags ?? []).filter(Boolean))];

  const urls = [
    `${baseSite}/`,
    `${baseSite}/artigos/`,
    `${baseSite}/sobre/`,
    `${baseSite}/recursos/`,
    ...authors.map((author) => `${baseSite}/autores/${slugifyTerm(author.name)}/`),
    ...posts.map((post) => `${baseSite}/posts/${getPostSlug(post)}/`),
    ...categories.map((category) => `${baseSite}/categorias/${slugifyTerm(category)}/`),
    ...tags.map((tag) => `${baseSite}/tags/${slugifyTerm(tag)}/`)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((entry) => `  <url><loc>${escapeXml(entry)}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
