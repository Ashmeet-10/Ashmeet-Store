'use client'

import { addToCart } from '@lib/actions'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import AvailableColors from './AvailableColors'
import AvailableSizes from './AvailableSizes'
import { useToast } from '@components/ui/use-toast'
import { CheckCircleIcon, X } from 'lucide-react'

const Button = () => {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      aria-label='Add to Cart'
      className='my-4 rounded-xl bg-black px-3 py-2 text-white hover:bg-gray-700 xl:mt-6'
      disabled={pending}
    >
      {pending ? 'Adding to Cart...' : 'Add to Cart'}
    </button>
  )
}

const AddToCartButton = ({ productId, productColors, productSizes }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const { toast } = useToast()

  return (
    <div className=''>
      <form
        action={async () => {
          const message = await addToCart(
            productId,
            productColors[selectedColorIndex],
            productSizes[selectedSizeIndex]
          )
          if (message === 'success') {
            toast({
              description: (
                <div className='flex items-center space-x-3'>
                  <CheckCircleIcon size={24} className='text-green-600' />
                  <p>Product added to cart.</p>
                </div>
              ),
            })
          } else if (message === 'NoUser')
            toast({ description: 'Please Login to add product to cart.' })
          else if (message === 'failure') {
            toast({
              description: (
                <div className='flex items-center space-x-3'>
                  <X size={24} className='text-red-600' />
                  <p>Error in adding Product to cart</p>
                </div>
              ),
            })
          }
        }}
      >
        <Button />
      </form>
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
