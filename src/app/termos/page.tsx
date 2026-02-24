// @ts-nocheck
'use client'
import { Scale, AlertTriangle, FileText, Ban, Zap, CheckCircle, ShieldAlert, Cpu } from 'lucide-react'

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* CABEÇALHO */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-500 text-[10px] font-black uppercase tracking-[4px]">
            <Scale size={14} /> Contrato de Licença de Uso v3.0
          </div>
          <h1 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-none">
            TERMOS DE <span className="text-blue-600">SERVIÇO</span>
          </h1>
          <p className="text-zinc-500 text-sm italic max-w-2xl mx-auto uppercase font-black tracking-tighter">
            Ao acessar o <strong className="text-white">LinkAds Engine</strong>, você estabelece um acordo de conformidade técnica. Leia nossas diretrizes de operação.
          </p>
        </div>

        {/* CONTEÚDO DOS TERMOS */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* 1. OBJETO E FUNCIONAMENTO TÉCNICO */}
          <section className="bg-zinc-900/20 border border-blue-600/10 p-8 md:p-12 rounded-[50px] space-y-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 blur-[60px]"></div>
            <div className="flex items-center gap-4 text-blue-500">
              <Zap size={32} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">1. Natureza do Sistema</h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed italic">
              O <strong>LinkAds</strong> é uma plataforma de engenharia de dados que opera como uma camada de otimização via API oficial do Google Ads. O sistema fornece diagnósticos didáticos (Raio-X Scanner) e automação de manutenção técnica (Mecânico Pro). O usuário reconhece que o LinkAds não é uma entidade do Google, mas um software de terceiros que utiliza as ferramentas de desenvolvedor fornecidas pela plataforma.
            </p>
          </section>

          {/* 2. ISENÇÃO DE RESPONSABILIDADE FINANCEIRA */}
          <section className="bg-zinc-900/20 border border-white/5 p-8 md:p-12 rounded-[50px] space-y-6">
            <div className="flex items-center gap-4 text-amber-500">
              <ShieldAlert size={32} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">2. Responsabilidade sobre Resultados</h2>
            </div>
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed italic">
              <p>O usuário declara estar ciente de que:</p>
              <ul className="list-disc ml-6 space-y-3">
                <li><strong>Controle Orçamentário:</strong> O LinkAds não altera orçamentos financeiros. Toda e qualquer cobrança feita pelo Google Ads é de responsabilidade direta entre o usuário e o Google.</li>
                <li><strong>Compliance de Conteúdo:</strong> O usuário é o único responsável pela legalidade dos produtos e anúncios veiculados. Suspensões por "Políticas do Google" não geram responsabilidade ao LinkAds.</li>
                <li><strong>Garantia de Lucro:</strong> O tráfego pago é variável. Nossas ferramentas otimizam a técnica, mas não garantem vendas ou ROI específico, que dependem da oferta e mercado do usuário.</li>
              </ul>
            </div>
          </section>

          {/* 3. PROPRIEDADE DE DADOS E API */}
          <section className="bg-zinc-900/20 border border-white/5 p-8 md:p-12 rounded-[50px] space-y-6">
            <div className="flex items-center gap-4 text-emerald-500">
              <Cpu size={32} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">3. Propriedade Intelectual e Dados</h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed italic">
              O código, algoritmos e interface do LinkAds são propriedade exclusiva da nossa marca. Os dados das campanhas importados via API pertencem ao usuário e são processados de forma privada. Tentativas de ataques, engenharia reversa ou uso de contas compartilhadas resultarão no bloqueio imediato do acesso sem aviso prévio.
            </p>
          </section>

          {/* 4. CANCELAMENTO E REEMBOLSO */}
          <section className="bg-zinc-900/20 border border-white/5 p-8 md:p-12 rounded-[50px] space-y-6">
            <div className="flex items-center gap-4 text-blue-500">
              <CheckCircle size={32} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">4. Ciclo de Licenciamento</h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed italic">
              As licenças são pré-pagas e recorrentes. O cancelamento interrompe a renovação automática para o próximo ciclo. Em respeito ao Código de Defesa do Consumidor, garantimos 7 dias de garantia para novos usuários. Após este período, o serviço é considerado usufruído.
            </p>
          </section>

          {/* CTA FINAL */}
          <div className="p-10 border border-blue-600/30 bg-blue-600/5 rounded-[40px] text-center space-y-4">
            <h4 className="text-xl font-[1000] uppercase italic tracking-tighter">Acordo Técnico Concluído</h4>
            <p className="text-zinc-500 text-[10px] italic uppercase tracking-[5px]">Dúvidas? <strong>suporte@linkads.com.br</strong></p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center pt-10 border-t border-white/5">
          <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[8px]">
            LINKADS TECHNOLOGY • TODOS OS DIREITOS RESERVADOS 2026
          </p>
        </div>

      </div>
    </div>
  )
}