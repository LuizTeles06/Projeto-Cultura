'use client';

import React, { useState, useEffect } from 'react'; // <--- Adicionado useEffect
import Link from 'next/link';
import { ChevronLeft, Search, Lock } from 'lucide-react'; // <--- Adicionado ícone Lock
import CardNoticia from '@/components/CardNoticia';
import { urlFor } from '@/sanity/lib/image';

interface NoticiaItem {
  id: string | number;
  slug: string;
  titulo: string;
  descricao: string;
  imagem: string | null;
  dataPublicacao: string;
}

const noticiasMock: NoticiaItem[] = [
  {
    id: 'mock-1',
    slug: 'copinha-2026-tudo-sobre',
    titulo: 'Copinha 2026 (Exemplo Mock)',
    descricao: 'Tudo o que você precisa saber sobre a Copa São Paulo de Futebol Júnior',
    imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-20',
  },
  {
    id: 'mock-2',
    slug: 'brasileirao-previsoes',
    titulo: 'Brasileirão 2026 (Exemplo Mock)',
    descricao: 'As principais previsões para o campeonato brasileiro',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-19',
  },
];

interface NoticiasContentProps {
  sanityPosts: any[];
}

export default function NewsContent({ sanityPosts }: NoticiasContentProps) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('recentes');

  const postsFormatados: NoticiaItem[] = sanityPosts.map((post) => ({
    id: post._id,
    slug: post.slug,
    titulo: post.title,
    descricao: post.Linha,
    imagem: post.mainImage ? urlFor(post.mainImage).url() : null,
    dataPublicacao: post._createdAt,
  }));

  const todasNoticias = [...postsFormatados, ...noticiasMock];

  const noticiasOrdenadas = [...todasNoticias].sort((a, b) => {
    if (filtro === 'recentes' && a.dataPublicacao && b.dataPublicacao) {
      return new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime();
    }
    if (filtro === 'antigas' && a.dataPublicacao && b.dataPublicacao) {
      return new Date(a.dataPublicacao).getTime() - new Date(b.dataPublicacao).getTime();
    }
    return 0;
  });

  const noticiasFiltradas = noticiasOrdenadas.filter((noticia) => {
    const termo = busca.toLowerCase();
    const titulo = noticia.titulo?.toLowerCase() || '';
    const desc = noticia.descricao?.toLowerCase() || '';
    return titulo.includes(termo) || desc.includes(termo);
  });

  return (
    <div className="px-6 lg:px-12 py-8">
      <Link href="/">
        <button className="group flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 hover:shadow-lg transition-all duration-300 mt-8">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar</span>
        </button>
      </Link>

      {/* Container de Busca e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        
        {/* Input de Busca */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Pesquisar notícia..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none text-gray-800 placeholder-gray-500 bg-white"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Select de Filtro */}
        <select 
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none text-gray-800 bg-white"
        >
          <option value="recentes">Mais recentes</option>
          <option value="antigas">Mais antigas</option>
        </select>
      </div>

      <h3 className="text-2xl font-bold mb-6">Últimas notícias</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {noticiasFiltradas.map((noticia) => (
          <CardNoticia 
            key={noticia.id} 
            // CUIDADO: Se os IDs do Sanity forem strings (ex: 'drafts.123'),
            // remover o Number() pode ser necessário para evitar NaN.
            id={Number(noticia.id) || noticia.id} 
            slug={noticia.slug}
            titulo={noticia.titulo}
            descricao={noticia.descricao}
            imagem={noticia.imagem || 'https://via.placeholder.com/300x200'}
          />
        ))}
      </div>

      {noticiasFiltradas.length === 0 && (
        <p className="text-center text-gray-600 py-12">
          Nenhuma notícia encontrada para "{busca}"
        </p>
      )}
    </div>
  );
}