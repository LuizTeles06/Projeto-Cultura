'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { client, queries, urlFor, Noticia } from '@/lib/sanity';

export default function NoticiaPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticia() {
      try {
        const data = await client.fetch(queries.noticiaPorSlug, { slug });
        setNoticia(data);
      } catch (error) {
        console.error('Erro ao buscar notícia:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchNoticia();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mt-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
        <Link href="/noticias">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
            <ChevronLeft size={20} />
            Voltar para Notícias
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16">
      {/* Imagem de capa */}
      {noticia.imagem && (
        <div className="relative h-[300px] lg:h-[400px]">
          <img
            src={urlFor(noticia.imagem).width(1200).height(400).url()}
            alt={noticia.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="px-6 lg:px-12 py-8 max-w-4xl mx-auto">
        <Link href="/noticias">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 mb-8">
            <ChevronLeft size={20} />
            Voltar
          </button>
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {noticia.titulo}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 mb-6 text-sm">
            {noticia.dataPublicacao && (
              <span>
                {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
            {noticia.autor && (
              <>
                <span>•</span>
                <span>Por {noticia.autor}</span>
              </>
            )}
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {noticia.descricao}
          </p>

          {/* Conteúdo da notícia */}
          {noticia.conteudo && (
            <div className="prose prose-lg max-w-none text-gray-800">
              {noticia.conteudo.map((block: any, index: number) => {
                if (block._type === 'block') {
                  return (
                    <p key={index} className="mb-4 leading-relaxed">
                      {block.children?.map((child: any) => child.text).join('')}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
