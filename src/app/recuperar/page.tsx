'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) setMessage(`❌ ${error.message}`)
    else setMessage('📧 Link de recuperação enviado para seu e-mail!')
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md p-8 bg-[#0a0a0a] border border-zinc-800 rounded-2xl">
        <h1 className="text-2xl font-bold text-white mb-2">Recuperar Senha</h1>
        <p className="text-zinc-500 text-sm mb-8">Insira seu e-mail para receber o link de acesso.</p>
        
        <form onSubmit={handleReset} className="space-y-4">
          <input 
            type="email"
            placeholder="Seu e-mail profissional"
            className="w-full bg-[#111] border border-zinc-800 rounded-xl px-4 py-4 text-white focus:border-blue-600 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            {loading ? 'ENVIANDO...' : 'ENVIAR LINK DE RECUPERAÇÃO'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-blue-400 font-medium">{message}</p>}

        <div className="mt-8 text-center border-t border-zinc-900 pt-6">
           <Link href="/login" className="text-blue-500 text-sm font-bold">Voltar para o Login</Link>
        </div>
      </div>
    </div>
  )
}