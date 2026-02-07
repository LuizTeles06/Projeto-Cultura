'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import CardNoticia from '@/components/CardNoticia';
import { urlFor } from '@/sanity/lib/image';

interface HomeContentProps {
  posts: any[]; // Recebe os posts vindos do Sanity
}

export default function HomeContent({ posts }: HomeContentProps) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const itensPorPagina = 5;

  // Normalizar os dados do Sanity para o formato do Card
  const noticiasFormatadas = posts.map(post => ({
    id: post._id,
    slug: post.slug,
    titulo: post.title,
    descricao: post.descricao || '', // Mapeado do campo 'Linha' na query
    categoria: post.categoria,
    imagem: post.mainImage ? urlFor(post.mainImage).url() : '/placeholder.jpg',
    coverImage: post.coverImage ? urlFor(post.coverImage).url() : undefined
  }));

  const noticiasVisiveis = noticiasFormatadas.slice(
    indiceAtual * itensPorPagina,
    (indiceAtual + 1) * itensPorPagina
  );

  return (
    <div className="px-6 lg:px-12 mb-24 pb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Últimas notícias</h3>
        <Link href="/noticias">
          <button className="group flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 hover:shadow-lg transition-all duration-300 mt-8">
            <span>VER TODAS NOTÍCIAS</span>
            <ChevronRight size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      <div className="relative">
        {noticiasVisiveis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {noticiasVisiveis.map((noticia) => (
              <CardNoticia 
                key={noticia.id} 
                id={noticia.id} 
                slug={noticia.slug}
                titulo={noticia.titulo}
                descricao={noticia.descricao}
                categoria={noticia.categoria}
                imagem={noticia.imagem}
                coverImage={noticia.coverImage}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma notícia encontrada.</p>
        )}
      </div>
    </div>
  );
}