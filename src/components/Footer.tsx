import React from 'react';
import Link from 'next/link'; // Importante para navegação interna
import { Mail, Instagram, Facebook, Phone, Lock } from 'lucide-react'; // Adicionei o Lock

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-8 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Seção Principal (3 Colunas) */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          
          {/* Coluna 1: Integrantes */}
          <div className="text-center md:text-left w-full md:w-auto">
            <h3 className="font-bold text-2xl mb-4 text-green-500">Integrantes</h3>
            <ul className="space-y-2 text-lg text-gray-300">
              <li>Matheus Morais</li>
              <li>Abner Augusto</li>
              <li>Bruno</li>
              <li>Carol</li>
            </ul>
          </div>

          {/* Coluna 2: Logo (Centralizado) */}
          <div className="flex justify-center w-full md:w-auto my-4 md:my-0">
            {/* Se não tiver a logo ainda, use um placeholder ou verifique o caminho */}
            <img 
              src="/logo.png" 
              alt="Cultura Esportiva" 
              className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Coluna 3: Contato (Alinhado à direita no desktop) */}
          <div className="flex flex-col items-center md:items-end w-full md:w-auto">
            <h3 className="font-bold text-2xl mb-4 text-green-500">Contato</h3>
            <div className="flex gap-6">
              <a href="mailto:contato@culturaesportiva.com" className="hover:text-green-400 hover:-translate-y-1 transition-all duration-300" title="E-mail">
                <Mail size={32} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:-translate-y-1 transition-all duration-300" title="Instagram">
                <Instagram size={32} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:-translate-y-1 transition-all duration-300" title="Facebook">
                <Facebook size={32} />
              </a>
              <a href="tel:+5515999999999" className="hover:text-green-400 hover:-translate-y-1 transition-all duration-300" title="Telefone">
                <Phone size={32} />
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