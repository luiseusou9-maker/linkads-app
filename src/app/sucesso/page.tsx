// @ts-nocheck
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { createBrowserClient } from '@supabase/ssr'

export default function SucessoPage() {
  const [mounted, setMounted] = useState(false)

  // Inicializa o Supabase com as variáveis de ambiente
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    setMounted(true)
    
    // --- LÓGICA DE SINCRONIZAÇÃO (Garante que o front veja o que o Webhook fez) ---
    const sincronizarInterface = async () => {
      try {
        // 1. Limpamos o cache local para forçar a Navbar a ler o banco real
        localStorage.removeItem('user_plano')

        // 2. Buscamos o perfil atualizado para confirmar que o Webhook já trabalhou
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('plano')
            .eq('id', user.id)
            .single()
          
          console.log("💎 Status do Arsenal Atualizado:", profile?.plano?.toUpperCase())
        }
      } catch (err) {
        console.error("❌ Erro na sincronização visual:", err)
      }
    }

    sincronizarInterface()
    
    // --- EXPLOSÃO DE SUCESSO (Confetti) ---
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#ffffff', '#1e3a8a']
    })
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center relative overflow-x-hidden pt-40 pb-20 px-6">
      
      {/* GLOW DE FUNDO */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full"></div>
      </div>

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        
        {/* DIAMANTE MONSTRO */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-30 animate-pulse"></div>
          
          <div className="relative animate-[float_4s_ease-in-out_infinite]">
            <svg width="160" height="160" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M128 240L30 100H226L128 240Z" fill="#1e40af" />
              <path d="M30 100L75 30H181L226 100H30Z" fill="#3b82f6" />
              <path d="M75 30L128 100L181 30H75Z" fill="#60a5fa" fillOpacity="0.5" />
              <path d="M30 100L128 240L75 100H30Z" fill="white" fillOpacity="0.1" />
              <path d="M226 100L128 240L181 100H226Z" fill="black" fillOpacity="0.2" />
              <path d="M128 240L30 100L75 30H181L226 100L128 240Z" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
              <path d="M30 100H226M75 30L128 100M181 30L128 100M128 100V240" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
            </svg>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-blue-500/50"></div>
            <span className="text-blue-400 font-black uppercase tracking-[10px] text-[10px]">Acesso Liberado</span>
            <div className="h-[1px] w-8 bg-blue-500/50"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none text-white">
            CONTA <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-800 drop-shadow-[0_10px_30px_rgba(37,99,235,0.5)]">BLINDADA</span>
          </h1>

          <div className="max-w-xl mx-auto py-4">
            <p className="text-xl md:text-2xl font-light italic text-zinc-400 leading-relaxed">
              "Sincronização concluída. O <span className="text-white font-black underline decoration-blue-500/30">Arsenal V3</span> agora responde ao seu comando."
            </p>
          </div>
        </div>

        {/* BOTÃO PARA O DASHBOARD */}
        <div className="mt-12 w-full max-w-sm">
          <Link href="/dashboard" className="group relative block">
            <div className="absolute -inset-1 bg-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            <button className="relative w-full py-6 bg-white text-black rounded-2xl font-[1000] uppercase tracking-[8px] text-sm italic transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-2xl">
              Entrar no Arsenal
            </button>
          </Link>
        </div>

        <div className="mt-24 opacity-10">
          <p className="text-[9px] font-black uppercase tracking-[15px]">LINKADS_SECURE_ACCESS_V3</p>
        </div>

      </main>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        body { background-color: #020202; }
      `}</style>
    </div>
  )
}