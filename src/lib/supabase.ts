// @ts-nocheck
import { createBrowserClient } from '@supabase/ssr'

// Criamos uma variável fora da função para armazenar a instância
let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  // Se já existe um cliente criado, retorna ele. Se não, cria um novo.
  // Isso evita criar centenas de conexões desnecessárias.
  if (client) return client;

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      // Dica extra: Configuração para o Realtime funcionar melhor
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    }
  )

  return client;
}