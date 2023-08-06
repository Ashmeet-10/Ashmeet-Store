import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
const isProduction = process.env.NODE_ENV === 'production'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000'

export const POST = async (req, res) => {
  const reqBody = await req.json()
  const { products} = reqBody
  try {
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: product.name,
            },
            unit_amount: (product.price) * 100,
          },
          quantity: product.quantity,
        }
      }),
      success_url: `${serverUrl}/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${serverUrl}`,
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params)
    return NextResponse.json({ session: session })
  } catch (error) {
    return NextResponse.json({ message: error.message })
  }
}
