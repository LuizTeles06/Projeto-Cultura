import React from 'react';
import Link from 'next/link';

interface CardNoticiaProps {
  id?: number | string;
  slug?: string;
  titulo: string;
  descricao: string;
  imagem: string;
  categoria?: string;
}

const categoriaConfig: Record<string, { label: string; color: string }> = {
  futebol: { label: '⚽ Futebol', color: 'bg-blue-100 text-blue-700' },
  volei: { label: '🏐 Vôlei', color: 'bg-yellow-100 text-yellow-700' },
  basquete: { label: '🏀 Basquete', color: 'bg-orange-100 text-orange-700' },
  futsal: { label: '⚽ Futsal', color: 'bg-purple-100 text-purple-700' },
  outros: { label: '🏅 Outros Esportes', color: 'bg-gray-100 text-gray-700' },
};

export default function CardNoticia({ id, slug, titulo, descricao, imagem, categoria }: CardNoticiaProps) {
  const href = slug ? `/noticias/${slug}` : `/noticias/${id}`;
  const categoriaInfo = categoria && categoriaConfig[categoria];
  
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-green-500">
        <img src={imagem} alt={titulo} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h4 className="font-bold mb-2 text-gray-900">{titulo}</h4>
          <p className="text-sm text-gray-700 mb-3">{descricao}</p>
          {categoriaInfo && (
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoriaInfo.color}`}>
              {categoriaInfo.label}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}