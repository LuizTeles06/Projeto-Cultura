import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

// Imports do Sanity
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

// --- 1. DADOS MOCKADOS (REDUZIDOS PARA 2) ---
const noticiasMock = [
  {
    slug: 'copinha-2026-tudo-sobre',
    title: 'Copinha 2026 (MOCK)',
    descricao: 'Tudo o que você precisa saber sobre a Copa São Paulo.',
    conteudo: 'Conteúdo estático de teste para quando não houver internet ou dados.',
    imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-20',
    autor: 'Redação Cultura Esportiva',
    isMock: true // Flag para identificar
  },
  {
    slug: 'brasileirao-previsoes',
    title: 'Brasileirão 2026 (MOCK)',
    descricao: 'As principais previsões para o campeonato brasileiro.',
    conteudo: 'Texto de exemplo do mock.',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-19',
    autor: 'Redação Cultura Esportiva',
    isMock: true
  },
];

// --- 2. FUNÇÃO PARA BUSCAR NO SANITY ---
async function getSanityPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "descricao": Linha, 
    content,
    mainImage,
    link,
    _createdAt
  }`;

  return client.fetch(query, { slug });
}

// --- 3. COMPONENTE DA PÁGINA (SERVER COMPONENT) ---
export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  // No Next.js 15, params é uma Promise
  const { slug } = await params;

  // 1º Tentativa: Buscar no Sanity
  const sanityPost = await getSanityPost(slug);

  // 2º Tentativa: Buscar no Mock
  const mockPost = noticiasMock.find((n) => n.slug === slug);

  // Decidir qual usar (Prioridade: Sanity > Mock)
  const post = sanityPost || mockPost;

  // Se não achar em nenhum lugar, 404
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mt-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
        <Link
          href="/noticias"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 hover:shadow-lg transition-all duration-300 flex items-center gap-2 mt-12"
        >
          <ChevronLeft size={20} aria-hidden="true" />
          Voltar para Notícias
        </Link>
      </div>
    );
  }

  // Normalização de dados para renderizar (pois o formato do Sanity e do Mock são diferentes)
  const isSanity = !!sanityPost;

  const titulo = isSanity ? post.title : post.title;
  const descricao = isSanity ? post.descricao : post.descricao;
  const data = isSanity ? post._createdAt : post.dataPublicacao;
  const imagemUrl = isSanity && post.mainImage ? urlFor(post.mainImage).url() : post.imagem;
  const autor = isSanity ? "Redação" : post.autor; // Sanity não tem campo autor ainda, usei fixo

  return (
    // 1. Aumentei o mt-24 para mt-32 para dar mais respiro do menu
    <div className="min-h-screen mt-32 mb-16">

      {/* 2. Mudei max-w-4xl para max-w-6xl (FICOU MAIS LARGO) */}
      <div className="px-6 lg:px-12 max-w-6xl mx-auto">

        <div className="mb-8">
          <Link
            href="/noticias"
            className="group inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 hover:shadow-lg transition-all duration-300 mt-8"
          >
            <ChevronLeft size={20} aria-hidden="true" className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para notícias</span>
          </Link>
        </div>

        <article>
          {/* CABEÇALHO */}
          <header className="mb-10 text-center max-w-4xl mx-auto">
            {/* Metadados acima do título */}
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">
              {post._createdAt && (
                <time dateTime={post._createdAt}>
                  {new Date(post._createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              )}
              <span className="text-gray-300">•</span>
              <span className="text-green-700 font-bold">{post.autor || 'Redação'}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            {post.descricao && (
              <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                {post.descricao}
              </p>
            )}
          </header>

          {/* --- IMAGEM CONTROLADA --- */}
          {imagemUrl && (
            <figure className="mb-12 w-full flex flex-col items-center">
              {/* 3. Container da imagem:
                  - h-[600px]: Trava a altura máxima para não ficar gigante
                  - bg-gray-50: Fundo sutil caso a imagem não preencha tudo
              */}
              <div className="relative w-full max-h-[600px] rounded-2xl overflow-hidden shadow-xl bg-gray-50 flex justify-center items-center">
                <Image
                  src={imagemUrl}
                  alt={post.mainImage?.alt || post.title}
                  width={1200}
                  height={800}
                  priority
                  // 4. object-contain: Mostra a foto inteira (Zé Rafael inteiro) sem cortar,
                  // mas respeitando a altura máxima de 600px.
                  className="w-auto h-auto max-h-[600px] object-contain"
                />
              </div>
              {post.mainImage?.alt && (
                <figcaption className="text-sm text-gray-500 mt-3 italic">
                  {post.mainImage.alt}
                </figcaption>
              )}
            </figure>
          )}

          {/* LINK EXTERNO */}
          {post.link && (
            <div className="max-w-4xl mx-auto mb-16">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔗</span>
                  <div>
                    <p className="text-sm text-blue-600 font-bold uppercase">Referência Externa</p>
                    <p className="text-blue-900 font-medium group-hover:underline">Confira a notícia em nossas Redes Sociais</p>
                  </div>
                </div>
                <ChevronLeft className="rotate-180 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}

          {/* CONTEÚDO DO TEXTO */}
          {/* 5. Centralizamos o texto em max-w-4xl para facilitar a leitura, 
                 mesmo que a imagem possa ser mais larga */}
          <div className="prose prose-lg md:prose-xl max-w-4xl mx-auto text-gray-800 prose-headings:text-gray-900 prose-a:text-green-600 hover:prose-a:text-green-700 prose-img:rounded-xl mt-8 mb-16">
            <PortableText
              value={post.content}
              components={{
                types: {
                  image: ({ value }: any) => (
                    <img
                      src={urlFor(value).url()}
                      alt={value.alt}
                      className="w-full h-auto rounded-xl my-8 shadow-md"
                    />
                  ),
                }
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}