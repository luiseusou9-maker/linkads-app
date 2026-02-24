// @ts-nocheck
'use client'
import { ShieldCheck, Lock, Eye, Database, Globe, Scale, Cpu, Search } from 'lucide-react'

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* CABEÇALHO */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-500 text-[10px] font-black uppercase tracking-[4px]">
            <ShieldCheck size={14} /> Protocolo de Proteção de Dados
          </div>
          <h1 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-none">
            POLÍTICA DE <span className="text-blue-600">PRIVACIDADE</span>
          </h1>
          <p className="text-zinc-500 text-sm italic max-w-2xl mx-auto uppercase font-black tracking-tighter">
            Última atualização: Fevereiro de 2026. Em total conformidade com as normas da <span className="text-white">API Google Ads v17</span> e LGPD.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* SETOR 1: GOOGLE ADS API - O MAIS IMPORTANTE PARA APROVAÇÃO */}
          <section className="bg-zinc-900/20 border border-blue-600/10 p-8 md:p-12 rounded-[50px] space-y-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 blur-[60px]"></div>
            <div className="flex items-center gap-4 text-blue-500">
              <Globe size={32} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">1. Uso da API Oficial Google Ads</h2>
            </div>
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed italic">
              <p>O <strong>LinkAds</strong> utiliza a API oficial para permitir que o <strong>Raio-X Scanner</strong> realize diagnósticos de performance e o <strong>Mecânico Pro</strong> execute otimizações técnicas. Ao utilizar nossas ferramentas, você entende que:</p>
              <ul className="list-disc ml-6 space-y-3">
                <li><strong>Escopo Limitado:</strong> Acessamos apenas dados de telemetria das campanhas (CTR, Lances, Termos de Busca) necessários para o funcionamento da Engine.</li>
                <li><strong>Tokens OAuth 2.0:</strong> Não solicitamos ou armazenamos senhas do Google. A conexão é feita via tokens criptografados que garantem que o LinkAds nunca tenha acesso à sua conta pessoal ou informações de login.</li>
                <li><strong>Revogação:</strong> O acesso pode ser interrompido instantaneamente por você através da sua "Conta Google - Apps com acesso à sua conta".</li>
                <li><strong>Não Invasivo:</strong> Nossa Engine não altera orçamentos financeiros nem possui acesso para editar páginas de produtos, sites ou servidores externos.</li>
              </ul>
            </div>
          </section>

          {/* SETOR 2: COLETA DE DADOS */}
          <section className="bg-zinc-900/20 border border-white/5 p-8 md:p-12 rounded-[50px] space-y-6">
            <div className="flex items-center gap-4 text-emerald-500">
              <Database size={32} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">2. Coleta de Informações</h2>
            </div>
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed italic">
              <p>Para manter o ecossistema LinkAds funcionando, coletamos:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Identificação:</strong> Nome e e-mail via Login Social (Google/Facebook) para gestão da sua licença.</li>
                <li><strong>Pagamento:</strong> Processado via SSL por gateways parceiros. Não retemos dados de cartões em nossos servidores.</li>
                <li><strong>Relatórios do Scanner:</strong> Os diagnósticos gerados pelo Raio-X Scanner são armazenados de forma privada para que você possa acompanhar sua evolução histórica.</li>
              </ul>
            </div>
          </section>

          {/* SETOR 3: SEGURANÇA E LGPD */}
          <section className="bg-zinc-900/20 border border-white/5 p-8 md:p-12 rounded-[50px] space-y-6">
            <div className="flex items-center gap-4 text-amber-500">
              <Lock size={32} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">3. Proteção e Segurança</h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed italic">
              Aplicamos criptografia de ponta a ponta (AES-256) em toda a comunicação de dados. Sob as diretrizes da <strong>Lei Geral de Proteção de Dados (LGPD)</strong>, reafirmamos que o LinkAds não comercializa, aluga ou compartilha suas informações com terceiros para fins de marketing ou mineração de dados.
            </p>
          </section>

          {/* SETOR 4: CONTATO DPO */}
          <section className="bg-blue-600 p-8 md:p-12 rounded-[50px] space-y-4 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="flex items-center gap-4 text-white">
              <Scale size={32} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">4. Seus Direitos</h2>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed italic font-medium">
              Você possui total controle sobre seus dados. A qualquer momento, você pode solicitar a exportação ou a exclusão definitiva de sua conta e de todos os relatórios vinculados a ela através do nosso canal oficial de suporte:
            </p>
            <div className="pt-4">
              <span className="bg-black text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-[4px] uppercase hover:bg-zinc-900 transition-colors cursor-pointer">
                suporte@linkads.com.br
              </span>
            </div>
          </section>

        </div>

        {/* FOOTER DA PÁGINA */}
        <div className="text-center pt-10 border-t border-white/5">
          <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[8px]">
            LinkAds Performance Engine • Operação Global em Conformidade com as Políticas de Dados do Google
          </p>
        </div>

      </div>
    </div>
  )
}