import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Hero from '@/components/Hero';

const videos = [
  {
    id: 1,
    titulo: 'Entrevista com Abner Teixeira - Medalhista Olímpico e Octacampeão Brasileiro!',
    videoId: 'B-TV4Lk6_Fg',
  },
  {
    id: 2,
    titulo: 'Entrevista com Maldonado - Campeão Brasileiro de Boxe e que lutou no UFC',
    videoId: 'Kcv0SWBsDEM',
  },
  {
    id: 3,
    titulo: 'ENTREVISTA COM O MONA - CAMPEÃO LIBERTADORES DE 1993 COM O SÃO PAULO!',
    videoId: 'KkHoPC8b8Hg',
  },
];

export default function Historia() {
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

        {/* Nossa história */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600">Nossa história</h2>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <img src="/equipe1.jpg" alt="Equipe Cultura Esportiva" className="rounded-lg w-full lg:w-80 h-64 object-cover shadow-md" />
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                O Cultura Esportiva nasceu em dezembro de 2022 com um objetivo ambicioso: cobrir todas as modalidades esportivas praticadas no Brasil.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Os idealizadores Matheus e Abner deram o primeiro passo e convidaram Bruno, um dos cofundadores do projeto, para trilhar esse caminho. A proposta inicial era ampla: falar sobre todos os esportes do país, sem exceções.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Mas, em 2023, a trajetória tomou um novo rumo.
              </p>
            </div>
          </div>
        </div>

        {/* A virada de chave */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600">A virada de chave</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Foi na Instituição de Educação Sesi Sorocaba que o Cultura Esportiva começou a ganhar força e identidade.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Durante esse período, um professor orientou a equipe a nichar o conteúdo, focando em algo que poucos estavam fazendo: contar as histórias do esporte local com profundidade e identidade.
          </p>
          <p className="text-gray-700 leading-relaxed">
            A partir desse conselho, nasceu o novo direcionamento do projeto: <strong>o foco em Sorocaba e região.</strong>
          </p>
        </div>

        {/* Consolidação e crescimento */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600">Consolidação e crescimento</h2>
          <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
            <img src="/equipe3.jpg" alt="Equipe no estádio" className="rounded-lg w-full lg:w-80 h-64 object-cover shadow-md" />
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Em 2023, o Cultura Esportiva firmou parceria com a escola em diversos eventos esportivos. Um dos momentos marcantes foi a cobertura da comemoração de 10 anos da quadra poliesportiva em homenagem ao ex-jogador sorocabano Paraná.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esse evento representou um verdadeiro pontapé inicial para uma nova fase. Foi também nesse momento que Rafael Serio passou a integrar a equipe, fortalecendo ainda mais o projeto.
              </p>
            </div>
          </div>
        </div>

        {/* Grandes coberturas e parcerias */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600">Grandes coberturas e parcerias</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Desde sua fundação, o Cultura Esportiva já realizou coberturas em importantes eventos esportivos, como:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-1 pl-4">
            <li>Copa das Nações</li>
            <li>Copa Votorantim</li>
            <li>Jogo das Estrelas</li>
            <li>Jogo dos Famosos</li>
            <li>Campeonatos de Vôlei, Futsal e Basquete</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Além disso, o projeto construiu parcerias com veículos de comunicação da região, como a <strong>Atitude Online</strong> e a <strong>Barba na Várzea</strong>, ampliando seu alcance e consolidando sua presença no cenário esportivo local.
          </p>
        </div>

        {/* Entrevistas que marcaram história */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600">Entrevistas que marcaram história</h2>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <img src="/equipe2.jpg" alt="Equipe em cobertura" className="rounded-lg w-full lg:w-80 h-64 object-cover shadow-md" />
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                O Cultura Esportiva também realizou entrevistas com grandes nomes do esporte nacional, entre eles o medalhista olímpico <strong>Abner Teixeira</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cada conversa, cada cobertura e cada evento reforçam o propósito central do projeto: <strong>dar voz às histórias que constroem o esporte da nossa região.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Vídeos */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Principais Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <a key={video.id} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition">
                  <div className="relative">
                    <img src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} alt={video.titulo} className="w-full h-48 object-cover group-hover:opacity-80 transition" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-gray-900">{video.titulo}</h4>
                  </div>
                </div>
              </a>
            ))}
            <div className="rounded-lg shadow overflow-hidden hover:shadow-xl transition">
              <img src="/evento1.jpg" alt="Equipe em evento" className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-bold text-gray-900">Copa das Nações</h4>
              </div>
            </div>
            <div className="rounded-lg shadow overflow-hidden hover:shadow-xl transition">
              <img src="/evento2.jpg" alt="Equipe em cobertura" className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-bold text-gray-900">Jogo das Estrelas</h4>
              </div>
            </div>
            <div className="rounded-lg shadow overflow-hidden hover:shadow-xl transition">
              <img src="/evento3.jpg" alt="Entrevista" className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-bold text-gray-900">Jogo dos Famosos</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Nosso propósito */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl font-bold mb-6 text-white">Nosso propósito</h2>
          <p className="text-white/90 leading-relaxed mb-4 text-lg">
            O Cultura Esportiva segue crescendo, registrando conquistas, superações e personagens que fazem do esporte muito mais do que competição — fazem dele <strong>identidade, paixão e pertencimento.</strong>
          </p>
          <p className="text-white/90 leading-relaxed text-lg">
            Contamos as histórias de Sorocaba e região para todos que celebram a alma esportiva sorocabana.
          </p>
        </div>
      </div>
    </>
  );
}
