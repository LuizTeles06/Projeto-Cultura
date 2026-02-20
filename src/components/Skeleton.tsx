'use client';

import React from 'react';

function SkeletonCard() {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full border-2 border-transparent">
            {/* Imagem placeholder */}
            <div className="w-full h-48 bg-gray-200 animate-pulse" />
            {/* Conteúdo placeholder */}
            <div className="p-4 space-y-3">
                {/* Título */}
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                {/* Descrição */}
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                </div>
                {/* Categoria */}
                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24" />
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 5 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

export function HomePageSkeleton() {
    return (
        <>
            {/* Hero skeleton */}
            <section className="relative h-[400px] lg:h-[500px] mt-16 w-full overflow-hidden bg-gray-300 animate-pulse" />

            {/* Seção sobre skeleton */}
            <div className="px-6 lg:px-12">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto -mt-20 relative z-10 mb-12">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        <div className="rounded-lg w-full lg:w-80 h-60 bg-gray-200 animate-pulse" />
                        <div className="flex-1 space-y-4 w-full">
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notícias skeleton */}
            <div className="px-6 lg:px-12 mb-24 pb-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-52" />
                </div>
                <SkeletonGrid count={5} />
            </div>
        </>
    );
}

export function NoticiasPageSkeleton() {
    return (
        <>
            {/* Hero skeleton */}
            <section className="relative h-[400px] lg:h-[500px] mt-16 w-full overflow-hidden bg-gray-300 animate-pulse" />

            <div className="px-6 lg:px-12 py-8">
                {/* Botão voltar skeleton */}
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-28 mt-8" />

                {/* Busca skeleton */}
                <div className="flex flex-col md:flex-row gap-4 mb-4 max-w-4xl mx-auto mt-6">
                    <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-40" />
                </div>

                {/* Filtros skeleton */}
                <div className="flex flex-wrap gap-2 mb-8 max-w-4xl mx-auto justify-center">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="h-9 bg-gray-200 rounded-full animate-pulse w-24" />
                    ))}
                </div>

                {/* Título skeleton */}
                <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-6" />

                {/* Cards skeleton */}
                <SkeletonGrid count={5} />
            </div>
        </>
    );
}

export default SkeletonCard;
