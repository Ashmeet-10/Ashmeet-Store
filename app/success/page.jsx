import Product from '@models/product'
import User from '@models/user'
import connectToDB from '@utils/database'
import { CheckCircleIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

const isProduction = process.env.NODE_ENV === 'production'
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000'

const page = async (props) => {
  const searchParams = await props.searchParams
  console.log('success page')
  const { sessionId } = searchParams
  let products = [],
    checkoutSession
  try {
    const response = await fetch(
      `${serverUrl}/api/stripe/sessions/${sessionId}`
    )
    const data = await response.json()
    checkoutSession = data.checkoutSession
    const database = connectToDB()
    const sessionData = getServerSession()
    const [session, db] = await Promise.all([sessionData, database])
    const user = await User.findOne({ email: session.user.email })
    const promises = checkoutSession.line_items.data.map((item) =>
      Product.findOne({ name: item.description }).exec()
    )
    products = await Promise.all(promises)
    console.log(user)
    if (!user.checkoutIds.includes(checkoutSession.id)) {
      user.orders = [
        {
          products: products.map((product, idx) => ({
            productId: product._id.toString(),
            quantity: user.cart[idx].quantity,
            selectedColor: user.cart[idx].selectedColor,
            selectedSize: user.cart[idx].selectedSize,
          })),
          amount: checkoutSession.amount_total / 100,
          date: new Date(),
        },
        ...user.orders,
      ]
      user.checkoutIds = [...user.checkoutIds, checkoutSession.id]
      console.log(user.orders)
      await user.save()
    }
  } catch (error) {
    console.log(error)
    return <div>Something went wrong</div>
  }
  return (
    <div className='mx-4 mt-10 flex max-w-2xl flex-col items-center md:mx-auto md:mt-12 xl:mt-16'>
      <CheckCircleIcon className='mb-4 h-20 w-20 text-green-600 lg:h-28 lg:w-28' />
      <h2 className='text-center text-xl font-semibold lg:text-2xl'>
        Order Placed Successfully
      </h2>
      <h2 className='text-center text-xl font-semibold lg:text-2xl'>
        Thanks for ordering
      </h2>
      <div className='mt-10 flex flex-col md:mt-12 xl:mt-16'>
        <p className='text-lg font-semibold'>Ordered Products</p>
        {products.map((product, idx) => (
          <div
            key={idx}
            className='flex flex-col space-y-4 border-b border-gray-300 py-5 sm:py-10 lg:space-y-8'
          >
            <Link
              href={`/products/${product.category.split(' ')[0]}/${
                product._id
              }`}
              className='group'
            >
              <div className='flex items-center space-x-4 md:space-x-10 xl:space-x-16'>
                <div className='aspect-square w-1/4 max-w-[15rem] rounded-2xl border border-gray-400 bg-white p-2 shrink-0 shadow-[0px_0px_10px_1px] shadow-gray-300 duration-300 ease-in-out group-hover:scale-105'>
                  <div className='relative h-full'>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes='40vw'
                      quality={90}
                      className='object-contain shrink-0'
                    />
                  </div>
                </div>
                <div className='w-3/4 sm:w-full'>
                  <p className='mt-2 line-clamp-1 lg:text-lg'>{product.name}</p>
                  <div className='flex flex-col'>
                    <div className='mt-1 flex items-center justify-between sm:mt-4 xl:mt-6'>
                      <p className='lg:text-lg'>
                        Qty: {checkoutSession.line_items.data[idx].quantity}
                      </p>
                      <p className='text-lg font-semibold lg:text-xl'>
                        &#8377;
                        {product.discountedPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className='mt-8 flex space-x-8 self-start text-2xl font-bold'>
        <p>Amount Paid :</p>
        <p>&#8377;{(checkoutSession.amount_total / 100).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default page
