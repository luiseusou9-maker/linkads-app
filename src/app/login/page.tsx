// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase' 
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    setIsMounted(true)
    // Removi a verificação automática que te jogava para o perfil antes da hora
  }, [])

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          // Redireciona para o callback para processar os dados antes de ir ao perfil
          redirectTo: `${window.location.origin}/auth/callback?next=/perfil`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account', // OBRIGA o Google a perguntar qual conta usar
          },
        },
      })
      if (error) throw error
    } catch (error) {
      console.error("Erro Google Login:", error.message)
      alert("Erro ao conectar com Google")
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert(`Erro: ${error.message}`)
      } else if (data.user) {
        // Login manual enviando direto para o perfil
        router.push('/perfil')
        router.refresh() 
      }
    } catch (err) {
      console.error("Erro na autenticação:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex justify-center items-start px-4 overflow-y-auto py-20 sm:py-32 custom-scrollbar">
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full opacity-60"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="w-full max-w-md p-8 md:p-12 bg-[#0a0a0a] border border-white/5 rounded-[50px] shadow-[0_0_80px_rgba(0,0,0,1)] relative z-10 backdrop-blur-2xl">
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center font-[1000] text-3xl shadow-[0_0_40px_rgba(37,99,235,0.4)] text-white rotate-3 text-center">L</div>
          <h1 className="text-4xl font-[1000] text-white tracking-tighter uppercase italic leading-none text-center">
            LinkAds<span className="text-blue-600">V3</span>
          </h1>
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[5px] mt-5 text-center">Acesso ao Terminal de Comando</p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-4 w-full bg-white text-black font-[1000] py-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all mb-10 text-[10px] uppercase tracking-[2px] shadow-xl active:scale-95"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
          Conectar via Google API
        </button>

        <div className="flex items-center gap-5 mb-10">
          <div className="h-[1px] bg-white/5 flex-1"></div>
          <span className="text-zinc-800 text-[8px] font-black uppercase tracking-[4px]">Criptografia Manual</span>
          <div className="h-[1px] bg-white/5 flex-1"></div>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <input 
            type="email"
            placeholder="E-MAIL DE ACESSO"
            className="w-full bg-zinc-900/30 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-blue-600 outline-none transition-all text-sm font-medium placeholder:text-zinc-800"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input 
            type="password"
            placeholder="PASSWORD"
            className="w-full bg-zinc-900/30 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-blue-600 outline-none transition-all text-sm font-medium placeholder:text-zinc-800"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-[1000] py-6 rounded-2xl transition-all shadow-lg shadow-blue-600/10 uppercase tracking-[4px] text-xs active:scale-95"
          >
            {loading ? 'Sincronizando...' : 'Autenticar'}
          </button>
        </form>

        <div className="text-center mt-12 border-t border-white/5 pt-10">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest text-center">
            Novo usuário?{' '}
            <Link href="/cadastro" className="text-blue-500 hover:text-white transition-colors underline-offset-4 underline">
              Criar Identidade Grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}