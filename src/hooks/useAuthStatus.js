// @ts-nocheck
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';

export function useAuthStatus() {
  const [loading, setLoading] = useState(true);
  const [authData, setAuthData] = useState({
    isPro: false,
    isRaioX: false,
    isTrialExpired: false,
    daysRemaining: 30,
    user: null,
    profile: null
  });

  const supabase = createClient();

  const checkAccess = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setAuthData({ isPro: false, isRaioX: false, isTrialExpired: false, daysRemaining: 30, user: null, profile: null });
        setLoading(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      // Lógica de tempo de conta (Trial de 30 dias para FREE)
      const dataCriacao = new Date(user.created_at);
      const hoje = new Date();
      const diffMS = hoje.getTime() - dataCriacao.getTime();
      const diffDias = Math.floor(diffMS / (1000 * 60 * 60 * 24));
      
      const statusPlano = profile?.plano?.toString().trim().toLowerCase() || 'free';
      
      // HIERARQUIA PROFISSIONAL:
      // PRO/PREMIUM = Acesso Total
      // SCANNER/RAIO-X = Acesso ao Raio-X apenas
      const éPro = statusPlano === 'pro' || statusPlano === 'premium';
      const éRaioX = statusPlano === 'scanner' || statusPlano === 'raio-x' || éPro;

      setAuthData({
        isPro: éPro, 
        isRaioX: éRaioX, 
        isTrialExpired: diffDias > 30 && statusPlano === 'free',
        daysRemaining: Math.max(0, 30 - diffDias),
        user,
        profile
      });

    } catch (error) {
      console.error("Erro crítico na checagem de acesso:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    checkAccess();

    // 1. ESCUTA MUDANÇAS DE AUTH (Login/Logout)
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        checkAccess();
      } else if (event === 'SIGNED_OUT') {
        setAuthData({ isPro: false, isRaioX: false, isTrialExpired: false, daysRemaining: 30, user: null, profile: null });
      }
    });

    // 2. ESCUTA MUDANÇAS NO BANCO (Realtime Upgrade)
    // Se o plano mudar no banco (via Stripe/Hotmart), o app libera na hora!
    const profileSub = supabase
      .channel('realtime_profile_check')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'profiles' }, 
        (payload) => {
          if (payload.new) checkAccess();
        }
      )
      .subscribe();

    return () => {
      authSub.unsubscribe();
      supabase.removeChannel(profileSub);
    };
  }, [checkAccess, supabase]);

  return { ...authData, loading, recheck: checkAccess };
}