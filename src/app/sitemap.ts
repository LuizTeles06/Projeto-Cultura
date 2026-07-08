import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

// Defina NEXT_PUBLIC_SITE_URL no ambiente (ex.: https://culturaesportiva.com.br).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://culturaesportiva.com.br';

// Revalida o sitemap a cada hora.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Busca slugs e data de atualização de cada notícia publicada.
  const posts: { slug: string; _updatedAt: string }[] = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/noticias`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/historia`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/noticias/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
