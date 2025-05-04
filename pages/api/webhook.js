// /pages/api/webhook.js
import { buffer } from 'micro'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const config = { api: { bodyParser: false } }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Método não permitido')
  }

  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)

  let event
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Erro no webhook:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  const session = event.data.object
  const userId = session?.metadata?.userId

  if (!userId) {
    console.warn('userId ausente no metadata do checkout')
    return res.status(400).send('Missing userId in metadata')
  }

  try {
    if (event.type === 'checkout.session.completed') {
      await supabase
        .from('users')
        .update({ subscription_active: true })
        .eq('id', userId)
    }

    if (
      event.type === 'customer.subscription.deleted' ||
      event.type === 'invoice.payment_failed'
    ) {
      await supabase
        .from('users')
        .update({ subscription_active: false })
        .eq('id', userId)
    }

    return res.status(200).json({ received: true })
  } catch (e) {
    console.error('Erro ao atualizar Supabase:', e.message)
    return res.status(500).send('Erro interno')
  }
}
