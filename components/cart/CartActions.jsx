'use client'

import { addToCart, removeFromCart } from '@lib/actions'
import { useFormStatus } from 'react-dom'

const Button = ({ type }) => {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      aria-label='increase/decrease product quantity in cart'
      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-400 text-xl duration-300 ease-in-out hover:scale-110 ${
        pending ? 'animate-pulse opacity-60' : ''
      }`}
      disabled={pending}
    >
      {type}
    </button>
  )
}

const CartActions = ({ productId, selectedColor, selectedSize }) => {
  return (
    <div className='flex space-x-4'>
      <form
        action={async () =>
          removeFromCart(productId, selectedColor, selectedSize)
        }
      >
        <Button type='-' />
      </form>
      <form
        action={async () => addToCart(productId, selectedColor, selectedSize)}
      >
        <Button type='+' />
      </form>
    </div>
  )
}

export default CartActions
