// @ts-nocheck
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Recebemos o ID do usuário direto no corpo da requisição
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
    }

    // Criamos o cliente Supabase "limpo"
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const expiracao = new Date()
    expiracao.setDate(expiracao.getDate() + 30)

    // Atualizamos o banco usando o ID que veio do botão
    const { error } = await supabase
      .from('profiles')
      .update({ 
        plano: 'free',
        trial_ends_at: expiracao.toISOString(),
        updated_at: new Date().toISOString() 
      })
      .eq('id', userId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('ERRO NA API:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}