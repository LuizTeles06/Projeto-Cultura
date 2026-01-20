'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Hero from '@/components/Hero';
import CardNoticia from '@/components/CardNoticia';

const noticias = Array(15).fill(null).map((_, i) => ({
  id: i + 1,
  titulo: 'Copinha 2026',
  descricao: 'Tudo o que você precisa saber',
  imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=200&fit=crop'
}));

export default function Home() {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const itensPorPagina = 5;
  const totalPaginas = Math.ceil(noticias.length / itensPorPagina);

  const noticiasVisiveis = noticias.slice(
    indiceAtual * itensPorPagina,
    (indiceAtual + 1) * itensPorPagina
  );

  return (
    <>
      <Hero />
      
      <div className="px-6 lg:px-12">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto -mt-20 relative z-10 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <img 
              src="/equipe.jpg"
              alt="Equipe Cultura Esportiva"
              className="rounded-lg w-full lg:w-80"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Fique por dentro do melhor do mundo do esporte
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-12 mb-24 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Últimas notícias</h3>
          <Link href="/noticias">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
              VER TODAS AS NOTÍCIAS
              <ChevronRight size={20} />
            </button>
          </Link>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {noticiasVisiveis.map((noticia) => (
              <CardNoticia key={noticia.id} {...noticia} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}