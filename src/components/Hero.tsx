import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[400px] lg:h-[500px] mt-16">
      <img 
        src="/hero-bg.jpg"
        alt="Hero - Futebol"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div className="text-white px-6 lg:px-12 max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-2">A VOZ DO</h1>
          <h1 className="text-4xl lg:text-6xl font-bold mb-2">ESPORTE</h1>
          <h1 className="text-4xl lg:text-6xl font-bold">SOROCABANO</h1>
        </div>
      </div>
    </div>
  );
}