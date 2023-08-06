'use client'

import { useRouter } from 'next/navigation'
import { addToCart } from '@lib/actions'
import { useState, useTransition } from 'react'
import AvailableColors from './AvailableColors'
import AvailableSizes from './AvailableSizes'
import { useToast } from '@components/ui/use-toast'
import { CheckCircleIcon, X } from 'lucide-react'

const AddToCartButton = ({ productId, productColors, productSizes }) => {
  const router = useRouter()
  // const [isPending, startTransition] = useTransition()
  const [isPending, setIsPending] = useState(false)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const { toast } = useToast()

  const handleClick = async (setIsPending) => {
    try {
      setIsPending(() => true)
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          selectedColor: productColors[selectedColorIndex],
          selectedSize: productSizes[selectedSizeIndex],
        }),
        cache: 'no-store',
      })
      const data = await response.json()
      if (data?.message === 'success')
        toast({
          description: (
            <div className='flex items-center space-x-3'>
              <CheckCircleIcon size={24} className='text-green-600' />
              <p>Product added to cart.</p>
            </div>
          ),
        })

      else if (data?.message === 'not logged in')
        toast({ description: 'Please Login to add product to cart.' })
        
      else if (data?.message === 'failure')
        toast({
          description: (
            <div className='flex items-center space-x-3'>
              <X size={24} className='text-red-600' />
              <p>Error in adding Product to cart</p>
            </div>
          ),
        })
      console.log(data)
      router.refresh()
    } catch (error) {
      toast({
        description: (
          <div className='flex items-center space-x-3'>
            <X size={24} className='text-red-600' />
            <p>Error in adding Product to cart</p>
          </div>
        ),
      })
      console.log(error)
    } finally {
      setIsPending(() => false)
    }
  }

  return (
    <div className=''>
      <button
        type='button'
        aria-label='Add to Cart'
        className='my-4 rounded-xl bg-black px-3 py-2 text-white hover:bg-gray-700 xl:mt-6'
        disabled={isPending}
        // onClick={() =>
        //   startTransition(() => {
        //     addToCart(userId, productId, productColors[selectedColorIndex], productSizes[selectedSizeIndex])
        //     router.refresh()
        //   })
        // }
        onClick={() => handleClick(setIsPending)}
      >
        {isPending ? 'Adding to Cart...' : 'Add to Cart'}
      </button>

      {productColors.length !== 0 && (
        <AvailableColors
          productColors={productColors}
          selectedColorIndex={selectedColorIndex}
          setSelectedColorIndex={setSelectedColorIndex}
        />
      )}

      {productSizes.length !== 0 && (
        <AvailableSizes
          productSizes={productSizes}
          selectedSizeIndex={selectedSizeIndex}
          setSelectedSizeIndex={setSelectedSizeIndex}
        />
      )}
    </div>
  )
}

export default AddToCartButton
