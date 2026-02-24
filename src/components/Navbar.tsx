// @ts-nocheck
'use client'
import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import { 
  User, Settings, LogOut, Zap, ChevronDown, Shield, 
  FileText, Home, LayoutDashboard, Search, Wrench, Crown, ArrowUpRight,
  UserCircle // Adicionei esse ícone para o Quem Somos
} from 'lucide-react'

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const { profile, isPro, loading } = useAuthStatus()

  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatarUrl(`${profile.avatar_url}?t=${new Date().getTime()}`)
    }
  }, [profile])

  const handleLogout = async () => {
    localStorage.removeItem('user_plano')
    await supabase.auth.signOut()
    router.push('/login')
  }

  const publicRoutes = ['/', '/login', '/cadastro']
  if (publicRoutes.includes(pathname)) return null

  const planoLabel = profile?.plano?.toUpperCase() || 'FREE'

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.4)]">
            <Zap size={20} className="text-white" fill="currentColor" />
          </div>
          <span className="text-xl font-[1000] italic tracking-tighter uppercase text-white">
            LINK<span className="text-blue-600">ADS</span>
          </span>
        </Link>

        {/* MENU CENTRAL */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/dashboard" label="Cockpit" icon={<LayoutDashboard size={13}/>} active={pathname === '/dashboard'} />
          <NavLink href="/mechanic" label="Mechanic" icon={<Wrench size={13}/>} active={pathname === '/mechanic'} />
          <NavLink href="/raio-x" label="Raio-X" icon={<Search size={13}/>} active={pathname === '/raio-x'} />
          
          <div className="relative ml-4 group" onMouseEnter={() => setLegalOpen(true)} onMouseLeave={() => setLegalOpen(false)}>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] text-zinc-400 hover:text-white transition-all py-8 outline-none">
              Legal <ChevronDown size={12} className={`transition-transform duration-300 ${legalOpen ? 'rotate-180 text-blue-500' : ''}`} />
            </button>
            {legalOpen && (
              <div className="absolute top-[72px] left-0 w-56 bg-[#0a0a0a] border border-white/10 rounded-[24px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 backdrop-blur-2xl">
                {/* 🚀 NOVO LINK: QUEM SOMOS */}
                <SubLink href="/quem-somos" icon={<UserCircle size={14}/>} label="Quem Somos" />
                
                <div className="h-[1px] bg-white/5 my-1 mx-2"></div>
                <SubLink href="/privacidade" icon={<Shield size={14}/>} label="Privacidade" />
                <SubLink href="/termos" icon={<FileText size={14}/>} label="Termos de Uso" />
                <div className="h-[1px] bg-white/5 my-2 mx-2"></div>
                <SubLink href="/" icon={<Home size={14}/>} label="Voltar à Home" />
              </div>
            )}
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className="flex items-center gap-6">
          {!isPro && !loading && (
            <Link 
              href="/planos" 
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/30 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-500 hover:bg-blue-600 hover:text-white transition-all animate-pulse"
            >
              Fazer Upgrade <ArrowUpRight size={14} />
            </Link>
          )}

          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-1.5 pr-4 bg-zinc-900/50 border border-white/5 rounded-full hover:border-blue-500/50 transition-all outline-none">
              <div className="w-8 h-8 rounded-full bg-blue-600 overflow-hidden border border-white/10 flex items-center justify-center relative">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="User Profile" 
                    className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300" 
                  />
                ) : (
                  <User size={16} className="text-white" />
                )}
              </div>
              <ChevronDown size={14} className={`text-zinc-500 transition-transform ${profileOpen ? 'rotate-180 text-blue-500' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-4 w-64 bg-[#0a0a0a] border border-white/10 rounded-[28px] p-3 shadow-[0_30px_60px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200">
                <div className="px-4 py-3 mb-2 border-b border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Sessão Ativa</p>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase italic flex items-center gap-1 ${isPro ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                      {isPro && <Crown size={8} />} {planoLabel}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-white truncate">{profile?.email || 'Carregando...'}</p>
                </div>

                <Link href="/perfil" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-2xl text-[10px] font-black uppercase text-white transition-all group">
                  <Settings size={14} className="text-blue-500 group-hover:rotate-90 transition-transform duration-500"/> Configurações
                </Link>

                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-red-500/10 rounded-2xl text-[10px] font-black uppercase text-red-500 mt-2 border-t border-white/5 transition-all text-left">
                  <LogOut size={14}/> Encerrar Terminal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, label, icon, active }: { href: string, label: string, icon?: ReactNode, active: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[2px] transition-all duration-300 ${active ? 'text-blue-500 bg-blue-500/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
      {icon} {label}
    </Link>
  )
}

function SubLink({ href, icon, label }: { href: string, icon: ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 hover:bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all group">
      <span className="text-zinc-500 group-hover:text-white transition-colors">{icon}</span> {label}
    </Link>
  )
}