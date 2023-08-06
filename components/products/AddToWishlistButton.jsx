'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { addOrRemoveFromWishList } from '@lib/actions'
import HeartIconFilled from '@components/icons/heart-filled'
import { useToast } from '@components/ui/use-toast'
import { CheckCircleIcon, X } from 'lucide-react'

const AddToWishlistButton = ({ product, isWishlisted }) => {
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
  const { toast } = useToast()

  const handleClick = async (setIsPending) => {
    try {
      setIsPending(() => true)
      const response = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product,
        }),
        cache: 'no-store',
      })
      const data = await response.json()
      if (data?.message === 'success') {
        toast({
          description: (
            <div className='flex items-center space-x-3'>
              <CheckCircleIcon size={24} className='text-green-600' />
              <p>Product added to wishlist.</p>
            </div>
          ),
        })
      } else if (data?.message === 'not logged in')
        toast({ description: 'Please Login to add product to wishlist.' })
      else if (data?.message === 'failure') {
        toast({
          description: (
            <div className='flex items-center space-x-3'>
              <X size={24} className='text-red-600' />
              <p>Error in adding Product to wishlist</p>
            </div>
          ),
        })
      }
      console.log(data)
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        description: (
          <div className='flex items-center space-x-3'>
            <X size={24} className='text-red-600' />
            <p>Error in adding Product to wishlist</p>
          </div>
        ),
      })
    } finally {
      setIsPending(() => false)
    }
  }

  return (
    <button
      aria-label='wishlist'
      type='button'
      onClick={() => handleClick(setIsPending)}
    >
      <HeartIconFilled
        className={`h-6 w-6 text-gray-400 ${
          isPending ? 'animate-pulse ease-in-out' : ''
        }`}
        disabled={isPending}
      />
    </button>
  )
}

export default AddToWishlistButton
