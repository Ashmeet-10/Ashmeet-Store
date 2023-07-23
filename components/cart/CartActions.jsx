'use client'

import { useRouter } from 'next/navigation'
import { addToCart, removeFromCart } from '@lib/actions'
import { useTransition } from 'react'

const CartActions = ({ userId, productId, selectedColor, selectedSize }) => {
  const router = useRouter()
  const [isPending1, startTransition1] = useTransition()
  const [isPending2, startTransition2] = useTransition()
  console.log(selectedColor, selectedSize)
  return (
    <div className='flex space-x-4'>
      <button
        type='button'
        className={`flex h-9 w-9 items-center justify-center rounded-lg border border-gray-500 text-2xl duration-300 ease-in-out hover:scale-110 ${
          isPending1 ? 'animate-pulse opacity-60' : ''
        }`}
        disabled={isPending1 || isPending2}
        onClick={() =>
          startTransition1(() => {
            removeFromCart(userId, productId, selectedColor, selectedSize)
            router.refresh()
          })
        }
      >
        -
      </button>
      <button
        type='button'
        className={`flex h-9 w-9 items-center justify-center rounded-lg border border-gray-500 text-xl duration-300 ease-in-out hover:scale-110 ${
          isPending2 ? 'animate-pulse opacity-60' : ''
        }`}
        disabled={isPending1 || isPending2}
        onClick={() =>
          startTransition2(() => {
            addToCart(userId, productId, selectedColor, selectedSize)
            router.refresh()
          })
        }
      >
        +
      </button>
    </div>
  )
}

export default CartActions
