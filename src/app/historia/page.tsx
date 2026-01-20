import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Hero from '@/components/Hero';

const eventos = [
  {
    id: 1,
    titulo: 'Copinha 2026',
    descricao: 'Tudo o que você precisa saber',
    imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    titulo: 'Copinha 2026',
    descricao: 'Tudo o que você precisa saber',
    imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    titulo: 'Copinha 2026',
    descricao: 'Tudo o que você precisa saber',
    imagem: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=300&h=200&fit=crop'
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

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center mb-8">
            <img 
              src="/equipe.jpg"
              alt="Equipe"
              className="rounded-lg w-full lg:w-80"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Quem somos</h2>
              <p className="text-gray-800 leading-relaxed">
                Somos um grupo de jornalistas apaixonados por esportes, movidos pela curiosidade, 
                pela emoção do jogo e pelo compromisso com a informação de qualidade. Acreditamos 
                no poder do esporte de contar histórias, conectar pessoas e inspirar, sempre com 
                olhar crítico, ética e muita paixão pelo que fazemos.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Nossa História</h2>
          <p className="text-gray-800 leading-relaxed text-justify">
            Tudo começou em 2022, na Escola SESI, quando um grupo de amigos percebeu que tinha 
            algo em comum além das salas de aula: a paixão pelo esporte e pelo jornalismo. Entre 
            conversas no intervalo, debates sobre jogos e ideias anotadas em cadernos, nasceu a 
            vontade de contar histórias esportivas do jeito deles. O que começou como um projeto entre 
            amigos foi ganhando forma, propósito e identidade, transformando aquela paixão 
            compartilhada no início de uma jornada que segue crescendo até hoje.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Principais Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventos.map((evento) => (
              <div key={evento.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={evento.imagem} alt={evento.titulo} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <h4 className="font-bold mb-2 text-gray-900">{evento.titulo}</h4>
                  <p className="text-sm text-gray-700">{evento.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}