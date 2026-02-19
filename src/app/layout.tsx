import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cultura Esportiva - Descubra a alma esportiva de Sorocaba!",
  description: "Blog de notícias esportivas de Sorocaba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}