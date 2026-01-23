'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';
import Hero from '@/components/Hero';
import CardNoticia from '@/components/CardNoticia';

// Dados mockados (depois será integrado com Sanity)
const noticiasMock = [
  {
    id: 1,
    slug: 'copinha-2026-tudo-sobre',
    titulo: 'Copinha 2026',
    descricao: 'Tudo o que você precisa saber sobre a Copa São Paulo de Futebol Júnior',
    imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-20',
  },
  {
    id: 2,
    slug: 'brasileirao-previsoes',
    titulo: 'Brasileirão 2026',
    descricao: 'As principais previsões para o campeonato brasileiro',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-19',
  },
  {
    id: 3,
    slug: 'selecao-brasileira-novidades',
    titulo: 'Seleção Brasileira',
    descricao: 'Novidades sobre a seleção canarinho para 2026',
    imagem: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-18',
  },
  {
    id: 4,
    slug: 'libertadores-2026',
    titulo: 'Libertadores 2026',
    descricao: 'Confira os grupos e as novidades da Libertadores',
    imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-17',
  },
  {
    id: 5,
    slug: 'copa-do-mundo-preparativos',
    titulo: 'Copa do Mundo 2026',
    descricao: 'Os preparativos para a Copa do Mundo nos EUA, Canadá e México',
    imagem: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-16',
  },
  {
    id: 6,
    slug: 'estaduais-2026',
    titulo: 'Campeonatos Estaduais',
    descricao: 'Tudo sobre os estaduais que começam em breve',
    imagem: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-15',
  },
  {
    id: 7,
    slug: 'mercado-da-bola',
    titulo: 'Mercado da Bola',
    descricao: 'As principais contratações e vendas do futebol brasileiro',
    imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-14',
  },
  {
    id: 8,
    slug: 'futebol-feminino-destaque',
    titulo: 'Futebol Feminino',
    descricao: 'O crescimento do futebol feminino no Brasil',
    imagem: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop',
    dataPublicacao: '2026-01-13',
  },
];

export default function Noticias() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('recentes');
  const noticias = noticiasMock;

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

        {noticiasFiltradas.length === 0 && (
          <p className="text-center text-gray-600 py-12">
            Nenhuma notícia encontrada para "{busca}"
          </p>
        )}
      </div>
    </>
  );
}