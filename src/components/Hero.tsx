'use client';

import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[400px] lg:h-[550px] mt-16 w-full overflow-hidden">
      <Image
        src="/img-main.png"
        alt="Esportes em Sorocaba"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div className="text-white px-6 lg:px-12 max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight animate-heroSlideUp">
            DESCUBRA A ALMA ESPORTIVA DE SOROCABA!
          </h1>
        </div>
      </div>
    </section>
  );
}
