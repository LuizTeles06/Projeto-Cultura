'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-[400px] lg:h-[500px] mt-16 w-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=500&fit=crop"
        alt="Hero - Futebol"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div className="text-white px-6 lg:px-12 max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            DESCUBRA A ALMA ESPORTIVA DE SOROCABA!
          </h1>
        </div>
      </div>
    </section>
  );
}
