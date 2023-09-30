'use client'

import { addToCart, removeFromCart } from '@lib/actions'
import { useTransition } from 'react'

const CartActions = ({ productId, selectedColor, selectedSize }) => {
  const [isPending1, startTransition1] = useTransition()
  const [isPending2, startTransition2] = useTransition()
  console.log(selectedColor, selectedSize)
  return (
    <div className='flex space-x-4'>
      <button
        type='button'
        aria-label='decrease product quantity in cart'
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-400 text-xl duration-300 ease-in-out hover:scale-110 ${
          isPending1 ? 'animate-pulse opacity-60' : ''
        }`}
        disabled={isPending1 || isPending2}
        onClick={() =>
          startTransition1(() => removeFromCart(productId, selectedColor, selectedSize))
        }
      >
        -
      </button>
      <button
        type='button'
        aria-label='increase product quantity in cart'
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-400 text-xl duration-300 ease-in-out hover:scale-110 ${
          isPending2 ? 'animate-pulse opacity-60' : ''
        }`}
        disabled={isPending1 || isPending2}
        onClick={() =>
          startTransition2(() => addToCart(productId, selectedColor, selectedSize))
        }
      >
        +
      </button>
    </div>
  )
}

export default CartActions
