// @ts-nocheck
import Image from 'next/image';
import { Rocket, Target, BookOpen, Cpu } from 'lucide-react';

export default function QuemSomos() {
  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* HERO SECTION DARK */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* TEXTO À ESQUERDA */}
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-2 text-blue-500 font-bold tracking-[4px] uppercase text-[10px]">
              <Cpu size={14} /> Sistema de Inteligência LinkAds
            </div>
            {/* NOME CORRIGIDO: LUIS COM S */}
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              QUEM É <span className="text-blue-600">LUIS SOARES?</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              Tecnólogo em Marketing Digital pela Anhanguera Campinas. 
              Desenvolvedor focado em criar ferramentas que cortam o sofrimento de quem anuncia no Google Ads.
            </p>
          </div>
          
          {/* IMAGEM À DIREITA COM EFEITO DE ZOOM (HOVER) */}
          <div className="md:w-1/2 flex justify-center">
            {/* Adicionei 'group' e 'overflow-hidden' para o zoom funcionar dentro do limite do card */}
            <div className="group relative w-72 h-96 md:w-80 md:h-[450px] rounded-[32px] overflow-hidden border-2 border-blue-600/30 shadow-[0_0_50px_rgba(37,99,235,0.2)]">
              <Image 
                src="/linkads.jpg.jpg" 
                alt="Luis Soares"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110" // <-- EFEITO DE ZOOM AQUI
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* HISTÓRIA E PERSEVERANÇA */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black uppercase tracking-[4px] mb-10">Nossa Jornada</h2>
          <div className="space-y-6 text-zinc-400 font-medium text-lg text-justify md:text-center">
            <p>
              A LinkAds nasceu da <span className="text-white font-bold">perseverança</span>. Começamos do zero, entendendo que o iniciante no Google Ads, o gestor e o afiliado sofrem com a falta de dados claros.
            </p>
            <p>
              Como tecnólogo e desenvolvedor, minha missão em Campinas foi unir o código à estratégia. Aqui, você não apenas usa uma ferramenta, você aprende na prática como o Google Ads funciona de verdade.
            </p>
          </div>
        </div>
      </section>

      {/* CARDS DE VALORES */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[24px] hover:border-blue-600/50 transition-all group">
          <BookOpen className="text-blue-600 mb-4 transition-transform group-hover:scale-110" size={32} />
          <h3 className="text-white font-black uppercase text-sm mb-2 tracking-widest">Iniciantes</h3>
          <p className="text-zinc-500 text-xs uppercase font-bold leading-relaxed">Experiência real sem queimar dinheiro à toa.</p>
        </div>

        <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[24px] hover:border-blue-600/50 transition-all group">
          <Target className="text-blue-600 mb-4 transition-transform group-hover:scale-110" size={32} />
          <h3 className="text-white font-black uppercase text-sm mb-2 tracking-widest">Gestores</h3>
          <p className="text-zinc-500 text-xs uppercase font-bold leading-relaxed">Scanner de performance para escalar resultados.</p>
        </div>

        <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[24px] hover:border-blue-600/50 transition-all group">
          <Rocket className="text-blue-600 mb-4 transition-transform group-hover:scale-110" size={32} />
          <h3 className="text-white font-black uppercase text-sm mb-2 tracking-widest">Afiliados</h3>
          <p className="text-zinc-500 text-xs uppercase font-bold leading-relaxed">Aprenda na prática com quem vive o campo de batalha.</p>
        </div>
      </section>
    </div>
  );
}