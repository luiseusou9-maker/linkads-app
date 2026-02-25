// @ts-nocheck
'use client'
import { useState } from 'react'
// CORREÇÃO: Usando o import oficial que o seu Windows aceitou
import { createClient } from '@/lib/supabase' 
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CadastroPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Inicializa o cliente do Supabase
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage(`❌ ${error.message}`)
      setLoading(false)
    } else {
      setMessage('📧 Sucesso! Configurando seu arsenal...')
      
      // REDIRECIONAMENTO UNIFICADO: Mandando para /plans (padrão do projeto)
      setTimeout(() => {
        router.push('/plans')
      }, 2000)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 font-sans relative overflow-hidden">
      
      {/* BACKGROUND DE ELITE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 blur-[120px] rounded-full opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-10 bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 mb-6 bg-blue-600/10 border border-blue-500/20 rounded-full">
            <span className="text-blue-500 text-[9px] font-black tracking-[3px] uppercase italic">Iniciando Protocolo V3</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
            LinkAds<span className="text-blue-600">V3</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-3 italic">Crie seu acesso de estrategista</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="text-white text-[10px] font-black uppercase tracking-widest ml-1 mb-2 block">Seu melhor e-mail</label>
            <input 
              type="email"
              placeholder="exemplo@ads.com"
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-zinc-700 font-medium"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-white text-[10px] font-black uppercase tracking-widest ml-1 mb-2 block">Senha de Acesso</label>
            <input 
              type="password"
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-zinc-700 font-medium"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            disabled={loading}
            className="group relative w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.3)] flex justify-center items-center uppercase tracking-[3px] text-sm"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Finalizar e Criar Conta'
            )}
          </button>
        </form>

        {message && (
          <div className={`mt-8 p-5 rounded-2xl border text-center text-[11px] font-black uppercase tracking-widest transition-all animate-bounce ${message.includes('❌') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.1)]'}`}>
            {message}
          </div>
        )}

        <div className="text-center mt-10 pt-8 border-t border-white/5">
          <Link href="/login" className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors italic">
            Já possui uma licença? <span className="text-blue-500 underline decoration-blue-900 underline-offset-4">Entrar agora</span>
          </Link>
        </div>
      </div>
    </div>
  )
}