import connectToDB from '@utils/database'
import Product from '@models/product'
import ProductsList from '@components/products/ProductsList'

const Home = async () => {
  let products = []
  try {
    await connectToDB()
    products = await Product.find({}).select(
      'name rating discountedPrice actualPrice images category'
    )
    console.log('Working')
  } catch (error) {
    console.log(error)
  }

  return (
    <div className='mx-4 flex min-h-[90vh] flex-col lg:mx-8'>
      <h2 className='my-6 text-3xl font-bold capitalize tracking-tight lg:my-8 lg:text-4xl xl:my-10 xl:text-5xl'>
        All products
      </h2>
      <ProductsList products={products} />
    </div>
  )
}

export default Home
