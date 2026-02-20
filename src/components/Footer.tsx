import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111] text-white py-8 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">

        {/* Seção Principal (3 Colunas) */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">

          {/* Coluna 1: Integrantes */}
          <div className="text-center md:text-left w-full md:w-auto">
            <h3 className="font-bold text-2xl mb-4 text-green-500">Integrantes</h3>
            <ul className="space-y-2 text-lg text-gray-300">
              <li>Matheus Morais</li>
              <li>Abner Augusto</li>
              <li>Bruno Martins</li>
              <li>Rafael Serio</li>
            </ul>
          </div>

          {/* Coluna 2: Logo (Centralizado) */}
          <div className="flex justify-center w-full md:w-auto my-4 md:my-0">
            <Image
              src="/logo.png"
              alt="Cultura Esportiva"
              width={96}
              height={96}
              className="w-auto h-24 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="flex flex-col items-center md:items-end w-full md:w-auto">
            <h3 className="font-bold text-2xl mb-4 text-green-500">Redes Sociais</h3>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/culturaesportiva/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:-translate-y-1 transition-all duration-300" title="Instagram">
                <Instagram size={32} />
              </a>
              <a href="https://www.tiktok.com/@culturaesportivasorocaba?_t=8rMfa2znvBY&_r=1&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnYOybFxKTNnyeiblUL1Ulo2_UnIlROJy5eYi4WYIsmyisB7vR6ya685rCKnM_aem_vckp2KJW2XreePU6OfctOg" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:-translate-y-1 transition-all duration-300" title="TikTok">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@culturaesportivasorocaba" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:-translate-y-1 transition-all duration-300" title="YouTube">
                <Youtube size={32} />
              </a>
            </div>
          </div>
        </div>

        {/* Barra Inferior (Copyright + Área Restrita) */}
        <div className="border-t border-gray-800 pt-6 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">

          <p>
            © {currentYear} Cultura Esportiva • Sorocaba - SP
          </p>

          {/* Link para a Redação (Sanity Studio) */}
          <Link
            href="/studio"
            className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-900 hover:text-green-500 transition-all duration-300 opacity-60 hover:opacity-100 group"
            title="Acesso restrito para editores"
          >
            <Lock size={14} className="group-hover:text-green-500" />
            <span className="font-medium uppercase tracking-wide text-xs">Área da Redação</span>
          </Link>

        </div>
      </div>
    </footer>
  );
}