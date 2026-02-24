// @ts-nocheck
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// USAMOS A SERVICE_ROLE PARA PULAR AS REGRAS DE RLS NO UPDATE
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STRIPE_PLAN_MAP = {
  "price_1T3exMBIaIpoY9lYiAQkDeO5": "scanner", 
  "price_1T3ey7BIaIpoY9lYHCwXxN6s": "scanner", 
  "price_1T3eyhBIaIpoY9lY2Dc9RlP2": "pro",     
  "price_1T3ezKBIaIpoY9lYXnFxWf4U": "pro",     
};

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Erro de Assinatura Stripe: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 1. Lógica para ATIVAÇÃO e RENOVAÇÃO
  if (event.type === 'checkout.session.completed' || event.type === 'invoice.paid') {
    const object = event.data.object;
    
    // Tenta pegar o userId de todos os lugares possíveis
    let userId = object.metadata?.userId || object.subscription_details?.metadata?.userId || object.client_reference_id;

    // Se ainda não achou (comum no invoice.paid), busca a assinatura no Stripe para pegar o metadata dela
    if (!userId && object.subscription) {
      const subscription = await stripe.subscriptions.retrieve(object.subscription as string);
      userId = subscription.metadata?.userId;
    }
    
    let priceId;
    if (event.type === 'checkout.session.completed') {
      const sessionWithLineItems = await stripe.checkout.sessions.listLineItems(object.id);
      priceId = sessionWithLineItems.data[0]?.price?.id;
    } else {
      priceId = object.lines?.data[0]?.price?.id;
    }

    // Se o ID do preço não estiver no mapa, cai no 'pro' por segurança ou loga erro
    const planoParaAtivar = STRIPE_PLAN_MAP[priceId];

    if (userId && planoParaAtivar) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ 
          plano: planoParaAtivar,
          updated_at: new Date().toISOString() 
        })
        .eq('id', userId);

      if (error) {
        console.error(`❌ Erro Supabase [${userId}]:`, error.message);
      } else {
        console.log(`✅ SUCESSO: Usuário ${userId} agora é ${planoParaAtivar.toUpperCase()}`);
      }
    } else {
      console.error(`⚠️ Webhook ignorado: userId(${userId}) ou plano(${planoParaAtivar}) não encontrados.`);
    }
  }

  // 2. Lógica para CANCELAMENTO ou FALHA
  if (event.type === 'customer.subscription.deleted' || event.type === 'invoice.payment_failed') {
    const subscription = event.data.object;
    
    // Busca o userId no metadata da assinatura que está sendo deletada
    const userId = subscription.metadata?.userId;

    if (userId) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ plano: 'free' })
        .eq('id', userId);
        
      if (!error) console.log(`⚠️ ACESSO REVOGADO: Usuário ${userId} voltou para o FREE.`);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}