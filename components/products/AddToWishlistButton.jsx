'use client'

import { useTransition } from 'react'
import { addToWishlist } from '@lib/actions'
import HeartIconFilled from '@components/icons/heart-filled'
import { useToast } from '@components/ui/use-toast'
import { CheckCircleIcon, X } from 'lucide-react'

const AddToWishlistButton = ({ product }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  return (
    <button
      type='button'
      aria-label='Add to wishlist'
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const message = await addToWishlist(product)
          if (message === 'success') {
            toast({
              description: (
                <div className='flex items-center space-x-3'>
                  <CheckCircleIcon size={24} className='text-green-600' />
                  <p>Product added to wishlist.</p>
                </div>
              ),
            })
          } else if (message === 'NoUser')
            toast({ description: 'Please Login to add product to wishlist.' })
          else if (message === 'failure') {
            toast({
              description: (
                <div className='flex items-center space-x-3'>
                  <X size={24} className='text-red-600' />
                  <p>Error in adding Product to wishlist</p>
                </div>
              ),
            })
          }
        })
      }
    >
      <HeartIconFilled
        className={`h-6 w-6 text-gray-400 ${
          isPending ? 'animate-pulse ease-in-out' : ''
        }`}
      />
    </button>
  )
}

export default AddToWishlistButton
