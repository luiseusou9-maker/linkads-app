// @ts-nocheck
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { priceId, userId, userEmail, planoType } = await req.json();

    if (!priceId || !userId) {
      console.error('❌ Erro: priceId ou userId ausentes no corpo da requisição');
      return NextResponse.json(
        { error: 'Dados insuficientes para criar o checkout.' }, 
        { status: 400 }
      );
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const sessionStripe = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], 
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      client_reference_id: userId, 

      metadata: { 
        userId: userId,
        planoType: planoType || 'pro'
      }, 
      
      subscription_data: {
        metadata: { 
          userId: userId,
          planoType: planoType || 'pro'
        }
      },
      
      customer_email: userEmail || undefined,
      
      // ✅ REDIRECIONAMENTO CORRETO PARA SUA PÁGINA DE SUCESSO
      success_url: `${origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/planos`,
    });

    return NextResponse.json({ url: sessionStripe.url });

  } catch (err: any) {
    console.error('❌ ERRO CRÍTICO NA API DE CHECKOUT:', err.message);
    return NextResponse.json(
      { error: `Erro no Stripe: ${err.message}` }, 
      { status: 500 }
    );
  }
}