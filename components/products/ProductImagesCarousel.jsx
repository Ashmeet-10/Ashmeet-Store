import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const ProductImagesCarousel = ({ productImages }) => {
  return (
    <Carousel>
      <CarouselPrevious />
      <CarouselContent>
        {productImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className='relative aspect-square shrink-0'>
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  )
}

export default ProductImagesCarousel
