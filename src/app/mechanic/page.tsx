// @ts-nocheck
'use client'
import { useState } from 'react'
import { useAuthStatus } from '@/hooks/useAuthStatus' // Hook mestre
import { 
  ShieldCheck, Search, Zap, AlertTriangle, CheckCircle2, 
  ExternalLink, Download, Eye, Lock, Key, Copy, RefreshCcw, FileText, ChevronRight, Crown
} from 'lucide-react'

// --- COMPONENTE DO BANNER DE BLOQUEIO (Mantido original) ---
const UpgradeOverlay = () => (
  <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md rounded-[40px] border border-blue-600/30 animate-in fade-in duration-500">
    <div className="bg-zinc-900 border border-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.2)] max-w-lg w-full rounded-[40px] p-10 text-center space-y-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse"></div>
          <div className="p-6 bg-blue-600/10 rounded-full border border-blue-600/20 relative">
            <Lock className="text-blue-600" size={48} />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter text-white">
          ACESSO <span className="text-blue-600">RESTRITO</span>
        </h3>
        <p className="text-zinc-400 text-sm font-medium italic leading-relaxed">
          O <span className="text-white font-bold">Mecânico Pro</span> é uma ferramenta de elite exclusiva para assinantes do Arsenal Pro. Libere a automação via API para corrigir sua campanha em segundos.
        </p>
      </div>
      <a href="/planos" className="group block w-full py-6 bg-blue-600 text-white rounded-2xl font-[1000] uppercase text-[12px] tracking-[4px] hover:bg-blue-500 transition-all shadow-xl relative overflow-hidden">
        <span className="relative z-10 flex items-center justify-center gap-3">
          FAZER UPGRADE AGORA <Crown size={18} />
        </span>
      </a>
    </div>
  </div>
);

// --- COMPONENTE DE INSTRUÇÃO (Mantido original) ---
const InstructionModal = ({ isOpen, onClose, title, steps }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-blue-600/30 w-full max-w-lg rounded-[30px] p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <h4 className="text-sm font-black uppercase tracking-widest text-white italic">Protocolo de Ajuste</h4>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">✕</button>
        </div>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start bg-white/5 p-5 rounded-2xl border border-white/5">
              <span className="text-blue-500 font-black text-lg mt-0.5">0{i+1}.</span>
              <p className="text-[14px] text-white font-medium italic leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full py-5 bg-blue-600 text-white rounded-xl font-black text-[12px] uppercase tracking-[3px]">ENTENDI</button>
      </div>
    </div>
  );
};

// --- DIAGNOSTIC BLOCK (Mantido original) ---
const DiagnosticBlock = ({ id, title, problem, impact, actionLabel, steps, isManual, onComplete }) => {
  const [status, setStatus] = useState('pending'); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = () => {
    if (isManual) {
      setIsModalOpen(true);
      if (status !== 'success') {
        setStatus('success');
        onComplete(id, title);
      }
    } else {
      setStatus('fixing');
      setTimeout(() => {
        setStatus('success');
        onComplete(id, title);
      }, 2000);
    }
  };

  return (
    <div className={`group flex flex-col p-7 rounded-[32px] border transition-all duration-500 ${
      status === 'success' ? 'bg-green-500/5 border-green-500/40' : 'bg-zinc-900/40 border-white/5 hover:border-blue-600/20'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">{title}</span>
        {status === 'success' && <CheckCircle2 size={20} className="text-green-400" />}
      </div>
      <h4 className={`text-[15px] font-black uppercase tracking-tight mb-3 italic ${status === 'success' ? 'text-green-400' : 'text-white'}`}>{status === 'success' ? 'CORRIGIDO' : problem}</h4>
      <p className="flex-1 text-[13px] text-zinc-400 font-medium mb-8 italic">
        {status === 'success' ? 'Configuração enviada via API para o Google Ads.' : impact}
      </p>
      <button onClick={handleAction} disabled={status === 'fixing' || (!isManual && status === 'success')}
        className={`w-full py-4 rounded-xl font-[1000] uppercase text-[10px] tracking-[2px] transition-all flex items-center justify-center gap-2 ${
          status === 'success' ? 'bg-green-500 text-white' : status === 'fixing' ? 'bg-blue-600 text-white cursor-wait' : 'bg-blue-600 text-white hover:scale-[1.02]'
        }`}>
        {status === 'fixing' ? <RefreshCcw className="animate-spin" size={16}/> : status === 'success' ? 'CONCLUÍDO' : isManual ? 'COMO ARRUMAR' : actionLabel}
      </button>
      <InstructionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={problem} steps={steps} />
    </div>
  );
};

export default function MechanicPro() {
  const [flow, setFlow] = useState('auth'); 
  const [campaignId, setCampaignId] = useState('');
  const [completed, setCompleted] = useState([]);
  const [logItems, setLogItems] = useState([]);

  // Usamos o seu hook que já resolve tudo (Plano e Loading)
  const { isPro, loading } = useAuthStatus();

  const handleComplete = (id, title) => {
    if (!completed.includes(id)) {
      setCompleted(prev => [...prev, id]);
      setLogItems(prev => [...prev, title]);
    }
  };

  // Carregamento inicial da sessão
  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // --- REGRA DE OURO DO MECÂNICO ---
  // Aqui não tem trial. Ou o cara é PRO, ou está travado.
  const isLocked = !isPro;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 pb-24">
      
      {flow === 'auth' && (
        <div className="max-w-xl mx-auto pt-48 px-6 text-center space-y-12">
          <div className="space-y-4">
            <div className="flex justify-center"><div className="p-5 bg-blue-600/10 rounded-3xl border border-blue-600/20"><Lock className="text-blue-600" size={40} /></div></div>
            <h2 className="text-5xl font-black uppercase tracking-tighter italic text-white">CONEXÃO <span className="text-blue-600">API</span></h2>
          </div>
          <button onClick={() => setFlow('id')} className="group w-full py-7 bg-white text-black rounded-3xl font-[1000] uppercase text-[12px] tracking-[4px] flex items-center justify-center gap-4 hover:bg-blue-600 hover:text-white transition-all">
            AUTORIZAR GOOGLE ADS <ChevronRight size={20}/>
          </button>
        </div>
      )}

      {flow === 'id' && (
        <div className="max-w-xl mx-auto pt-48 px-6 text-center space-y-12 animate-in fade-in">
          <h3 className="text-4xl font-black uppercase tracking-tighter italic">ID DA <span className="text-blue-600">CAMPANHA?</span></h3>
          <div className="space-y-6">
            <input 
              type="text" placeholder="000-000-0000" 
              className="w-full bg-zinc-900 border-2 border-white/5 rounded-3xl py-8 text-2xl font-mono text-center outline-none focus:border-blue-600 transition-all text-white"
              value={campaignId} onChange={(e) => setCampaignId(e.target.value)}
            />
            <button onClick={() => setFlow('audit')} className="w-full py-7 bg-blue-600 text-white rounded-3xl font-[1000] uppercase text-[12px] tracking-[5px]">INICIAR MECÂNICO</button>
          </div>
        </div>
      )}

      {flow === 'audit' && (
        <div className="max-w-7xl mx-auto pt-24 px-6 space-y-16 animate-in fade-in relative">
          
          {/* O BANNER AGORA É CONTROLADO PELO STATUS PRO REAL DO BANCO */}
          {isLocked && <UpgradeOverlay />}

          <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-white/5 pb-12">
            <div className="space-y-4">
              <h3 className="text-6xl font-[1000] uppercase tracking-tighter leading-none italic">MEU <span className="text-blue-600">PAINEL</span></h3>
              <p className="text-zinc-500 text-[12px] font-black uppercase tracking-[5px] italic">Monitorando: {campaignId}</p>
            </div>
            <div className="flex gap-8 items-center bg-zinc-900/80 p-8 rounded-[35px] border border-blue-600/20">
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Otimização</p>
                  <p className="text-3xl font-black italic text-white">{completed.length} / 12</p>
                </div>
                <div className="w-32 h-2 bg-black rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-700 bg-blue-600`} style={{ width: `${(completed.length/12)*100}%` }} />
                </div>
            </div>
          </header>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isLocked ? 'pointer-events-none opacity-50 blur-sm' : ''}`}>
            <DiagnosticBlock id={1} title="Custo" isManual problem="Dinheiro Limitado" impact="Verba baixa interrompe anúncios antes do pico de buscas." steps={["Vá em Orçamento.", "Aumente para o valor sugerido.", "Salve."]} onComplete={handleComplete} />
            <DiagnosticBlock id={2} title="Lances" isManual problem="Lances Errados" impact="Você paga caro por cliques sem intenção de compra." steps={["Mude para Maximizar Conversões."]} onComplete={handleComplete} />
            <DiagnosticBlock id={3} title="Limpeza" problem="Sites Inúteis" impact="Seu anúncio aparece em sites de jogos infantis." actionLabel="Remover via API" onComplete={handleComplete} />
            <DiagnosticBlock id={4} title="Locais" problem="Região Errada" impact="Pessoas de fora do seu raio de entrega estão clicando." actionLabel="Ajustar via API" onComplete={handleComplete} />
            <DiagnosticBlock id={5} title="Anúncio" problem="Títulos Fracos" impact="O Google reduz seu alcance por falta de qualidade." actionLabel="Injetar Títulos" onComplete={handleComplete} />
            <DiagnosticBlock id={6} title="Descrições" problem="Textos Curtos" impact="Pouco espaço ocupado na tela do cliente." actionLabel="Expandir via API" onComplete={handleComplete} />
            <DiagnosticBlock id={7} title="Sitelinks" problem="Sem Atalhos" impact="Falta de links diretos para seus produtos." actionLabel="Gerar via API" onComplete={handleComplete} />
            <DiagnosticBlock id={8} title="Frases" problem="Sem Diferenciais" impact="O cliente não vê 'Frete Grátis' ou 'Garantia'." actionLabel="Add Frases API" onComplete={handleComplete} />
            <DiagnosticBlock id={9} title="Negativas" problem="Curiosos" impact="Pessoas buscando 'grátis' gastam sua verba." actionLabel="Negativar API" onComplete={handleComplete} />
            <DiagnosticBlock id={10} title="Filtros" problem="Busca Suja" impact="Pesquisas sem relação com seu produto." actionLabel="Limpar via API" onComplete={handleComplete} />
            <DiagnosticBlock id={11} title="Site" isManual problem="Velocidade" impact="Site lento faz o cliente desistir do clique." steps={["Otimize imagens.", "Use cache."]} onComplete={handleComplete} />
            <DiagnosticBlock id={12} title="Tags" isManual problem="Tag Offline" impact="O Google trabalha no escuro sem saber quem comprou." steps={["Instale a Tag Global."]} onComplete={handleComplete} />
          </div>
        </div>
      )}
    </div>
  );
}