import type { MetadataRoute } from 'next';

// Defina NEXT_PUBLIC_SITE_URL no ambiente (ex.: https://culturaesportiva.com.br).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://culturaesportiva.com.br';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Não indexar a área de edição do Sanity nem endpoints internos.
      disallow: ['/studio', '/studio/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
