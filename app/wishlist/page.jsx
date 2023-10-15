import Link from 'next/link'
import { getServerSession } from 'next-auth'
import connectToDB from '@utils/database'
import User from '@models/user'
import Product from '@models/product'
import LoginButton from '@components/navbar/login'
import ProductsList from '@components/products/ProductsList'
import HeartIconFilled from '@components/icons/heart-filled'

export const dynamic = 'force-dynamic'

const WishlistPage = async () => {
  let products = []
  let user = null
  try {
    const database = connectToDB()
    const sessionData = getServerSession()
    const [session, db] = await Promise.all([sessionData, database])
    if (session) {
      user = await User.findOne({ email: session.user.email }).populate({
        path: 'wishlist',
        select: 'name rating discountedPrice actualPrice images category',
      })
      products = user.wishlist
    }
  } catch (error) {
    console.log(error)
  }
  if (!user) {
    return (
      <div className='flex min-h-[90vh] flex-col items-center justify-center space-y-6'>
        <h2 className='my-4 text-center text-2xl font-medium'>
          Please Login to view your wishlist
        </h2>
        <LoginButton />
      </div>
    )
  } else if (!products.length && user) {
    return (
      <div className='flex min-h-[90vh] flex-col items-center justify-center space-y-6'>
        <HeartIconFilled className='h-16 w-16 text-red-500' />
        <h2 className='mb-12 mt-4 text-center text-2xl font-medium'>
          Your wishlist is empty
        </h2>
        <Link href='/' aria-label='go to Home page'>
          <button
            type='button'
            name='Shop now'
            className='rounded-lg bg-black px-3 py-2 text-white duration-500 ease-in-out hover:scale-110 hover:bg-gray-800'
          >
            Shop Now
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className='mx-4 flex min-h-[90vh] flex-col lg:mx-8'>
      <h1 className='my-6 text-4xl font-bold lg:my-8 xl:my-10 xl:text-5xl'>
        My Wishlist
      </h1>
      <ProductsList products={products} wishlist={true} />
    </div>
  )
}

export default WishlistPage
