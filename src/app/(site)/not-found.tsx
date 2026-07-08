import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-16 px-6 text-center">
      <p className="text-6xl font-black text-green-600 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Página não encontrada</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        A notícia que você procura não existe ou foi removida.
      </p>
      <Link
        href="/noticias"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Voltar para Notícias
      </Link>
    </div>
  );
}
