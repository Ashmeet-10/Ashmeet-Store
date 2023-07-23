// import { getServerSession } from 'next-auth'
import { connectToDB } from '@utils/database'
import User from '@models/user'
import { Product } from '@models/product'
import FilledStar from '@components/icons/star-filled'
import WishlistButton from '@components/products/WishlistButton'
import AddToCartButton from '@components/products/AddToCartButton'
import ProductImagesCarousel from '@components/products/ProductImagesCarousel'

export async function generateStaticParams() {
  await connectToDB()
  const products = await Product.find({})
  return products.map((product) => ({
    id: product._id.toString(),
  }))
}

const ProductDetailPage = async ({ params }) => {
  // const sessionData = getServerSession()
  // const database = connectToDB()
  // const [session, db] = await Promise.all([sessionData, database])
  // let product
  // let user
  // if (session) {
  //   const userPromise = User.findOne({ email: session.user.email })
  //   const productPromise = Product.findById(params.id)
  //   const [userdata, productdata] = await Promise.all([
  //     userPromise,
  //     productPromise,
  //   ])
  //   user = userdata
  //   product = productdata
  // } else {
  //   product = await Product.findById(params.id)
  // }
  // let userId = null,
  //   productId = null,
  //   isWishlisted = null
  // if (user) {
  //   userId = user._id.toString()
  //   productId = product._id.toString()
  //   isWishlisted = user.wishlist.includes(productId)
  // }
  await connectToDB()
  const product = await Product.findById(params.id)
  // const user = await User.findOne({ email: 'ashmeet2846@gmail.com' })
  return (
    <div className='mx-4'>
      <ProductImagesCarousel productImages={product.images} />
      <div className='my-2 flex justify-end'>
        <WishlistButton
          // user={user._id.toString()}
          product={product._id.toString()}
          isWishlisted={false}
        />
      </div>

      <div className='flex flex-col space-y-1'>
        <p className=''>{product.name}</p>
        <div className='ratings flex space-x-2'>
          <div className='flex'>
            <FilledStar className='h-4 w-4 text-green-700' />
            <FilledStar className='h-4 w-4 text-green-700' />
            <FilledStar className='h-4 w-4 text-green-700' />
            <FilledStar className='h-4 w-4 text-green-700' />
          </div>
          <p className='text-sm text-gray-500'>{product.rating}</p>
        </div>
        <div className='flex space-x-1'>
          <p className='text-lg font-semibold text-gray-500 line-through decoration-1'>
            {product.actualPrice.toLocaleString()}
          </p>
          <p className='text-xl font-semibold'>
            &#8377;{product.discountedPrice.toLocaleString()}
          </p>
        </div>
        <p className='font-semibold text-green-600'>
          FREE Delivery{' '}
          <span className='text-gray-500 line-through decoration-1'>
            &#8377;40
          </span>
        </p>
      </div>

      {/* <AddToCartButton
        userId={userId}
        productId={productId}
        productColors={product.color}
        productSizes={product.size}
      /> */}

      {product.highlights.length !== 0 && (
        <div className='my-8'>
          <h3 className='my-2 text-2xl font-medium'>Highlights</h3>
          <ul className='list-inside list-disc space-y-2'>
            {product.highlights.map((highlight, index) => (
              <li key={index} className=''>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.specifications.length !== 0 && (
        <div className='my-8 text-sm'>
          <h3 className='my-2 text-2xl font-medium'>Specifications</h3>
          <div className='space-y-2'>
            {product.specifications.map((specification, index) => (
              <div
                key={index}
                className='flex space-x-2 border-b border-gray-200 py-3'
              >
                <div className='w-2/5 text-gray-400 lg:w-1/4'>
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

      <div className='my-8'>
        <h3 className='my-2 text-2xl font-medium'>Description</h3>
        <p className='leading-7 text-gray-700'>{product.description}</p>
      </div>

      {/* <div className=''>
        <h3 className='my-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-2xl font-semibold text-transparent'>
          Reviews
        </h3>
        <div className='space-y-4 text-sm'>
          {product.reviews.map((review, index) => (
            <div key={index} className='flex flex-col'>
              <p className='font-semibold italic'>@{review.username}</p>
              <div className='flex items-center font-semibold'>
                <FilledStar className='h-4 w-4 text-green-700' />
                <FilledStar className='h-4 w-4 text-green-700' />
                <FilledStar className='h-4 w-4 text-green-700' />
                <FilledStar className='h-4 w-4 text-green-700' />
                <p className='mx-2'>{review.title}</p>
              </div>
              <p className='leading-6'>{review.body}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className='my-8'>
        <h3 className='my-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-2xl font-semibold text-transparent'>
          FAQ
        </h3>
        <div className='space-y-4'>
          {product.qna.map((faq, index) => (
            <div key={index} className='flex flex-col'>
              <p className='text-sm'>Q. {faq.question}</p>
              <p className='text-sm text-gray-500'>Ans. {faq.answer}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default ProductDetailPage
