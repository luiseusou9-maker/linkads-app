import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Imports dos componentes de layout
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LINKADS | Engine de Performance Global",
  description: "A plataforma definitiva para gestão e escala de anúncios em Google Ads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-blue-600/30`}
      >
        {/* Camada de Navegação Fixa */}
        <Navbar />
        
        {/* O padding-top (pt-20) é essencial porque a Navbar é fixa. 
            Sem isso, o conteúdo da página começa "embaixo" do menu.
        */}
        <main className="min-h-screen pt-20 flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
        </main>

        {/* Rodapé Global */}
        <Footer />

        {/* Banner de Consentimento LGPD */}
        <CookieBanner />
      </body>
    </html>
  );
}