import React from 'react';
import { Mail, Instagram, Facebook, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
          {/* Integrantes */}
          <div>
            <h3 className="font-bold text-2xl mb-3">Integrantes</h3>
            <ul className="space-y-1 text-lg">
              <li>Matheus Morais</li>
              <li>Abner Augusto</li>
              <li>Bruno</li>
              <li>Carol</li>
            </ul>
          </div>

          {/* Logo central */}
          <div className="flex justify-center">
            <img 
              src="/logo.png" 
              alt="Cultura Esportiva" 
              className="h-20"
            />
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-2xl mb-3 text-right">Contato</h3>
            <div className="flex gap-4">
              <a href="mailto:contato@culturaesportiva.com" className="cursor-pointer hover:text-green-400 transition">
                <Mail size={36} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-green-400 transition">
                <Instagram size={36} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-green-400 transition">
                <Facebook size={36} />
              </a>
              <a href="tel:+5515999999999" className="cursor-pointer hover:text-green-400 transition">
                <Phone size={36} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 border-t border-gray-700 pt-4">
          <p className="text-base">Cultura Esportiva @ 2022 • Sorocaba - SP</p>
        </div>
      </div>
    </footer>
  );
}