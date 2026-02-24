// @ts-nocheck
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  // Trava de segurança: define as rotas onde o footer NÃO deve aparecer
  const publicRoutes = ['/', '/login', '/cadastro']
  if (publicRoutes.includes(pathname)) return null

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">LINK<span className="text-blue-600">ADS</span></h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed text-blue-500/80">
              By Luiz Soares - Tecnologia e Marketing Digital.
            </p>
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Engine de Performance e Inteligência em Google Ads.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[4px] mb-8">Navegação</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <li><Link href="/dashboard" className="hover:text-blue-500 transition-colors">Cockpit</Link></li>
              <li><Link href="/mechanic" className="hover:text-blue-500 transition-colors">Mechanic Pro</Link></li>
              <li><Link href="/raio-x" className="hover:text-blue-500 transition-colors">Raio-X Scanner</Link></li>
              <li><Link href="/planos" className="hover:text-blue-500 transition-colors">Nossos Planos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[4px] mb-8">Suporte</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <li><Link href="/faq" className="hover:text-blue-500 transition-colors">Perguntas Frequentes</Link></li>
              <li><Link href="/contato" className="hover:text-blue-500 transition-colors">Falar com Suporte</Link></li>
              <li><Link href="/perfil" className="hover:text-blue-500 transition-colors">Configurações</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[4px] mb-8">Institucional</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              {/* ✅ QUEM SOMOS ADICIONADO AQUI */}
              <li><Link href="/quem-somos" className="text-blue-500 hover:text-white transition-colors">Quem Somos</Link></li>
              <li><Link href="/privacidade" className="hover:text-blue-500 transition-colors">Privacidade</Link></li>
              <li><Link href="/termos" className="hover:text-blue-500 transition-colors">Termos de Uso</Link></li>
              <li><Link href="/" className="hover:text-blue-500 transition-colors">Home Oficial</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black text-zinc-600 uppercase tracking-[4px]">
          <p>© 2026 LINKADS ENGINE - TODOS OS DIREITOS RESERVADOS</p>
          <div className="flex gap-6">
            <span>Server Status: <span className="text-green-500">Online</span></span>
            <span>Campinas - SP</span>
          </div>
        </div>
      </div>
    </footer>
  )
}