import Image from 'next/image'

const ProductImagesCarousel = ({ productImages }) => {
  return (
    <div className='snap-x snap-mandatory overflow-x-auto scrollbar-hide'>
      <div className='flex w-full'>
        {productImages.map((image, index) => (
          <div
            key={index}
            className='relative aspect-square w-full shrink-0 snap-center snap-always'
          >
            <Image
              src={image}
              fill
              quality={100}
              alt='Product Image'
              className='object-contain'
              priority
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImagesCarousel
