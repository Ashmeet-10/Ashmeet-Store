import Image from 'next/image'

const ProductImagesCarousel = ({ productImages }) => {
  return (
    <div className='snap-x snap-mandatory overflow-x-auto scrollbar-hide'>
      <div className='flex w-[calc(300vw-6rem)] '>
        {productImages.map((image, index) => (
          <div
            key={index}
            className='relative aspect-square w-[calc(100vw-2rem)] snap-center snap-always'
          >
            <Image
              src={image}
              fill
              alt='Product Image'
              className='object-contain'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImagesCarousel
