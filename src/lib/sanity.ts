import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'SEU_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Tipos para as notícias
export interface Noticia {
  _id: string;
  titulo: string;
  slug: { current: string };
  descricao: string;
  conteudo: any[];
  imagem: any;
  dataPublicacao: string;
  autor?: string;
}

// Queries GROQ para buscar dados do Sanity
export const queries = {
  // Buscar todas as notícias
  todasNoticias: `*[_type == "noticia"] | order(dataPublicacao desc) {
    _id,
    titulo,
    slug,
    descricao,
    imagem,
    dataPublicacao,
    autor
  }`,

  // Buscar uma notícia específica pelo slug
  noticiaPorSlug: `*[_type == "noticia" && slug.current == $slug][0] {
    _id,
    titulo,
    slug,
    descricao,
    conteudo,
    imagem,
    dataPublicacao,
    autor
  }`,

  // Buscar notícias recentes (limitado)
  noticiasRecentes: `*[_type == "noticia"] | order(dataPublicacao desc)[0..4] {
    _id,
    titulo,
    slug,
    descricao,
    imagem,
    dataPublicacao
  }`,
};
