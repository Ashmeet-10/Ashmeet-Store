import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import User from '@models/user'
import Product from '@models/product'
import connectToDB from '@utils/database'
import LoginButton from '@components/navbar/login'
import ShoppingBagIcon from '@components/icons/shopping-bag'

export const dynamic = 'force-dynamic'

const OrdersPage = async () => {
  let products = [],
    productIds = []
  let user = null
  try {
    const database = connectToDB()
    const sessionData = getServerSession()
    const [session, db] = await Promise.all([sessionData, database])
    if (session) {
      user = await User.findOne({ email: session.user.email })
      user.orders.map((order) =>
        order.products.map((product) =>
          productIds.push({
            ...product,
            date: order.date,
          })
        )
      )
      console.log(productIds)
      const promises = productIds.map((item) =>
        Product.findById(item.productId).exec()
      )
      products = await Promise.all(promises)
    }
  } catch (error) {
    console.log(error)
  }

  if (!user) {
    return (
      <div className='flex min-h-[90vh] flex-col items-center justify-center space-y-6'>
        <h2 className='text-2xl font-medium text-center'>
          Please Login to view your Orders
        </h2>
        <LoginButton />
      </div>
    )
  }
  if (!products.length) {
    return (
      <div className='flex min-h-[90vh] flex-col items-center justify-center'>
        <ShoppingBagIcon className='h-16 w-16' />
        <h2 className='mb-12 mt-4 text-2xl font-medium'>
          You have not ordered anything yet!!
        </h2>
        <Link href='/'>
          <button
            type='button'
            aria-label='shop now'
            className='rounded-lg bg-black px-3 py-2 text-white duration-500 ease-in-out hover:scale-110 hover:bg-gray-800'
          >
            Shop Now
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className='mx-auto flex min-h-[90vh] max-w-6xl flex-col px-4 lg:px-8'>
      <h1 className='my-6 text-4xl font-bold lg:my-8 xl:my-10 xl:text-5xl'>
        My Orders
      </h1>
      {products.map((product, idx) => (
        <div
          key={idx}
          className='flex flex-col space-y-4 border-b border-gray-300 py-5 sm:py-10 lg:space-y-8'
        >
          <Link
            href={`/products/${product.category.split(' ')[0]}/${product._id}`}
            aria-label={`go to ${product.name}`}
            className='group'
          >
            <div className='flex items-center space-x-4 md:space-x-10 xl:space-x-16 2xl:space-x-24'>
              <div className='aspect-square w-2/5 max-w-[15rem] rounded-2xl border border-gray-400 bg-white p-2 shadow-[0px_0px_10px_1px] shadow-gray-300 duration-300 ease-in-out group-hover:scale-105 sm:p-4'>
                <div className='relative h-full'>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className='object-contain'
                  />
                </div>
              </div>
              <div className='w-3/5 sm:w-full'>
                <p className='mt-2 line-clamp-1 lg:text-lg'>{product.name}</p>
                <div className='flex flex-col'>
                  {productIds[idx]?.selectedColor && (
                    <p className='text-sm text-gray-400 lg:text-base'>
                      Color: {productIds[idx].selectedColor}
                    </p>
                  )}
                  {productIds[idx]?.selectedSize && (
                    <p className='text-sm text-gray-400 lg:text-base'>
                      Size: {productIds[idx].selectedSize}
                    </p>
                  )}
                  <div className=''>
                    <p className='text-sm text-gray-400 lg:text-base'>
                      Date: {productIds[idx].date.toDateString()}
                    </p>
                  </div>
                  <div className='mt-1 flex items-end space-x-3 sm:mt-4 xl:mt-6'>
                    <p className='text-xl font-semibold lg:text-2xl'>
                      &#8377;
                      {(
                        product.discountedPrice * productIds[idx].quantity
                      ).toLocaleString()}
                    </p>
                    <p className='lg:text-lg'>x{productIds[idx].quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default OrdersPage
