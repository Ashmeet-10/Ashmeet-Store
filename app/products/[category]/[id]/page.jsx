import connectToDB from '@utils/database'
import Product from '@models/product'
import FilledStar from '@components/icons/star-filled'
import AddToWishlistButton from '@components/products/AddToWishlistButton'
import AddToCartButton from '@components/products/AddToCartButton'
import ProductImagesCarousel from '@components/products/ProductImagesCarousel'

export async function generateStaticParams() {
  await connectToDB()
  const products = await Product.find({})
  return products.map((product) => ({
    id: product._id.toString(),
    category: product.category.split(' ')[0],
  }))
}

const ProductDetailPage = async (props) => {
  const params = await props.params
  await connectToDB()
  const product = await Product.findById(params.id)

  return (
    <div className='flex justify-center'>
      <div className='mx-4 my-4 max-w-7xl space-y-10 sm:mx-8 sm:my-8 sm:space-y-16 md:mx-12 xl:space-y-20'>
        <div className='sm:flex sm:items-center sm:space-x-8 md:space-x-16 lg:space-x-28 xl:space-x-36 2xl:space-x-48'>
          <div className='mx-auto max-w-xs sm:mx-0 sm:w-1/2 sm:max-w-sm sm:rounded-2xl sm:border sm:border-gray-400 sm:px-6 sm:pb-4 sm:pt-6 sm:shadow-[0px_0px_50px_5px] sm:shadow-gray-300 lg:max-w-md'>
            <div className='px-7'>
              <ProductImagesCarousel productImages={product.images} />
            </div>
            <div className='my-2 flex justify-end'>
              <AddToWishlistButton
                product={product._id.toString()}
                isWishlisted={false}
              />
            </div>
          </div>

          <div className='z-10 flex flex-col space-y-1 sm:w-1/2'>
            <p className='lg:text-lg xl:text-xl xl:leading-9'>{product.name}</p>
            <div className='ratings flex space-x-2'>
              <div className='flex'>
                <FilledStar className='h-4 w-4 text-green-700' />
                <FilledStar className='h-4 w-4 text-green-700' />
                <FilledStar className='h-4 w-4 text-green-700' />
                <FilledStar className='h-4 w-4 text-green-700' />
              </div>
              <p className='text-sm text-gray-500'>{product.rating}</p>
            </div>
            <div className='flex items-center space-x-1'>
              <p className='text-lg font-semibold text-gray-500 line-through decoration-1 lg:text-xl xl:text-2xl'>
                {product.actualPrice.toLocaleString()}
              </p>
              <p className='text-xl font-semibold lg:text-2xl xl:text-3xl'>
                &#8377;{product.discountedPrice.toLocaleString()}
              </p>
            </div>
            <p className='font-semibold text-green-700'>
              FREE Delivery{' '}
              <span className='text-gray-600 line-through decoration-1'>
                &#8377;40
              </span>
            </p>

            <AddToCartButton
              productId={product._id.toString()}
              productColors={product.color}
              productSizes={product.size}
            />
          </div>
        </div>

        {product.highlights.length !== 0 && (
          <div className=''>
            <h3 className='my-2 text-3xl font-semibold tracking-tight sm:my-4 xl:my-6 xl:text-4xl'>
              Highlights
            </h3>
            <ul className='list-inside list-disc space-y-2 lg:text-lg xl:text-xl'>
              {product.highlights.map((highlight, index) => (
                <li key={index} className=''>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.specifications.length !== 0 && (
          <div className='text-sm xl:text-lg'>
            <h3 className='my-2 text-3xl font-semibold tracking-tight sm:my-4 xl:my-6 xl:text-4xl'>
              Specifications
            </h3>
            <div className='space-y-2'>
              {product.specifications.map((specification, index) => (
                <div
                  key={index}
                  className='flex space-x-2 border-b border-gray-200 py-3'
                >
                  <div className='w-2/5 text-zinc-500 lg:w-1/4'>
                    {specification.spec}
                  </div>
                  <div className='w-3/5 break-words lg:w-3/4'>
                    {specification.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className=''>
          <h3 className='my-2 text-3xl font-semibold tracking-tight sm:my-4 xl:my-6 xl:text-4xl'>
            Description
          </h3>
          <p className='leading-7 lg:text-lg xl:text-xl xl:leading-8'>
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
