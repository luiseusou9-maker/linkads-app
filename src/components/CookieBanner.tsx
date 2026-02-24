// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShieldCheck, Settings2, X } from 'lucide-react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const [view, setView] = useState<'simple' | 'detailed'>('simple')
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    personalization: false // Novo campo para conformidade total
  })

  useEffect(() => {
    // Versão v3 para forçar nova aceitação nas regras de 2026
    const consent = localStorage.getItem('linkads_consent_v3_2026')
    if (!consent) {
      setTimeout(() => setShow(true), 1500)
    }
  }, [])

  const saveConsent = (type: 'all' | 'none' | 'custom') => {
    let finalConsent;
    
    if (type === 'all') {
      finalConsent = { essential: true, analytics: true, marketing: true, personalization: true }
    } else if (type === 'none') {
      finalConsent = { essential: true, analytics: false, marketing: false, personalization: false }
    } else {
      finalConsent = preferences
    }
    
    localStorage.setItem('linkads_consent_v3_2026', JSON.stringify(finalConsent))
    
    // Aqui você integraria com o window.gtag('consent', 'update', ...)
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[999] md:left-auto md:max-w-[420px] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-black border border-white/10 p-8 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] -z-10"></div>
        
        {view === 'simple' ? (
          <>
            <div className="flex gap-5 items-start mb-8">
              <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-600/30 shrink-0">
                <ShieldCheck className="text-blue-500" size={24} />
              </div>
              <div>
                <h5 className="text-white font-[1000] uppercase italic text-sm tracking-tighter leading-none">Privacidade da Engine</h5>
                <p className="text-zinc-500 text-[10px] leading-relaxed mt-3 uppercase font-black tracking-widest">
                  Em conformidade com a LGPD e Google Consent Mode v2, usamos cookies para otimizar sua engenharia de tráfego.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => saveConsent('all')}
                className="w-full bg-white text-black font-[1000] py-5 rounded-2xl uppercase text-[11px] tracking-[3px] hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-xl"
              >
                Aceitar Tudo
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => saveConsent('none')}
                  className="bg-zinc-900 text-zinc-500 font-black py-4 rounded-2xl uppercase text-[9px] tracking-[2px] hover:text-white transition-all border border-white/5"
                >
                  Rejeitar
                </button>
                <button 
                  onClick={() => setView('detailed')}
                  className="bg-zinc-900 text-zinc-400 font-black py-4 rounded-2xl uppercase text-[9px] tracking-[2px] hover:text-blue-500 transition-all flex items-center justify-center gap-2 border border-white/5"
                >
                  <Settings2 size={12} /> Ajustar
                </button>
              </div>
              
              <Link 
                href="/privacidade" 
                className="text-[9px] text-zinc-600 font-black uppercase tracking-[3px] text-center mt-2 hover:text-zinc-400 transition-colors"
              >
                Ler Políticas de Privacidade
              </Link>
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
               <h5 className="text-white font-[1000] uppercase italic text-sm tracking-tighter">Personalizar</h5>
               <button onClick={() => setView('simple')} className="text-zinc-500 hover:text-white"><X size={16}/></button>
            </div>
            
            <div className="space-y-3">
              <CookieItem 
                title="Essenciais" 
                desc="Acesso seguro via Google OAuth" 
                checked={true} 
                disabled={true} 
              />
              <CookieItem 
                title="Performance" 
                desc="Métricas de telemetria da Engine" 
                checked={preferences.analytics} 
                onChange={() => setPreferences({...preferences, analytics: !preferences.analytics})}
              />
              <CookieItem 
                title="Marketing" 
                desc="Personalização de ofertas Ads" 
                checked={preferences.marketing} 
                onChange={() => setPreferences({...preferences, marketing: !preferences.marketing})}
              />
            </div>

            <button 
              onClick={() => saveConsent('custom')}
              className="w-full bg-blue-600 text-white font-[1000] py-5 rounded-2xl uppercase text-[11px] tracking-[3px] hover:bg-blue-500 transition-all mt-4"
            >
              Confirmar Escolhas
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CookieItem({ title, desc, checked, onChange, disabled = false }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
      <div className="max-w-[200px]">
        <h6 className="text-[10px] font-black text-white uppercase tracking-widest">{title}</h6>
        <p className="text-[8px] text-zinc-500 font-bold uppercase mt-1 leading-tight">{desc}</p>
      </div>
      <button 
        disabled={disabled}
        onClick={onChange}
        className={`w-10 h-6 rounded-full transition-all relative ${checked ? 'bg-blue-600' : 'bg-zinc-800'} ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-5' : 'left-1'}`}></div>
      </button>
    </div>
  )
}