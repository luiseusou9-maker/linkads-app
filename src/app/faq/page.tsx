// @ts-nocheck
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { HelpCircle, ChevronDown, Mail, ShieldCheck, Zap, Cpu, Search, EyeOff } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: "O LINKADS V3 PODE ALTERAR MEU ORÇAMENTO DIÁRIO?",
      a: "Não. Em total conformidade com as políticas de transparência do Google, o LinkAds V3 não possui autonomia para alterar valores de investimento ou orçamentos diários. Nós fornecemos diagnósticos financeiros e sugestões de otimização, mas o controle do seu caixa permanece 100% nas suas mãos."
    },
    {
      q: "A FERRAMENTA MEXE NO MEU SITE OU PÁGINAS DE PRODUTO?",
      a: "Absolutamente não. Nossa engenharia opera exclusivamente via API oficial dentro do ecossistema do Google Ads. Não realizamos alterações em sites, páginas de vendas, tipos de serviços ou qualquer estrutura externa ao painel de anúncios."
    },
    {
      q: "COMO FUNCIONA O RAIO-X SCANNER PARA INICIANTES?",
      a: "O Raio-X Scanner é um tradutor de dados. Ele analisa o ID da sua campanha e transforma métricas complexas em um relatório didático. Ele identifica erros de pixel e palavras-chave ruins, entregando sugestões assertivas para que o iniciante saiba exatamente o que ajustar para parar de perder dinheiro."
    },
    {
      q: "O QUE O MECHANIC PRO EXECUTA NA MINHA CONTA?",
      a: "Diferente do Raio-X (que diagnostica), o Mechanic Pro executa a manutenção técnica. Ele limpa o tráfego sujo, remove termos de busca irrelevantes e ajusta lances técnicos para garantir que seu anúncio seja entregue com precisão, sem desperdício de cliques."
    },
    {
      q: "MINHAS SENHAS DO GOOGLE ESTÃO SEGURAS?",
      a: "Sim. Utilizamos o protocolo Google OAuth 2.0. Isso significa que você nunca digita sua senha do Google no LinkAds. A conexão é feita através de tokens oficiais e criptografados do próprio Google, que podem ser revogados por você a qualquer momento."
    },
    {
      q: "O SISTEMA PODE PAUSAR MINHAS CAMPANHAS SOZINHO?",
      a: "Não. O LinkAds atua como um copiloto de engenharia. Ele identifica gargalos e aplica melhorias na qualidade do tráfego, mas decisões estratégicas como pausar ou ativar campanhas são de total responsabilidade do usuário."
    },
    {
      q: "PRECISO SER UM ESPECIALISTA PARA USAR O ARSENAL V3?",
      a: "Não, pelo contrário. O Arsenal V3 foi desenhado para quem está começando. Nossa Engine mastiga os dados difíceis do Google Ads e entrega o 'caminho das pedras' de forma simples, para que qualquer pessoa consiga ter uma conta configurada como a de um profissional."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 font-sans relative overflow-hidden">
      {/* Efeito de iluminação de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* HEADER DA PÁGINA */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600/10 border border-blue-600/30 rounded-full text-blue-500 text-[10px] font-black uppercase tracking-[5px]">
            <HelpCircle size={14} /> Knowledge Base LinkAds
          </div>
          <h1 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none text-white">
            DÚVIDAS <br /> <span className="text-blue-600">FREQUENTES</span>
          </h1>
          <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest max-w-xl mx-auto leading-relaxed italic">
            Transparência total. Entenda como nossa Engine de engenharia técnica protege e otimiza sua operação no Google Ads.
          </p>
        </div>

        {/* ACORDEÃO DE PERGUNTAS */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`group border transition-all duration-300 rounded-[32px] overflow-hidden ${
                openIndex === index 
                ? 'border-blue-600 bg-zinc-900/40' 
                : 'border-white/10 bg-zinc-950 hover:border-white/30'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex justify-between items-center text-left"
              >
                <span className={`text-sm md:text-base font-black uppercase tracking-wider transition-colors ${
                  openIndex === index ? 'text-blue-500' : 'text-white'
                }`}>
                  {faq.q}
                </span>
                <div className={`p-2 rounded-full transition-all ${openIndex === index ? 'bg-blue-600 rotate-180' : 'bg-white/5'}`}>
                   <ChevronDown size={18} className={openIndex === index ? 'text-white' : 'text-zinc-500'} />
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="border-t border-white/5 pt-6">
                    <p className="text-zinc-300 text-sm md:text-base font-medium leading-relaxed italic uppercase tracking-tight">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CONTATO DIRETO - SUPORTE */}
        <div className="bg-white text-black p-12 rounded-[50px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden">
          <Zap className="absolute -right-6 -bottom-6 text-black/5" size={150} />
          
          <div className="space-y-3 relative z-10">
            <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter leading-none">Ainda precisa <br/> de ajuda?</h3>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest italic">Tempo médio de resposta: 2h úteis.</p>
          </div>

          <Link 
            href="/contato"
            className="px-10 py-6 bg-blue-600 text-white rounded-[24px] font-[1000] uppercase text-xs tracking-[4px] hover:bg-black transition-all flex items-center gap-4 shadow-xl active:scale-95 group relative z-10"
          >
            <Mail size={20} className="group-hover:animate-bounce" /> Abrir Ticket de Suporte
          </Link>
        </div>

      </div>
    </div>
  )
}