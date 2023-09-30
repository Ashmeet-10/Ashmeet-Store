'use client'

import HeartIconFilled from '@components/icons/heart-filled'
import { Button } from '@components/ui/button'
import { useToast } from '@components/ui/use-toast'
import { removeFromWishlist } from '@lib/actions'
import { CheckCircleIcon, X } from 'lucide-react'
import { useTransition } from 'react'

const RemoveFromWishlistButton = ({ productId }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  return (
    <Button
      className='my-3'
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const message = await removeFromWishlist(productId)
          if (message === 'success') {
            toast({
              description: (
                <div className='flex items-center space-x-3'>
                  <CheckCircleIcon size={24} className='text-green-600' />
                  <p>Product Removed from wishlist.</p>
                </div>
              ),
            })
          } else if (message === 'NoUser')
            toast({
              description: 'Please Login to remove product from wishlist.',
            })
          else if (message === 'failure') {
            toast({
              description: (
                <div className='flex items-center space-x-3'>
                  <X size={24} className='text-red-600' />
                  <p>Error in removing Product from wishlist</p>
                </div>
              ),
            })
          }
        })
      }
    >
      {isPending ? (
        <div className='flex items-center space-x-2'>
          <p>Removing from</p>
          <HeartIconFilled className='h-6 w-6 text-red-500' />
        </div>
      ) : (
        <div className='flex items-center space-x-1'>
          <p>Remove from</p>
          <HeartIconFilled className='h-6 w-6 text-red-500' />
        </div>
      )}
    </Button>
  )
}

export default RemoveFromWishlistButton
