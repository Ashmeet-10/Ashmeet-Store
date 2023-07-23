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
            className='rounded-lg bg-black px-3 py-2 text-white duration-500 ease-in-out hover:scale-110 hover:bg-gray-800'
          >
            Shop Now
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className='mx-4 flex min-h-[90vh] flex-col'>
      <h1 className='my-6 text-4xl font-medium'>My Cart</h1>
      {products.map((product, idx) => (
        <div key={idx} className='my-4 flex flex-col space-y-2'>
          <Link href={`/products/${product.category}/${product._id}`}>
            <div className='flex space-x-3'>
              <div className='relative aspect-square w-20 bg-white'>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill={true}
                  className='object-contain'
                />
              </div>
              <div className='w-full'>
                <p className='mt-2 line-clamp-1'>{product.name}</p>
                <div className='flex flex-col'>
                  {user.cart[idx].selectedColor && (
                    <p className='text-sm text-gray-400'>
                      Color: {user.cart[idx].selectedColor}
                    </p>
                  )}
                  {user.cart[idx].selectedSize && (
                    <p className='text-sm text-gray-400'>
                      Size: {user.cart[idx].selectedSize}
                    </p>
                  )}
                  <div className='mt-1 flex items-center space-x-1 font-semibold'>
                    <p className='decoration-slice text-gray-500 line-through'>
                      &#8377;
                      {(
                        product.actualPrice * user.cart[idx].quantity
                      ).toLocaleString()}
                    </p>
                    <p className='text-lg'>
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

          <div className='flex space-x-4'>
            <button
              className='h-9 rounded-lg border border-gray-500 px-2'
              disabled
            >
              Qty: {user.cart[idx].quantity}
            </button>
            <CartActions
              userId={user._id.toString()}
              productId={product._id.toString()}
              selectedColor={user.cart[idx].selectedColor}
              selectedSize={user.cart[idx].selectedSize}
            />
          </div>
        </div>
      ))}

      <h2 id='price' className='mb-4 mt-10 text-xl font-semibold'>
        Price Details
      </h2>
      <table>
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
          <tr className='border-b-[1px] border-t-[1px] border-gray-300'>
            <td className='text-lg font-semibold'>Total Amount</td>
            <td className='text-lg font-semibold'>
              &#8377;{(totalPrice - totalDiscount).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <div className='my-6 flex items-center justify-between'>
        <span>
          &#8377;
          <span className='text-2xl font-semibold'>
            {(totalPrice - totalDiscount).toLocaleString()}
          </span>
        </span>
        <CheckoutButton amount={totalPrice - totalDiscount} />
      </div>
    </div>
  )
}

export default CartPage
