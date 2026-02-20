import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cultura Esportiva - A Voz do Esporte Sorocabano",
  description: "Blog de notícias esportivas de Sorocaba",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        {children}
      </main>
      <Footer />
    </>
  );
}