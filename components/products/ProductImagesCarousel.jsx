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
              sizes='(max-width: 639px) 95vw, (max-width: 1400px) 40vw, 30vw'
              quality={90}
              className='object-contain'
              priority={index === 0}
              alt='Product Image'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImagesCarousel
