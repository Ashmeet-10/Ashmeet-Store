'use client'

import { useRouter } from 'next/navigation'
import { addToCart } from '@lib/actions'
import { useState, useTransition } from 'react'
import AvailableColors from './AvailableColors'
import AvailableSizes from './AvailableSizes'

const AddToCartButton = ({
  userId,
  productId,
  productColors,
  productSizes,
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  return (
    <div className=''>
      <button
        type='button'
        className='my-4 rounded-xl bg-black px-3 py-2 text-white hover:bg-gray-700'
        disabled={isPending}
        onClick={() =>
          startTransition(() => {
            addToCart(userId, productId, productColors[selectedColorIndex], productSizes[selectedSizeIndex])
            router.refresh()
          })
        }
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
