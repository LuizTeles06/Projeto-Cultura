// src/app/noticias/page.tsx
import React from 'react';
import Hero from '@/components/Hero';
import NoticiasContent from '@/components/NewsContent';
import { client } from '@/sanity/lib/client';

// Função para buscar dados no servidor (Server Side)
async function getPosts() {
  // Buscamos apenas o que precisamos para o Card
  // Mapeamos 'Linha' (seu schema) para descricao
  const query = `*[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "Linha": Linha, 
    mainImage,
    _createdAt
  }`;

  return await client.fetch(query);
}

export default async function NoticiasPage() {
  // Busca os dados antes de renderizar a página
  const sanityPosts = await getPosts();

  return (
    <>
      <Hero />
      {/* Passamos os dados para o componente interativo */}
      <NoticiasContent sanityPosts={sanityPosts} />
    </>
  );
}