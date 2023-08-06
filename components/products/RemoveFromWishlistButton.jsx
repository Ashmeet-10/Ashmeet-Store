'use client'

import HeartIconFilled from '@components/icons/heart-filled'
import { Button } from '@components/ui/button'
import { useToast } from '@components/ui/use-toast'
import { CheckCircleIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RemoveFromWishlistButton = ({ productId }) => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()

  const handleClick = async (setIsPending) => {
    try {
      setIsPending(() => true)
      const response = await fetch('/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
        }),
        cache: 'no-store',
      })
      const data = await response.json()
      if (data?.message === 'success') {
        toast({
          description: (
            <div className='flex items-center space-x-3'>
              <CheckCircleIcon size={24} className='text-green-600' />
              <p>Product Removed from wishlist.</p>
            </div>
          ),
        })
      } else if (data?.message === 'not logged in')
        toast({ description: 'Please Login to remove product from wishlist.' })
      else if (data?.message === 'failure') {
        toast({
          description: (
            <div className='flex items-center space-x-3'>
              <X size={24} className='text-red-600' />
              <p>Error in removing Product from wishlist</p>
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
            <p>Error in removing Product from wishlist</p>
          </div>
        ),
      })
    } finally {
      setIsPending(() => false)
    }
  }
  return (
    <Button
      className='my-3'
      disabled={isPending}
      onClick={() => handleClick(setIsPending)}
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
