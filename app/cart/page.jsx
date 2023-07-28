import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import User from '@models/user'
import { Product } from '@models/product'
import { connectToDB } from '@utils/database'
import CartActions from '@components/cart/CartActions'
import LoginButton from '@components/navbar/login'
import ShoppingBagIcon from '@components/icons/shopping-bag'
import CheckoutButton from '@components/cart/CheckoutButton'

export const dynamic = 'force-dynamic'

const CartPage = async () => {
  let products = [],
    totalPrice = 0,
    totalDiscount = 0
  let user = null
  try {
    const database = connectToDB()
    const sessionData = getServerSession()
    const [session, db] = await Promise.all([sessionData, database])
    if (session) {
      user = await User.findOne({ email: session.user.email })
      console.log('cart', user.cart)
      const promises = user.cart.map((item) =>
        Product.findById(item.productId).exec()
      )
      products = await Promise.all(promises)

      for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].actualPrice * user.cart[i].quantity
        totalDiscount +=
          (products[i].actualPrice - products[i].discountedPrice) *
          user.cart[i].quantity
      }
    }
  } catch (error) {
    console.log(error)
  }

  if (!user) {
    return (
      <div className='flex min-h-[90vh] flex-col items-center justify-center space-y-6'>
        <h2 className='text-2xl font-medium'>Please Login to view your cart</h2>
        <LoginButton />
      </div>
    )
  }
  if (!products.length) {
    return (
      <div className='flex min-h-[90vh] flex-col items-center justify-center'>
        <ShoppingBagIcon className='h-16 w-16' />
        <h2 className='mb-12 mt-4 text-2xl font-medium'>Your cart is empty</h2>
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
      <h1 className='my-6 text-4xl font-semibold lg:my-8 xl:my-10 xl:text-5xl'>
        My Cart
      </h1>
      {products.map((product, idx) => (
        <div
          key={idx}
          className='flex flex-col space-y-4 border-b border-gray-300 py-5 sm:py-10 lg:space-y-8'
        >
          <Link
            href={`/products/${product.category.split(' ')[0]}/${product._id}`}
            aria-label={`go to ${product.name}`}
          >
            <div className='flex items-center space-x-4 md:space-x-10 xl:space-x-16 2xl:space-x-24'>
              <div className='aspect-square w-2/5 max-w-[15rem] rounded-2xl border border-gray-400 bg-white p-2 shadow-[0px_0px_10px_1px] shadow-gray-300 sm:p-4'>
                <div className='relative h-full'>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    className='object-contain'
                  />
                </div>
              </div>
              <div className='w-3/5 sm:w-full'>
                <p className='mt-2 line-clamp-1 md:line-clamp-2 lg:text-lg'>
                  {product.name}
                </p>
                <div className='flex flex-col'>
                  {user.cart[idx].selectedColor && (
                    <p className='text-sm text-gray-400 lg:text-base'>
                      Color: {user.cart[idx].selectedColor}
                    </p>
                  )}
                  {user.cart[idx].selectedSize && (
                    <p className='text-sm text-gray-400 lg:text-base'>
                      Size: {user.cart[idx].selectedSize}
                    </p>
                  )}
                  <div className='mt-1 flex items-center space-x-1 font-semibold sm:mt-4 xl:mt-6'>
                    <p className='decoration-slice text-lg text-gray-500 line-through lg:text-xl'>
                      &#8377;
                      {(
                        product.actualPrice * user.cart[idx].quantity
                      ).toLocaleString()}
                    </p>
                    <p className='text-xl lg:text-2xl'>
                      &#8377;
                      {(
                        product.discountedPrice * user.cart[idx].quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className='my-8 flex space-x-4'>
            <button
              className='h-10 rounded-full border-2 border-gray-400 px-4'
              disabled
            >
              Qty: {user.cart[idx].quantity}
            </button>
            <CartActions
              productId={product._id.toString()}
              selectedColor={user.cart[idx].selectedColor}
              selectedSize={user.cart[idx].selectedSize}
            />
          </div>
        </div>
      ))}

      <h2 id='price' className='mb-4 mt-10 text-xl font-semibold lg:text-2xl'>
        Price Details
      </h2>

      <table className='lg:text-lg'>
        <tbody>
          <tr>
            <td>Price ({products.length} items)</td>
            <td className='font-medium'>
              &#8377;{totalPrice.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>Discount</td>
            <td className='font-medium text-green-400'>
              - &#8377;{totalDiscount.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>Delivery Charges</td>
            <td>&#8377;0</td>
          </tr>
          <tr className='border-b-[1px] border-t-[1px] border-gray-300 text-lg font-semibold lg:text-xl'>
            <td>Total Amount</td>
            <td>&#8377;{(totalPrice - totalDiscount).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <div className='my-6 flex items-center justify-between'>
        <span>
          &#8377;
          <span className='text-2xl font-semibold lg:text-3xl'>
            {(totalPrice - totalDiscount).toLocaleString()}
          </span>
        </span>
        <CheckoutButton amount={totalPrice - totalDiscount} />
      </div>
    </div>
  )
}

export default CartPage
