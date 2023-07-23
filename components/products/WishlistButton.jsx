'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { addOrRemoveFromWishList } from '@lib/actions'
import HeartIconFilled from '@components/icons/heart-filled'

const WishlistButton = ({ product, isWishlisted }) => {
  // const router = useRouter()
  // const [isPending, startTransition] = useTransition()
  // return (
  //   <button
  //     type='button'
  //     disabled={isPending}
  //     onClick={() =>
  //       startTransition(() => {
  //         addOrRemoveFromWishList(user, product)
  //         router.refresh()
  //       })
  //     }
  //   >
  //     {isWishlisted ? (
  //       <>
  //         <HeartIconFilled
  //           className={`h-6 w-6 text-red-500 ${
  //             isPending ? 'animate-pulse ease-in-out' : ''
  //           }`}
  //         />
  //       </>
  //     ) : (
  //       <HeartIconFilled
  //         className={`h-6 w-6 text-gray-400 ${
  //           isPending ? 'animate-pulse ease-in-out' : ''
  //         }`}
  //       />
  //     )}
  //   </button>
  // )
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const handleClick = async (setIsPending) => {
    try {
      setIsPending(() => true)
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // userId: user,
          productId: product,
        }),
        cache: 'no-store',
      })
      const data = await response.json()
      console.log(data)
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsPending(() => false)
    }
  }
  return (
    <button type='button' onClick={() => handleClick(setIsPending)}>
      <HeartIconFilled
        className={`h-6 w-6 text-gray-400 ${
          isPending ? 'animate-pulse ease-in-out' : ''
        }`}
      />
    </button>
  )
}

export default WishlistButton
