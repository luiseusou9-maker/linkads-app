// @ts-nocheck
'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase' 
import { ShieldCheck, Zap, Clock, ArrowRight, Camera, CheckCircle2 } from 'lucide-react'

export default function PerfilPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false) 
  
  const [tipoPessoa, setTipoPessoa] = useState<'PF' | 'PJ'>('PF')
  const [nivel, setNivel] = useState('Gestor de Elite')
  const [plano, setPlano] = useState('free') 
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [diasRestantes, setDiasRestantes] = useState(30)
  
  const [formData, setFormData] = useState({
    nome: '',
    documento: '',
    empresa: '',
    cargo: '',
    whatsapp: '',
    emailNotificacao: ''
  })

  const loadPerfil = useCallback(async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) return router.push('/login')

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setFormData({
          nome: data.nome || '',
          documento: data.documento || '',
          empresa: data.empresa || '',
          cargo: data.cargo || '',
          whatsapp: data.whatsapp || '',
          emailNotificacao: data.email_notificacao || ''
        })
        setTipoPessoa(data.tipo_pessoa || 'PF')
        setNivel(data.nivel_operacao || 'Gestor de Elite')
        const planoAtivo = String(data.plano || 'free').toLowerCase()
        setPlano(planoAtivo)
        setAvatarUrl(data.avatar_url || null)
        
        // Sincroniza o localStorage caso o usuário tenha vindo de um upgrade
        localStorage.setItem('user_plano', planoAtivo)

        const criadoEm = new Date(data.created_at || new Date())
        const hoje = new Date()
        const diff = Math.floor((hoje.getTime() - criadoEm.getTime()) / (1000 * 60 * 60 * 24))
        setDiasRestantes(Math.max(0, 30 - diff))
      }
    } catch (err) {
      console.error("Erro crítico:", err)
    } finally {
      setLoading(false)
    }
  }, [supabase, router])

  useEffect(() => { loadPerfil() }, [loadPerfil])

  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Sessão expirada')

      if (!event.target.files || event.target.files.length === 0) return

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}/${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      if (updateError) throw updateError
      
      setAvatarUrl(publicUrl)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

    } catch (error: any) {
      console.error(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSalvarPerfil = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')

      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        nome: formData.nome,
        documento: formData.documento,
        empresa: formData.empresa,
        cargo: formData.cargo,
        whatsapp: formData.whatsapp,
        email_notificacao: formData.emailNotificacao,
        tipo_pessoa: tipoPessoa,
        nivel_operacao: nivel,
        plano: plano,
        updated_at: new Date().toISOString()
      })

      if (error) throw error
      
      // Garante que a Navbar saiba do plano antes de redirecionar
      localStorage.setItem('user_plano', plano)
      
      router.push('/planos')
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-blue-600 font-black italic animate-pulse tracking-[10px]">INICIALIZANDO SISTEMA...</div>

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] -z-10"></div>
      
      <main className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 border-b border-white/5 pb-10">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white leading-none">
              Configuração <br/><span className="text-blue-600 italic">Global Ads</span>
            </h2>
            <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
               <div className="px-3 py-1 bg-blue-600/10 border border-blue-600/30 rounded-full flex items-center gap-2">
                  <Zap size={10} className="text-blue-500 fill-blue-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">Membro: {plano.toUpperCase()}</span>
               </div>
               {plano === 'free' && (
                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{diasRestantes} dias de teste</span>
               )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-zinc-900/30 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <button type="button" onClick={() => setTipoPessoa('PF')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tipoPessoa === 'PF' ? 'bg-blue-600 text-white' : 'text-zinc-500'}`}>Pessoa Física</button>
            <button type="button" onClick={() => setTipoPessoa('PJ')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tipoPessoa === 'PJ' ? 'bg-blue-600 text-white' : 'text-zinc-500'}`}>Pessoa Jurídica</button>
          </div>
        </div>

        <form onSubmit={handleSalvarPerfil} className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-900/20 border border-white/5 p-10 rounded-[50px] flex flex-col items-center text-center backdrop-blur-sm relative overflow-hidden">
              
              <label className="relative group cursor-pointer">
                <div className={`w-40 h-40 bg-zinc-950 rounded-full border-2 transition-all duration-500 ${uploading ? 'border-blue-600 animate-pulse scale-95' : showSuccess ? 'border-green-500 scale-105' : 'border-dashed border-zinc-700 group-hover:border-blue-500' } flex items-center justify-center overflow-hidden shadow-2xl`}>
                  {avatarUrl ? (
                    <img src={avatarUrl} className="w-full h-full object-cover" />
                  ) : (
                    <ShieldCheck size={40} className="text-zinc-800" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
              </label>

              <div className="h-6 mt-8">
                {uploading ? (
                  <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-500 animate-pulse">Criptografando...</span>
                ) : showSuccess ? (
                  <span className="text-[10px] font-black uppercase tracking-[3px] text-green-500 flex items-center gap-2">
                    <CheckCircle2 size={12} /> Sincro Concluída
                  </span>
                ) : (
                  <h4 className="text-xl font-black uppercase italic text-white tracking-tighter">Avatar Perfil</h4>
                )}
              </div>
              
              <div className="mt-8 w-full">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 block italic text-center">Nível de Expertise</label>
                <select value={nivel} onChange={(e) => setNivel(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-4 text-[10px] font-black uppercase tracking-[2px] text-blue-500 outline-none text-center appearance-none cursor-pointer hover:border-blue-600 transition-colors">
                  <option value="Iniciante">🌱 Iniciante</option>
                  <option value="Afiliado">🚀 Afiliado / Drop</option>
                  <option value="Gestor de Elite">🏆 Gestor de Elite</option>
                  <option value="Agencia">🏢 Agência / Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-zinc-900/10 border border-white/5 p-12 rounded-[50px] space-y-10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-zinc-400 ml-2 italic">Nome Completo</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-2xl py-5 px-6 focus:border-blue-600 outline-none text-white font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-zinc-400 ml-2 italic">{tipoPessoa === 'PF' ? 'CPF' : 'CNPJ'}</label>
                <input type="text" name="documento" value={formData.documento} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-2xl py-5 px-6 focus:border-blue-600 outline-none text-white font-mono" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-zinc-400 ml-2 italic">Empresa / Business</label>
                <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-2xl py-5 px-6 focus:border-blue-600 outline-none text-white font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-zinc-400 ml-2 italic">Cargo</label>
                <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-2xl py-5 px-6 focus:border-blue-600 outline-none text-white font-bold" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-zinc-400 ml-2 italic">WhatsApp Suporte</label>
                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-2xl py-5 px-6 focus:border-blue-600 outline-none text-white font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-zinc-400 ml-2 italic">E-mail para Alertas</label>
                <input type="email" name="emailNotificacao" value={formData.emailNotificacao} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-2xl py-5 px-6 focus:border-blue-600 outline-none text-zinc-300 font-bold" />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={isSaving} className="group relative w-full overflow-hidden rounded-2xl bg-white p-[1.5px] transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <div className="relative flex items-center justify-center gap-4 bg-[#0a0a0a] py-5 rounded-2xl transition-all group-hover:bg-transparent">
                  <span className={`text-[12px] font-[1000] uppercase tracking-[6px] italic transition-colors ${isSaving ? 'text-zinc-700' : 'text-white group-hover:text-black'}`}>
                    {isSaving ? 'SINCRONIZANDO...' : 'SALVAR E PROSSEGUIR'}
                  </span>
                  {!isSaving && <ArrowRight size={16} className="text-blue-600 group-hover:text-black transition-colors" />}
                </div>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}