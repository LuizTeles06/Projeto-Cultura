'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';
import Hero from '@/components/Hero';
import CardNoticia from '@/components/CardNoticia';
import { client, queries, urlFor, Noticia } from '@/lib/sanity';

// Dados locais de fallback (enquanto não tem notícias no Sanity)
const noticiasLocais = Array(15).fill(null).map((_, i) => ({
  id: i + 1,
  titulo: 'Copinha 2026',
  descricao: 'Tudo o que você precisa saber',
  imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=200&fit=crop'
}));

export default function Noticias() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('recentes');
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticias() {
      try {
        const data = await client.fetch(queries.todasNoticias);
        
        if (data && data.length > 0) {
          // Se tem dados do Sanity, usa eles
          const noticiasFormatadas = data.map((noticia: Noticia) => ({
            id: noticia._id,
            slug: noticia.slug?.current,
            titulo: noticia.titulo,
            descricao: noticia.descricao,
            imagem: noticia.imagem ? urlFor(noticia.imagem).width(300).height(200).url() : 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=200&fit=crop',
            dataPublicacao: noticia.dataPublicacao,
          }));
          setNoticias(noticiasFormatadas);
        } else {
          // Se não tem dados do Sanity, usa dados locais
          setNoticias(noticiasLocais);
        }
      } catch (error) {
        console.log('Usando dados locais (Sanity não configurado)');
        setNoticias(noticiasLocais);
      } finally {
        setLoading(false);
      }
    }

    fetchNoticias();
  }, []);

  // Função para ordenar notícias
  const noticiasOrdenadas = [...noticias].sort((a, b) => {
    if (filtro === 'recentes' && a.dataPublicacao && b.dataPublicacao) {
      return new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime();
    }
    if (filtro === 'antigas' && a.dataPublicacao && b.dataPublicacao) {
      return new Date(a.dataPublicacao).getTime() - new Date(b.dataPublicacao).getTime();
    }
    return 0;
  });

  // Filtrar por busca
  const noticiasFiltradas = noticiasOrdenadas.filter((noticia) =>
    noticia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    noticia.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Hero />
      
      <div className="px-6 lg:px-12 py-8">
        <Link href="/">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 mb-8">
            <ChevronLeft size={20} />
            Voltar
          </button>
        </Link>

        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
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

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {noticiasFiltradas.map((noticia) => (
              <CardNoticia 
                key={noticia.id} 
                id={noticia.id}
                slug={noticia.slug}
                titulo={noticia.titulo}
                descricao={noticia.descricao}
                imagem={noticia.imagem}
              />
            ))}
          </div>
        )}

        {!loading && noticiasFiltradas.length === 0 && (
          <p className="text-center text-gray-600 py-12">
            Nenhuma notícia encontrada para "{busca}"
          </p>
        )}
      </div>
    </>
  );
}