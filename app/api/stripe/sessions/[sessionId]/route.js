import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export const GET = async (req, { params: { sessionId } }) => {
  try {
    if (!sessionId.startsWith('cs_')) throw new Error('Invalid session id')
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items.data.price.product'],
    })
    return NextResponse.json({ checkoutSession: checkoutSession }, {status: 200})
  } catch (error) {
    return NextResponse.json({ message: error.message }, {status: 500})
  }
}
