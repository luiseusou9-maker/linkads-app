// @ts-nocheck
'use client'
import { useState } from 'react'
import { Check, Zap, Target, Crown, ArrowRight, Flame, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// ESSENCIAL: Usar o cliente que entende a sessão do seu navegador no Next.js
import { createBrowserClient } from '@supabase/ssr'

const stripeIds = {
  free: "price_1T3ewcBIaIpoY9lYFsccx5SB",
  scanner: {
    mensal: "price_1T3exMBIaIpoY9lYiAQkDeO5",
    anual: "price_1T3ey7BIaIpoY9lYHCwXxN6s"
  },
  pro: {
    mensal: "price_1T3eyhBIaIpoY9lY2Dc9RlP2",
    anual: "price_1T3ezKBIaIpoY9lYXnFxWf4U"
  }
};

const PlanCard = ({ title, price, period, description, features, buttonText, highlight, priceId, icon: Icon }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleAction = async () => {
    setLoading(true);
    try {
      // 1. Pega o usuário logado antes de qualquer coisa (Garante que o ID existe)
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        alert("Sessão expirada. Por favor, entre novamente para vincular sua compra.");
        router.push('/login');
        return;
      }

      if (priceId === stripeIds.free) {
        // Fluxo Degustação
        const response = await fetch('/api/activate-free', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        if (response.ok) {
          // Atualiza localmente antes de ir
          localStorage.setItem('user_plano', 'free');
          window.location.href = '/dashboard';
        } else {
          alert("Erro ao ativar teste. Tente novamente.");
        }
      } else {
        // Fluxo Stripe com metadados cruciais
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            priceId: priceId,
            userId: user.id,      // Vínculo no Supabase
            userEmail: user.email, // Pré-preenchimento no Stripe
            planType: title       // Para log de auditoria
          }),
        });

        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error("Erro API Checkout:", data.error);
          alert("Erro ao gerar checkout. Verifique sua conexão.");
        }
      }
    } catch (error) {
      console.error("Erro na operação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex flex-col p-6 md:p-8 rounded-[40px] transition-all duration-500 border-2 ${
      highlight 
      ? 'bg-blue-600 border-blue-400 scale-100 md:scale-105 z-10 shadow-2xl shadow-blue-600/20' 
      : 'bg-zinc-900/60 border-white/5 hover:border-blue-600/30'
    }`}>
      <div className="mb-6 space-y-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${highlight ? 'bg-white/20' : 'bg-blue-600/10'}`}>
          <Icon size={24} className={highlight ? 'text-white' : 'text-blue-400'} />
        </div>
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{title}</h3>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-4xl font-black uppercase tracking-tighter">R$ {price}</span>
            <span className={`text-[10px] font-bold uppercase ${highlight ? 'text-blue-100' : 'text-zinc-500'}`}>
              /{period === 'mensal' ? 'mês' : 'ano'}
            </span>
          </div>
          <p className={`text-[10px] mt-2 italic font-medium ${highlight ? 'text-blue-100' : 'text-zinc-400'}`}>
            {description}
          </p>
        </div>
      </div>

      <div className={`h-[1px] w-full mb-6 ${highlight ? 'bg-white/10' : 'bg-white/5'}`} />

      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-[11px] italic font-medium">
            <Check size={14} className={highlight ? 'text-white' : 'text-blue-500'} />
            <span className={highlight ? 'text-white' : 'text-zinc-300'}>{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={handleAction}
        disabled={loading}
        className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[3px] transition-all flex items-center justify-center gap-2 active:scale-95 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        } ${
          highlight 
          ? 'bg-white text-blue-600 hover:bg-zinc-100' 
          : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20'
        }`}
      >
        {loading ? (
          <span className="animate-pulse">{price === "0" ? "ATIVANDO..." : "PROCESSANDO..."}</span>
        ) : (
          <>{buttonText} <ArrowRight size={14} /></>
        )}
      </button>
    </div>
  );
};

export default function Planos() {
  const [billingCycle, setBillingCycle] = useState('mensal');

  return (
    <div className="min-h-screen bg-black text-white py-12 md:py-24 px-4 font-sans selection:bg-blue-600">
      <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <span className="bg-zinc-900 border border-white/5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[3px] text-zinc-500 italic">
              Arsenal LinkAds Atualizado 2026
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-tight">
            ESCOLHA SUA <span className="text-blue-600">MUNIÇÃO</span>
          </h1>
        </div>

        <div className="flex justify-center p-1 bg-zinc-900/50 rounded-2xl border border-white/5 w-fit mx-auto backdrop-blur-md">
          <button onClick={() => setBillingCycle('mensal')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === 'mensal' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'}`}>Mensal</button>
          <button onClick={() => setBillingCycle('anual')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${billingCycle === 'anual' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'}`}>Anual <span className="bg-green-500/20 text-green-400 text-[8px] px-2 py-0.5 rounded-md">-20%</span></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left items-stretch">
          <PlanCard 
            icon={Flame}
            title="DEGUSTAÇÃO" 
            price="0"
            period="mensal"
            description="Reconhecimento de terreno por 30 dias."
            features={["Dashboard V3 Ativada", "Scanner de 1 Campanha", "Relatórios de Erros", "Suporte Comunitário"]}
            buttonText="TESTAR AGORA"
            priceId={stripeIds.free}
          />

          <PlanCard 
            icon={Target}
            title="RAIO-X SCANNER" 
            price={billingCycle === 'mensal' ? '47' : '470'}
            period={billingCycle}
            description="Precisão cirúrgica em escala."
            features={["Tudo do Free", "Scanner de Cliques Fraudulentos", "Geofencing Avançado", "Auditorias Ilimitadas", "Suporte Prioritário VIP"]}
            buttonText="PEGAR SCANNER"
            priceId={billingCycle === 'mensal' ? stripeIds.scanner.mensal : stripeIds.scanner.anual}
          />

          <PlanCard 
            icon={Crown}
            highlight={true}
            title="MECÂNICO PRO" 
            price={billingCycle === 'mensal' ? '97' : '890'}
            period={billingCycle}
            description="A arma definitiva de automação."
            features={["Tudo do Scanner", "Correção Total via API", "Negativação em Massa", "Injeção de Tags de Conversão", "IA Mechanic Ativada"]}
            buttonText="ATIVAR ELITE PRO"
            priceId={billingCycle === 'mensal' ? stripeIds.pro.mensal : stripeIds.pro.anual}
          />
        </div>

        <div className="pt-16">
          <Link href="/dashboard" className="text-zinc-700 hover:text-white text-[10px] font-black uppercase tracking-[5px] transition-all">
            ← Voltar para o cockpit
          </Link>
        </div>
      </div>
    </div>
  );
}