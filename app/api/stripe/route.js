import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

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
      success_url: `http://localhost:3000?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'http://localhost:3000',
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params)
    return NextResponse.json({ session: session })
  } catch (error) {
    return NextResponse.json({ message: error.message })
  }
}
