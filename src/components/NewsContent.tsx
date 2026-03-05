'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';
import CardNoticia from '@/components/CardNoticia';
import { urlFor } from '@/sanity/lib/image';

interface NoticiaItem {
  id: string | number;
  slug: string;
  titulo: string;
  descricao: string;
  imagem: string | null;
  coverImage?: string | null;
  categoria?: string;
  dataPublicacao: string;
}

const categoriasFiltro = [
  { value: 'todas', label: '🏆 Todas', color: 'bg-green-600 text-white', colorInactive: 'bg-gray-200 text-gray-700 hover:bg-green-100' },
  { value: 'futebol', label: '⚽ Futebol', color: 'bg-blue-600 text-white', colorInactive: 'bg-gray-200 text-gray-700 hover:bg-blue-100' },
  { value: 'volei', label: '🏐 Vôlei', color: 'bg-yellow-500 text-white', colorInactive: 'bg-gray-200 text-gray-700 hover:bg-yellow-100' },
  { value: 'basquete', label: '🏀 Basquete', color: 'bg-orange-500 text-white', colorInactive: 'bg-gray-200 text-gray-700 hover:bg-orange-100' },
  { value: 'futsal', label: '⚽ Futsal', color: 'bg-purple-600 text-white', colorInactive: 'bg-gray-200 text-gray-700 hover:bg-purple-100' },
  { value: 'handebol', label: '🤾 Handebol', color: 'bg-red-600 text-white', colorInactive: 'bg-gray-200 text-gray-700 hover:bg-red-100' },
  { value: 'outros', label: '🏅 Outros', color: 'bg-gray-600 text-white', colorInactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300' },
];

interface NoticiasContentProps {
  sanityPosts: any[];
}

export default function NewsContent({ sanityPosts }: NoticiasContentProps) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('recentes');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');

  const postsFormatados: NoticiaItem[] = sanityPosts.map((post) => ({
    id: post._id,
    slug: post.slug,
    titulo: post.title,
    descricao: post.Linha,
    categoria: post.categoria,
    imagem: post.mainImage ? urlFor(post.mainImage).url() : null,
    coverImage: post.coverImage ? urlFor(post.coverImage).url() : null,
    dataPublicacao: post._createdAt,
  }));

  const todasNoticias = postsFormatados;

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
    const correspondeTexto = titulo.includes(termo) || desc.includes(termo);
    const correspondeCategoria = categoriaAtiva === 'todas' || noticia.categoria === categoriaAtiva;
    return correspondeTexto && correspondeCategoria;
  });

  return (
    <div className="px-6 lg:px-12 py-8">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 hover:shadow-lg transition-all duration-300 mt-8"
      >
        <ChevronLeft size={20} aria-hidden="true" className="group-hover:-translate-x-1 transition-transform" />
        <span>Voltar</span>
      </Link>

      {/* Container de Busca e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 max-w-4xl mx-auto">

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

      {/* Filtro por Categoria */}
      <div className="flex flex-wrap gap-2 mb-8 max-w-4xl mx-auto justify-center">
        {categoriasFiltro.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategoriaAtiva(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${categoriaAtiva === cat.value
              ? cat.color + ' shadow-md scale-105'
              : cat.colorInactive
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <h3 className="text-2xl font-bold mb-6 text-gray-900">
        {categoriaAtiva === 'todas'
          ? 'Últimas notícias'
          : `Notícias de ${categoriasFiltro.find(c => c.value === categoriaAtiva)?.label || ''}`
        }
      </h3>

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
            categoria={noticia.categoria}
            imagem={noticia.imagem || '/placeholder.jpg'}
            coverImage={noticia.coverImage || undefined}
          />
        ))}
      </div>

      {noticiasFiltradas.length === 0 && (
        <p className="text-center text-gray-600 py-12">
          Nenhuma notícia encontrada
        </p>
      )}
    </div>
  );
}