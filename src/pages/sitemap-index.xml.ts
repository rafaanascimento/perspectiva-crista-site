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
  const sitemapUrl = `${baseSite}/sitemap.xml`;

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${escapeXml(
    sitemapUrl
  )}</loc>\n  </sitemap>\n</sitemapindex>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
