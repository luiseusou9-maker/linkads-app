'use client'
import Link from 'next/link'
import { SearchCode, Settings2, ShieldCheck, Activity } from 'lucide-react'
// Importando nossa lógica
import { useAuthStatus } from '@/hooks/useAuthStatus'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  // Chamando as variáveis de controle
  const { user, loading, isTrialExpired, daysRemaining } = useAuthStatus()
  const router = useRouter()

  // Enquanto carrega o banco, mostra um estado neutro para não dar pulo na tela
  if (loading) return <div className="min-h-screen bg-[#020202]" />

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center pt-32 pb-20 px-6 relative overflow-x-hidden">
      
      {/* BACKGROUND TECH */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-6xl flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 border-b border-white/5 pb-10">
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
              <span className="text-blue-500 font-black uppercase tracking-[8px] text-[10px]">
                Arsenal V3 // {isTrialExpired ? 'ACESSO EXPIRADO' : 'Operacional'}
              </span>
            </div>
            
            <div className="overflow-visible pr-20">
              <h1 className="text-5xl md:text-7xl font-[1000] italic tracking-tighter uppercase leading-[1.4] py-4">
                Painel de <span className="text-white drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)]">Comando</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-zinc-900/40 p-1 rounded-2xl border border-white/10 backdrop-blur-md shrink-0">
            <div className="px-6 py-3 flex items-center gap-3">
              <Activity size={18} className={isTrialExpired ? "text-red-500" : "text-blue-500 animate-pulse"} />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  {isTrialExpired ? 'Teste Finalizado' : 'Período de Teste'}
                </span>
                <span className="text-[11px] font-bold text-white uppercase italic">
                  {isTrialExpired ? 'Assinatura Pendente' : `${daysRemaining} Dias Restantes`}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* GRID DE FERRAMENTAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* CARD 1: RAIO X SCANNER */}
          <Link 
            href={isTrialExpired ? "#" : "/raio-x"} 
            className={`group relative ${isTrialExpired ? 'cursor-not-allowed' : ''}`}
            onClick={(e) => isTrialExpired && e.preventDefault()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[35px] blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
            
            <div className={`relative h-full bg-[#0a0a0a] border border-white/5 p-10 rounded-[35px] backdrop-blur-3xl overflow-hidden transition-all duration-500 shadow-2xl ${!isTrialExpired ? 'group-hover:-translate-y-3 group-hover:border-blue-500/40' : 'opacity-50'}`}>
              <div className="relative mb-8 w-16 h-16 flex items-center justify-center bg-blue-600/10 rounded-2xl border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-black transition-all duration-500">
                <SearchCode size={32} className="group-hover:scale-110 transition-transform" />
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-[1000] italic uppercase tracking-tighter leading-[1.4]">
                  Raio X <span className="text-blue-500">Scanner</span>
                </h3>
                <p className="text-zinc-400 text-lg font-light leading-relaxed">
                  Diagnóstico completo de campanhas. Localize erros de configuração e onde o seu dinheiro está sendo desperdiçado.
                </p>
                <div className="pt-4 flex items-center gap-2 text-blue-500">
                  <span className="text-xs font-black uppercase tracking-[4px]">
                    {isTrialExpired ? '🔒 Bloqueado' : 'Iniciar Análise →'}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* CARD 2: MECHANIC PRO */}
          <Link 
            href={isTrialExpired ? "#" : "/mechanic"} 
            className={`group relative ${isTrialExpired ? 'cursor-not-allowed' : ''}`}
            onClick={(e) => isTrialExpired && e.preventDefault()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-800 rounded-[35px] blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
            
            <div className={`relative h-full bg-[#0a0a0a] border border-white/5 p-10 rounded-[35px] backdrop-blur-3xl overflow-hidden transition-all duration-500 shadow-2xl ${!isTrialExpired ? 'group-hover:-translate-y-3 group-hover:border-blue-400/40' : 'opacity-50'}`}>
              <div className="relative mb-8 w-16 h-16 flex items-center justify-center bg-blue-400/10 rounded-2xl border border-blue-400/20 group-hover:bg-blue-400 group-hover:text-black transition-all duration-500">
                <Settings2 size={32} className="group-hover:scale-110 transition-transform" />
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-[1000] italic uppercase tracking-tighter leading-[1.4]">
                  Mechanic <span className="text-blue-400">Pro</span>
                </h3>
                <p className="text-zinc-400 text-lg font-light leading-relaxed">
                  A oficina de performance. Ajuste lances, palavras-chave e otimize sua conta com precisão cirúrgica.
                </p>
                <div className="pt-4 flex items-center gap-2 text-blue-400">
                  <span className="text-xs font-black uppercase tracking-[4px]">
                    {isTrialExpired ? '🔒 Bloqueado' : 'Abrir Oficina →'}
                  </span>
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* FOOTER - COM AVISO DE EXPIRAÇÃO */}
        <footer className={`mt-20 p-8 border rounded-[30px] backdrop-blur-md transition-all ${isTrialExpired ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/5'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-zinc-500">
              <ShieldCheck size={18} className={isTrialExpired ? "text-red-500" : "text-blue-500"} />
              <p className="text-[10px] font-black uppercase tracking-[6px]">
                {isTrialExpired ? 'Seu período de teste acabou' : 'Acesso Restrito // LinkAds Arsenal V3'}
              </p>
            </div>
            {isTrialExpired && (
              <Link href="/planos" className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                Escolher Plano
              </Link>
            )}
          </div>
        </footer>

      </main>

      <style jsx global>{`
        body { background-color: #020202; }
      `}</style>
    </div>
  )
}