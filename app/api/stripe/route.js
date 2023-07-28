import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
const isProduction = process.env.NODE_ENV === 'production'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000'

export const POST = async (req, res) => {
  const reqBody = await req.json()
  try {
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'payment',
            },
            unit_amount: (reqBody.price) * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${serverUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${serverUrl}`,
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params)
    return NextResponse.json({ session: session })
  } catch (error) {
    return NextResponse.json({ message: error.message })
  }
}
