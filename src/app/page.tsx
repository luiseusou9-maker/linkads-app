// @ts-nocheck
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ShieldCheck, Zap, Target, Users, Lock, BarChart3, Search, ArrowRight, Cpu, Activity } from 'lucide-react'

export default function HomePage() {
  const [dots, setDots] = useState('...')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '.' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 overflow-x-hidden">
      
      {/* FUNDO PRETO ABSOLUTO - ZERO QUEBRA */}
      <div className="fixed inset-0 bg-black z-[-2]"></div>

      {/* TEXTURA E LUZ DE FUNDO PREMIUM */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] rounded-full opacity-50"></div>
      </div>

      {/* HEADER INTEGRADO */}
      <header className="relative z-50 flex justify-between items-center px-8 md:px-20 py-10 bg-transparent">
        <div className="flex items-center gap-3 group">
          <div className="w-11 h-11 border-2 border-blue-600 rounded-xl flex items-center justify-center font-[1000] text-blue-600 text-2xl italic shadow-[0_0_20px_rgba(37,99,235,0.2)]">L</div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-[1000] tracking-tight uppercase">LinkAds</span>
            <span className="text-blue-600 font-black text-[9px] tracking-[4px] uppercase italic">Arsenal V3</span>
          </div>
        </div>
        
        <Link href="/login" className="px-6 py-2.5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[2px] hover:bg-white hover:text-black transition-all duration-500">
          LOGIN / ACESSO
        </Link>
      </header>

      {/* HERO SECTION */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40 text-center">
        
        <div className="inline-flex items-center gap-3 px-5 py-2 mb-10 bg-zinc-900/50 border border-blue-500/20 rounded-full">
          <Activity size={12} className="text-blue-500 animate-pulse" />
          <span className="text-blue-400 text-[10px] font-black tracking-[4px] uppercase italic">
             PROTOCOLO DE ENGENHARIA ATIVO {dots}
          </span>
        </div>

        <div className="mb-14">
          <h2 className="text-[42px] md:text-[85px] font-[1000] leading-[0.95] tracking-[-3px] text-white uppercase italic">
            ENGENHARIA DE ELITE <br />
            <span className="text-blue-600">PARA SUAS CAMPANHAS</span>
          </h2>
          <p className="mt-8 text-zinc-500 text-lg md:text-xl max-w-3xl mx-auto font-bold italic uppercase tracking-tight">
             O LINKADS V3 É O SISTEMA DE <span className="text-white underline decoration-blue-600 underline-offset-4">VARREDURA TÉCNICA</span> PARA QUEM EXIGE PERFORMANCE E BLINDAGEM DE VERBA.
          </p>
        </div>

        {/* BOTÃO CENTRAL CORRIGIDO - ROTA /LOGIN */}
        <div className="group relative inline-block w-full max-w-md mb-48">
          <div className="absolute -inset-1 bg-blue-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-60 transition duration-700"></div>
          <Link href="/login" className="relative flex items-center justify-center gap-4 bg-black border-2 border-blue-600 text-white font-[1000] py-6 rounded-2xl transition-all uppercase tracking-[4px] text-lg shadow-2xl hover:bg-blue-600 group overflow-hidden active:scale-95">
             <span className="relative z-10">INICIAR TESTE GRATUITO</span>
             <Zap size={20} className="group-hover:fill-white transition-all relative z-10" />
          </Link>
          <div className="mt-6 flex justify-center gap-8 opacity-30 text-[9px] font-black uppercase tracking-[3px] italic">
              <span>Google API Cloud</span>
              <span>•</span>
              <span>Sem Cartão</span>
              <span>•</span>
              <span>30 Dias Grátis</span>
          </div>
        </div>

        {/* BLOCOS DE PRODUTO - EFEITOS DE BORDA NEON */}
        <div className="grid lg:grid-cols-2 gap-8 w-full mb-64 text-left">
          <TechCard 
              title="RAIO-X SCANNER"
              desc="Scanneamos furos de pixel, orçamentos mal distribuídos e falhas invisíveis que impedem sua escala vertical."
              icon={<Search size={32} />}
              badge="SCAN"
          />
          <TechCard 
              title="MECÂNICO PRO"
              desc="Ação direta via API. Reconfiguramos lances e eliminamos tráfego sujo para blindar seu ROI imediatamente."
              icon={<Cpu size={32} />}
              badge="FIX"
          />
        </div>

        {/* DOMÍNIO PARA PROFISSIONAIS */}
        <div className="w-full mb-64">
           <h3 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter text-white mb-20">
              DOMÍNIO PARA <span className="text-blue-600">PROFISSIONAIS.</span>
           </h3>
           <div className="grid md:grid-cols-3 gap-6">
              <TargetBox 
                  icon={<Zap size={24} />}
                  title="INICIANTES"
                  text="Proteja seu capital. Configure sua conta com precisão cirúrgica desde o primeiro dia de tráfego."
              />
              <TargetBox 
                  icon={<Users size={24} />}
                  title="GESTORES PRO"
                  text="Ganhe velocidade operacional. Audite contas complexas em segundos via automação de elite."
              />
              <TargetBox 
                  icon={<BarChart3 size={24} />}
                  title="AFILIADOS & DROP"
                  text="ROI Blindado. Saiba onde sua página está falhando e pare de atrair cliques que não convertem."
              />
           </div>
        </div>

        {/* SEGURANÇA */}
        <section className="w-full bg-zinc-950/50 border border-white/5 rounded-[40px] p-12 md:p-20 relative overflow-hidden text-left mb-20 shadow-2xl">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-500 text-[9px] font-black uppercase tracking-[4px] mb-8">
              <Lock size={14} /> PRIVACIDADE GOOGLE OAUTH 2.0
            </div>
            <h3 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter leading-none text-white mb-8">
              DADOS <span className="text-zinc-800 text-glow">INVIOLÁVEIS.</span>
            </h3>
            <p className="text-zinc-500 text-lg font-bold italic uppercase tracking-tighter leading-snug">
              O LinkAds nunca armazena suas senhas. A conexão é feita por <span className="text-white underline decoration-blue-600 decoration-2 underline-offset-4">Tokens Oficiais do Google</span>, garantindo segurança absoluta.
            </p>
          </div>
        </section>

        {/* ASSINATURA FINAL - SEM MENU */}
        <div className="w-full pt-10 border-t border-white/5 opacity-10">
           <p className="text-[10px] font-black uppercase tracking-[20px]">LINKADS ARSENAL V3 • 2026</p>
        </div>
      </main>
    </div>
  )
}

function TechCard({ title, desc, icon, badge }: any) {
  return (
    <div className="group relative p-12 bg-zinc-950/30 border border-white/5 rounded-[40px] hover:border-blue-600 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] transition-all duration-500 cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500"></div>
      
      <div className="relative z-10">
        <div className="absolute top-0 right-0 text-white/5 text-6xl font-[1000] italic uppercase tracking-tighter group-hover:text-blue-600/10 transition-all">{badge}</div>
        <div className="mb-10 w-20 h-20 bg-black border border-white/10 rounded-[25px] flex items-center justify-center text-blue-600 shadow-xl group-hover:border-blue-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-4xl font-[1000] mb-6 uppercase italic tracking-tighter text-white group-hover:text-blue-500 transition-colors leading-none">{title}</h3>
        <p className="text-zinc-500 text-lg font-black italic uppercase tracking-tighter leading-relaxed transition-colors group-hover:text-zinc-400">{desc}</p>
      </div>
    </div>
  )
}

function TargetBox({ icon, title, text }: any) {
  return (
    <div className="p-10 bg-black border border-white/5 rounded-[35px] hover:border-blue-600/50 transition-all duration-500 group text-left relative overflow-hidden">
      {/* LINHA NEON SUTIL NO TOPO */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* ÍCONE AJUSTADO: NÃO FICA MAIS AZULZÃO NO FUNDO */}
        <div className="mb-8 w-14 h-14 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-blue-600 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-500">
          <div className="text-blue-600 group-hover:text-white transition-colors duration-500">
            {icon}
          </div>
        </div>
        
        <h5 className="text-white text-2xl font-[1000] mb-4 uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors duration-500">
          {title}
        </h5>
        
        <p className="text-zinc-600 text-[12px] font-black uppercase tracking-widest leading-relaxed italic group-hover:text-zinc-400 transition-colors duration-500">
          {text}
        </p>
      </div>
    </div>
  )
}