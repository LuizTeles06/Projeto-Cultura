import React from 'react';
import Hero from '@/components/Hero';
import HomeContent from '@/components/HomeContent';
import { client } from '@/sanity/lib/client';

async function getLatestPosts() {
  // 15 posts mais recentes
  const query = `*[_type == "post"] | order(_createdAt desc)[0...15] {
    _id,
    title,
    "slug": slug.current,
    "descricao": Linha,
    mainImage
  }`;

  return await client.fetch(query);
}

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <>
      <Hero />
      
      {/* Seção Sobre a Equipe (Mantida Estática) */}
      <div className="px-6 lg:px-12">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto -mt-20 relative z-10 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Certifique-se que a imagem existe na pasta public ou troque o src */}
            <img 
              src="/equipe.jpg" 
              alt="Equipe Cultura Esportiva"
              className="rounded-lg w-full lg:w-80 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Fique por dentro do melhor do mundo do esporte
              </h2>
              <p className="text-gray-600">
                Acompanhe notícias exclusivas, resultados e análises profundas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Dinâmica de Notícias */}
      <HomeContent posts={posts} />
    </>
  );
}