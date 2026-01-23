'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

// Dados mockados (mesmos da página de notícias)
const noticiasMock = [
  {
    id: 1,
    slug: 'copinha-2026-tudo-sobre',
    titulo: 'Copinha 2026',
    descricao: 'Tudo o que você precisa saber sobre a Copa São Paulo de Futebol Júnior',
    conteudo: 'A Copa São Paulo de Futebol Júnior de 2026 promete ser uma das edições mais emocionantes da história. Com a participação de clubes de todo o Brasil, a competição revela novos talentos que podem brilhar no futebol profissional. Acompanhe nossa cobertura completa com análises, resultados e destaques de cada rodada.',
    imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-20',
    autor: 'Redação Cultura Esportiva',
  },
  {
    id: 2,
    slug: 'brasileirao-previsoes',
    titulo: 'Brasileirão 2026',
    descricao: 'As principais previsões para o campeonato brasileiro',
    conteudo: 'O Campeonato Brasileiro de 2026 está prestes a começar e já movimenta o mercado da bola. Clubes tradicionais como Flamengo, Palmeiras, Corinthians e São Paulo se reforçam para a disputa do título. Confira nossa análise completa sobre os favoritos e as surpresas que podem aparecer nesta temporada.',
    imagem: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-19',
    autor: 'Redação Cultura Esportiva',
  },
  {
    id: 3,
    slug: 'selecao-brasileira-novidades',
    titulo: 'Seleção Brasileira',
    descricao: 'Novidades sobre a seleção canarinho para 2026',
    conteudo: 'A Seleção Brasileira se prepara intensamente para a Copa do Mundo de 2026. Com uma nova geração de talentos e jogadores experientes, a equipe busca reconquistar o título mundial. Confira as últimas novidades sobre convocações, amistosos e a preparação da equipe.',
    imagem: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-18',
    autor: 'Redação Cultura Esportiva',
  },
  {
    id: 4,
    slug: 'libertadores-2026',
    titulo: 'Libertadores 2026',
    descricao: 'Confira os grupos e as novidades da Libertadores',
    conteudo: 'A Copa Libertadores da América 2026 promete grandes confrontos entre os melhores clubes do continente. Com brasileiros bem representados, a busca pela glória eterna continua. Veja os grupos, calendário e análises dos times favoritos ao título.',
    imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-17',
    autor: 'Redação Cultura Esportiva',
  },
  {
    id: 5,
    slug: 'copa-do-mundo-preparativos',
    titulo: 'Copa do Mundo 2026',
    descricao: 'Os preparativos para a Copa do Mundo nos EUA, Canadá e México',
    conteudo: 'A Copa do Mundo de 2026 será histórica: pela primeira vez, três países sediarão o evento. Estados Unidos, Canadá e México se preparam para receber as 48 seleções que disputarão o título. Confira os estádios, cidades-sede e toda a logística do maior evento do futebol mundial.',
    imagem: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-16',
    autor: 'Redação Cultura Esportiva',
  },
  {
    id: 6,
    slug: 'estaduais-2026',
    titulo: 'Campeonatos Estaduais',
    descricao: 'Tudo sobre os estaduais que começam em breve',
    conteudo: 'Os campeonatos estaduais de 2026 estão prestes a começar em todo o Brasil. Paulistão, Carioca, Mineiro e Gaúcho prometem grandes clássicos e revelações. Acompanhe nossa cobertura completa com tabelas, resultados e análises.',
    imagem: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-15',
    autor: 'Redação Cultura Esportiva',
  },
  {
    id: 7,
    slug: 'mercado-da-bola',
    titulo: 'Mercado da Bola',
    descricao: 'As principais contratações e vendas do futebol brasileiro',
    conteudo: 'O mercado da bola está aquecido no início de 2026. Grandes clubes brasileiros investem pesado em reforços enquanto outros negociam suas principais estrelas com o exterior. Fique por dentro de todas as transferências confirmadas e rumores.',
    imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-14',
    autor: 'Redação Cultura Esportiva',
  },
  {
    id: 8,
    slug: 'futebol-feminino-destaque',
    titulo: 'Futebol Feminino',
    descricao: 'O crescimento do futebol feminino no Brasil',
    conteudo: 'O futebol feminino brasileiro vive um momento de grande crescimento. Com mais investimentos, visibilidade e estrutura, as atletas conquistam cada vez mais espaço e reconhecimento. Conheça as principais competições, clubes e jogadoras que estão fazendo história.',
    imagem: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=400&fit=crop',
    dataPublicacao: '2026-01-13',
    autor: 'Redação Cultura Esportiva',
  },
];

interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  imagem: string;
  dataPublicacao: string;
  autor: string;
}

export default function NoticiaPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const noticia = noticiasMock.find((n) => n.slug === slug) as Noticia | undefined;

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
            src={noticia.imagem}
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
              <p className="mb-4 leading-relaxed">
                {noticia.conteudo}
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
