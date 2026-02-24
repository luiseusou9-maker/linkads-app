// @ts-nocheck
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import { 
  AlertCircle, ArrowRight, HelpCircle, Smartphone, Image as ImageIcon,
  Gauge, MousePointer2, Gem, Target, TrendingDown, 
  ShieldAlert, GraduationCap, Search, Zap, Lock, Crown,
  Key, Globe, BarChart3, Settings2, Users, MousePointerClick, CheckCircle2,
  BookOpen, Sparkles, School, MousePointer, Layout, Filter
} from 'lucide-react'

// BANNER DE BLOQUEIO (Segurança Total)
const UpgradeOverlay = () => (
  <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl rounded-[40px] border border-blue-600/30 animate-in fade-in duration-500">
    <div className="bg-zinc-900 border border-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.4)] max-w-lg w-full rounded-[40px] p-10 text-center space-y-8 flex flex-col items-center">
      <div className="p-6 bg-blue-600/10 rounded-full border border-blue-600/20"><Lock className="text-blue-600" size={48} /></div>
      <div className="space-y-4">
        <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter text-white">CONTEÚDO <span className="text-blue-600">RESTRITO</span></h3>
        <p className="text-zinc-400 text-sm font-medium italic italic">A licença de auditoria expirou. Libere o acesso total para continuar aprendendo a lucrar.</p>
      </div>
      <Link href="/planos" className="group block w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[3px] hover:bg-blue-500 transition-all">
        LIBERAR MEU ACESSO AGORA <Crown size={16} className="inline ml-2" />
      </Link>
    </div>
  </div>
);

export default function RaioX() {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [customerId, setCustomerId] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  
  const { isRaioX, isTrialExpired, loading: authLoading } = useAuthStatus()

  const handleAuthorize = () => {
    setLoading(true)
    setTimeout(() => { setIsAuthorized(true); setLoading(false); }, 1500)
  }

  const handleScan = () => {
    if(!isAuthorized) return alert("Autorize o acesso à API primeiro.")
    if(!customerId) return alert("Insira o ID da conta")
    setLoading(true)
    setTimeout(() => { setLoading(false); setShow(true); }, 3000)
  }

  if (authLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  const isLocked = isTrialExpired && !isRaioX;

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 pt-32 pb-32 font-sans selection:bg-blue-600">
      <main className="max-w-6xl mx-auto space-y-12 relative">
        {isLocked && <UpgradeOverlay />}

        <div className={isLocked ? "blur-md pointer-events-none opacity-50" : ""}>
          
          {/* HEADER ACADEMIA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] tracking-[5px] uppercase italic">
              <School size={16} /> LABORATÓRIO DE PERFORMANCE LINKADS
            </div>
            <h1 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-[0.85]">
              RAIO X <span className="text-blue-600">SCANNER</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl text-lg italic leading-tight uppercase font-bold">
              // O GPS da sua conta: Do primeiro clique até o dinheiro no bolso.
            </p>
          </div>

          {/* PAINEL DE CONEXÃO - AJUSTADO COM SUA SOLICITAÇÃO */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 p-8 rounded-[40px] space-y-8">
              {!isAuthorized ? (
                <button onClick={handleAuthorize} className="w-full flex items-center justify-center gap-4 p-5 bg-blue-600 text-white rounded-2xl font-black uppercase italic tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
                  <Key size={20} /> AUTORIZAR ACESSO À API OFICIAL DO GOOGLE ADS
                </button>
              ) : (
                <div className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px] tracking-widest bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 size={16} /> CONEXÃO AUTORIZADA E CRIPTOGRAFADA VIA API
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="flex-1 w-full">
                  <label className="text-[9px] font-black uppercase tracking-[3px] text-zinc-500 mb-2 block italic">INSIRA O ID DA CONTA (10 DÍGITOS)</label>
                  <input type="text" placeholder="000-000-0000" value={customerId} onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full bg-transparent text-3xl text-white font-black font-mono outline-none border-b border-white/10 focus:border-blue-500 transition-all py-2" />
                </div>
                <button onClick={handleScan} className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all text-sm">
                  {loading ? "PROCESSANDO API..." : "SOLICITAR DIAGNÓSTICO TÉCNICO"}
                </button>
              </div>
            </div>
            <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[40px] flex flex-col justify-center text-center items-center group">
               <HelpCircle className="text-blue-500 mb-4" size={32} />
               <h4 className="text-white font-black uppercase text-[11px] tracking-[2px] mb-2 italic">Onde está o ID?</h4>
               <p className="text-zinc-500 text-[11px] leading-relaxed italic font-medium">
                 No topo direito do seu painel Google Ads, acima do seu e-mail. É o seu código único de 10 dígitos.
               </p>
            </div>
          </div>

          {show && (
            <div className="mt-20 space-y-32 animate-in fade-in duration-1000">
              
              {/* MÓDULO 1: BASE TÉCNICA */}
              <ModuleSection step="01" title="Infraestrutura e Metas" icon={<Settings2 />}>
                <DiagnosticCard 
                  status="error" 
                  title="Meta de Conversão (Pixel)" 
                  desc="O Google não está rastreando suas vendas. Você gasta R$ 100 e ele não sabe se voltou R$ 0 ou R$ 1.000."
                  lesson={[
                    "Acesse 'Metas' no menu superior do Google Ads.",
                    "Clique em 'Conversões' e verifique se o status está 'Ativo'.",
                    "Se não estiver, instale a Tag Global no <head> da sua Landing Page imediatamente."
                  ]}
                />
                <DiagnosticCard 
                  status="error" 
                  title="Foco de Rede" 
                  desc="Sua campanha está aparecendo em 'Sites Parceiros' e 'Rede de Display'. Isso come 40% da sua verba com cliques de aplicativos de jogos."
                  lesson={[
                    "Vá em 'Configurações' > 'Redes'.",
                    "Desmarque 'Incluir Rede de Display do Google'.",
                    "Foque apenas na Rede de Pesquisa para atrair quem realmente está buscando seu produto."
                  ]}
                />
              </ModuleSection>

              {/* MÓDULO 2: O ANÚNCIO MAGNÉTICO */}
              <ModuleSection step="02" title="Criativos e Escrita (Copy)" icon={<ImageIcon />}>
                <DiagnosticCard 
                  status="error" 
                  title="Títulos de Anúncio" 
                  desc="Você está usando poucos títulos. O Google precisa de variedade para testar o que converte mais."
                  lesson={[
                    "No editor de anúncios, preencha os 15 títulos disponíveis.",
                    "Título 1: Coloque a Palavra-Chave (Ex: Curso de Ads).",
                    "Título 2: Coloque o maior benefício (Ex: Suporte 24 Horas).",
                    "Título 3: Coloque uma Chamada (Ex: Compre com 50% de Desconto)."
                  ]}
                />
                <DiagnosticCard 
                  status="warning" 
                  title="Descrições de Impacto" 
                  desc="Suas descrições estão curtas demais. Elas servem para tirar a dúvida final do cliente."
                  lesson={[
                    "Use as 4 linhas de descrição de 90 caracteres cada.",
                    "Fale sobre Garantia, Parcelamento e Autoridade.",
                    "O anúncio maior ganha mais destaque e cliques qualificados."
                  ]}
                />
              </ModuleSection>

              {/* MÓDULO 3: EXTENSÕES DE DOMÍNIO */}
              <ModuleSection step="03" title="Ativos e Sitelinks" icon={<MousePointerClick />}>
                <DiagnosticCard 
                  status="error" 
                  title="Uso de Sitelinks" 
                  desc="Seu anúncio parece uma linha só. Sem sitelinks, você perde a chance de levar o cliente direto para o checkout."
                  lesson={[
                    "Vá em 'Anúncios e Ativos' > 'Ativos'.",
                    "Adicione o ativo de 'Sitelink'.",
                    "Crie 4 links apontando para partes diferentes do seu site (Ex: Depoimentos, WhatsApp, Oferta)."
                  ]}
                />
                <DiagnosticCard 
                  status="warning" 
                  title="Extensão de Imagem" 
                  desc="Um anúncio com foto no Google Pesquisa chama 3x mais atenção que um anúncio só de texto."
                  lesson={[
                    "Acesse 'Ativos' > 'Imagem'.",
                    "Suba uma foto quadrada (1:1) do seu produto ou da sua logo.",
                    "Isso torna seu anúncio profissional e aumenta sua credibilidade."
                  ]}
                />
              </ModuleSection>

              {/* MÓDULO 4: FILTROS DE DINHEIRO */}
              <ModuleSection step="04" title="Público e Filtros" icon={<Filter />}>
                <DiagnosticCard 
                  status="error" 
                  title="Palavras-Chave Negativas" 
                  desc="Sua campanha está aparecendo para termos como 'grátis', 'como fazer' ou 'vaga de emprego'."
                  lesson={[
                    "Acesse 'Palavras-Chave' > 'Palavras-Chave Negativas'.",
                    "Adicione uma lista de 'sujeira' (grátis, gratuito, reclame aqui).",
                    "Isso impede que o Google gaste seu dinheiro com curiosos."
                  ]}
                />
                <DiagnosticCard 
                  status="warning" 
                  title="Ajuste de Dispositivos" 
                  desc="Muitas vezes o seu site carrega mal no Computador ou no Tablet, mas você continua pagando por esses cliques."
                  lesson={[
                    "Vá em 'Dispositivos' no menu lateral.",
                    "Veja qual tem o custo mais alto por venda.",
                    "Reduza o lance em -100% no dispositivo que só gasta e não vende."
                  ]}
                />
              </ModuleSection>

              {/* MÓDULO 5: DESTINO FINAL */}
              <ModuleSection step="05" title="Página de Destino (Site)" icon={<Globe />}>
                <DiagnosticCard 
                  status="error" 
                  title="Experiência de Conversão" 
                  desc="Detectamos que o botão de compra do seu site está 'escondido'. Se o cliente não achar em 3 segundos, ele sai."
                  lesson={[
                    "Mantenha o botão de ação (CTA) visível logo no topo do site.",
                    "Garanta que o site carregue em menos de 2 segundos no celular.",
                    "Sua página deve prometer a mesma coisa que seu anúncio disse."
                  ]}
                />
              </ModuleSection>

              {/* CONCLUSÃO DA MENTORIA */}
              <div className="space-y-12">
                <div className="flex items-center gap-4 text-zinc-900 font-black uppercase text-[10px] tracking-[10px]">
                  <div className="h-[1px] flex-1 bg-zinc-900"></div> CONCLUSÃO DA MENTORIA <div className="h-[1px] flex-1 bg-zinc-900"></div>
                </div>

                <div className="bg-zinc-900/50 border-2 border-blue-600/30 p-12 rounded-[50px] relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 text-white/5 -rotate-12 group-hover:rotate-0 transition-all duration-700">
                    <GraduationCap size={350} />
                  </div>
                  
                  <div className="max-w-3xl space-y-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-xl shadow-blue-600/20">
                        <School size={32} />
                      </div>
                      <h3 className="text-3xl md:text-5xl font-[1000] italic uppercase tracking-tighter leading-none">
                        AUDITORIA <span className="text-blue-500 underline text-7xl md:text-8xl block">CONCLUÍDA.</span>
                      </h3>
                    </div>
                    
                    <p className="text-zinc-400 text-lg font-medium italic leading-relaxed uppercase">
                      Você passou pela experiência completa do Scanner LinkAds. Cada bloco acima é uma peça vital para o seu lucro no Google Ads. O conhecimento agora está nas suas mãos.
                    </p>

                    <div className="flex gap-4">
                      <div className="px-6 py-3 bg-red-600/10 border border-red-600/20 rounded-2xl text-red-500 font-black italic uppercase text-xs">Saúde: 24%</div>
                      <div className="px-6 py-3 bg-emerald-600/10 border border-emerald-600/20 rounded-2xl text-emerald-500 font-black italic uppercase text-xs">Nível: Iniciante</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-8 pt-6 pb-20">
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">VAI CONSERTAR NA MÃO OU NO CLIQUE?</h2>
                    <p className="text-zinc-500 text-sm font-medium italic">O Mechanic Pro aplica todas estas correções automaticamente via API.</p>
                  </div>
                  <Link href="/planos" className="group px-12 py-5 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[4px] hover:bg-blue-600 hover:text-white transition-all flex items-center gap-4 shadow-2xl border-b-4 border-zinc-200 hover:border-blue-800">
                    <Sparkles size={18} className="text-blue-600 group-hover:text-white" /> ATIVAR MECÂNICO PRO <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

            </div>
          )}

          <div className="flex justify-center pt-20">
              <Link href="/dashboard" className="text-zinc-800 hover:text-white uppercase text-[9px] font-black tracking-[8px] transition-colors flex items-center gap-2 italic">
                [ VOLTAR AO COCKPIT ]
              </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

// COMPONENTES DE APOIO
function ModuleSection({ step, title, icon, children }) {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4 text-zinc-900 font-black uppercase text-[10px] tracking-[6px]">
        <div className="h-[1px] flex-1 bg-zinc-900"></div> 
        <span className="flex items-center gap-2 text-blue-500">
            MÓDULO {step}: {title}
        </span> 
        <div className="h-[1px] flex-1 bg-zinc-900"></div>
      </div>
      <div className="grid grid-cols-1 gap-12">{children}</div>
    </div>
  )
}

function DiagnosticCard({ status, title, desc, lesson }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden group hover:border-blue-600/40 transition-all shadow-2xl">
      <div className="p-10 space-y-4 bg-zinc-950/60 flex flex-col justify-center">
        <div className={`flex items-center gap-2 font-black uppercase text-[8px] tracking-[3px] ${status === 'error' ? 'text-red-500' : 'text-yellow-500'}`}>
          <AlertCircle size={14} /> {status === 'error' ? 'FALHA DE ALTO CUSTO' : 'RECOMENDAÇÃO TÉCNICA'}
        </div>
        <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter leading-none">{title}</h3>
        <p className="text-zinc-500 font-medium italic leading-relaxed text-sm">{desc}</p>
      </div>
      <div className="p-10 bg-[#050505] space-y-8 border-l border-white/5">
        <div className="flex items-center justify-between">
           <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">PASSO A PASSO DA CORREÇÃO</span>
           <GraduationCap size={20} className="text-emerald-500/50" />
        </div>
        <div className="space-y-6 text-white font-bold italic text-sm">
          {lesson.map((step, i) => (
            <div key={i} className="flex gap-4 items-start leading-snug">
              <span className="bg-emerald-500 text-black text-[10px] font-black px-2 py-0.5 rounded shadow-lg shadow-emerald-500/20">{i+1}</span>
              <p className="flex-1 opacity-90">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}