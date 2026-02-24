'use client'
import { Mail, ShieldCheck, Lock, Globe, Send, Zap, Clock } from 'lucide-react'

export default function ContatoLinksAds() {
  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* CABEÇALHO */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 rounded-full text-zinc-500 text-[10px] font-black uppercase tracking-[4px]">
            <ShieldCheck size={14} className="text-blue-500" /> Suporte Oficial LinksAds
          </div>
          <h1 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none">
            CENTRAL DE <span className="text-blue-600">CONTATO</span>
          </h1>
          <p className="text-zinc-500 text-sm italic max-w-2xl mx-auto leading-relaxed">
            Precisa de auxílio técnico ou tem dúvidas sobre sua assinatura? 
            Nosso time de engenharia está pronto para responder.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* FORMULÁRIO DE E-MAIL */}
          <div className="bg-zinc-900/20 border border-white/5 p-10 rounded-[50px] space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                <Mail className="text-blue-600" /> Protocolo de Mensagem
              </h3>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">
                Sua mensagem será enviada diretamente para nossa triagem.
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-4">Seu Nome</label>
                <input type="text" placeholder="Como devemos te chamar?" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-600 transition-all font-medium" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-4">E-mail para Retorno</label>
                <input type="email" placeholder="seuemail@exemplo.com" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-600 transition-all font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-4">Assunto</label>
                <input type="text" placeholder="Ex: Dúvida sobre o Mechanic Pro" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-600 transition-all font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-4">Mensagem Detalhada</label>
                <textarea rows={5} placeholder="Descreva sua solicitação aqui..." className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-600 transition-all font-medium resize-none"></textarea>
              </div>

              <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-[1000] uppercase text-xs tracking-[5px] transition-all flex items-center justify-center gap-3 shadow-xl">
                <Send size={18} /> ENVIAR E-MAIL AGORA
              </button>
            </form>
          </div>

          {/* INFORMAÇÕES DE CONTATO E HORÁRIOS */}
          <div className="space-y-8">
            
            {/* CARD E-MAIL OFICIAL */}
            <div className="p-10 border border-blue-600/20 bg-blue-600/5 rounded-[50px] space-y-4 relative overflow-hidden group">
               <Zap className="absolute -right-6 -bottom-6 text-blue-600/10 group-hover:scale-110 transition-transform duration-700" size={150} />
               <div className="space-y-1 relative">
                 <h4 className="font-black uppercase italic tracking-tight text-blue-500 text-xs tracking-[4px]">E-mail Corporativo</h4>
                 {/* AQUI ESTÁ O E-MAIL DO LINKSADS */}
                 <p className="text-3xl font-[1000] italic uppercase tracking-tighter break-all">suporte@linksads.com.br</p>
               </div>
               <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic pt-4">
                 <Clock size={14} /> Segunda a Sexta: 09h às 18h
               </div>
            </div>

            {/* SEÇÃO DE POLÍTICAS (COMPLIANCE) */}
            <div className="p-8 bg-zinc-900/10 border border-white/5 rounded-[40px] space-y-6">
              <h4 className="font-black uppercase italic text-xs tracking-[3px] text-zinc-300 flex items-center gap-2">
                <Lock size={16} className="text-blue-600" /> Diretrizes de Segurança
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed italic">
                Ao entrar em contato com a <strong>LinksAds</strong>, seus dados são protegidos por nossa política de privacidade. Não solicitamos senhas do Google Ads por e-mail. Toda comunicação oficial será feita exclusivamente pelo domínio @linksads.com.br.
              </p>
              
              <div className="pt-4 border-t border-white/5">
                <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[2px]">
                  LinksAds Tecnologia de Performance LTDA.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}