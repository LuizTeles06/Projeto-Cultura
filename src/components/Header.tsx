'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const abrirMenu = () => setMenuAberto(true);
  const fecharMenu = () => setMenuAberto(false);

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#111] text-white py-4 px-6 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Menu dropdown no canto esquerdo */}
      <div
        className="relative"
        ref={menuRef}
        onMouseEnter={abrirMenu}
        onMouseLeave={fecharMenu}
      >
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Menu de navegação"
        >
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Dropdown menu */}
        {menuAberto && (
          <div className="absolute left-0 top-full w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden animate-fadeIn">
            <nav className="flex flex-col text-white">
              <Link
                href="/"
                onClick={() => setMenuAberto(false)}
                className="px-4 py-3 text-white hover:bg-gray-800 hover:text-green-400 transition-colors border-b border-gray-700"
              >
                Início
              </Link>
              <Link
                href="/historia"
                onClick={() => setMenuAberto(false)}
                className="px-4 py-3 text-white hover:bg-gray-800 hover:text-green-400 transition-colors border-b border-gray-700"
              >
                História
              </Link>
              <Link
                href="/noticias"
                onClick={() => setMenuAberto(false)}
                className="px-4 py-3 text-white hover:bg-gray-800 hover:text-green-400 transition-colors"
              >
                Notícias
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Logo centralizada */}
      <div className="flex-1 flex justify-center">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Cultura Esportiva"
            className="h-20 lg:h-24 cursor-pointer"
          />
        </Link>
      </div>

      {/* Espaço vazio para balancear o layout */}
      <div className="w-10"></div>
    </header>
  );
}