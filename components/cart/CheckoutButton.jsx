'use client'

import getStripe from '@lib/getStripe'

const CheckoutButton = ({ amount }) => {
  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response = await fetch('http://localhost:3000/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: amount,
      }),
      cache: 'no-cache',
    })
    const data = await response.json()
    console.log(data)
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id })
    }
  }

  return (
    <button
      type='button'
      onClick={handleCheckout}
      className='rounded-lg bg-black px-3 py-2 text-white duration-300 ease-in-out hover:scale-105 hover:bg-gray-800'
    >
      Checkout
    </button>
  )
}

export default CheckoutButton
