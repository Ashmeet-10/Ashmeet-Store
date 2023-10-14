import Link from 'next/link'
import FilledStar from '@components/icons/star-filled'
import Image from 'next/image'
import RemoveFromWishlistButton from './RemoveFromWishlistButton'

const ProductCard = ({ product, wishlist, priority }) => {
  return (
    <div className='overflow-hidden rounded-xl p-4 shadow-[0px_0px_10px_1px] shadow-gray-300 duration-300 ease-in-out hover:scale-105'>
      <Link
        href={`/products/${product.category.split(' ')[0]}/${product._id}`}
        aria-label={`${product.name} ${product.rating} ${product.actualPrice.toLocaleString()} ₹${product.discountedPrice.toLocaleString()}`}
      >
        <div className='relative mx-auto shrink-0 aspect-square w-11/12 bg-white'>
          <Image
            src={product.images[0]}
            fill
            priority={priority || false}
            quality={90}
            className='object-contain'
            alt={product.name}
          />
        </div>
        <p className='mt-4 line-clamp-2 lg:mt-6 lg:text-lg'>{product.name}</p>
        <div className='flex space-x-2'>
          <div className='flex'>
            <FilledStar className='h-4 w-4 text-green-700' />
            <FilledStar className='h-4 w-4 text-green-700' />
            <FilledStar className='h-4 w-4 text-green-700' />
            <FilledStar className='h-4 w-4 text-green-700' />
          </div>
          <p className='text-sm text-gray-500'>{product.rating}</p>
        </div>
        <div className='flex items-center space-x-1'>
          <p className='font-semibold text-gray-500 line-through lg:text-lg'>
            {product.actualPrice.toLocaleString()}
          </p>
          <p className='text-lg font-semibold line-clamp-1 lg:text-xl'>
            ₹{product.discountedPrice.toLocaleString()}
          </p>
        </div>
      </Link>
      {wishlist ? (
        <RemoveFromWishlistButton productId={product._id.toString()} />
      ) : (
        <p className='text-sm lg:text-base'>Free delivery</p>
      )}
    </div>
  )
}

export default ProductCard
