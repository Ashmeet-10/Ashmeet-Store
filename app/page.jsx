import { connectToDB } from '@utils/database'
import { Product } from '@models/product'
import ProductsList from '@components/products/ProductsList'

const Home = async () => {
  let products = []
  try {
    await connectToDB()
    products = await Product.find({})
    console.log('Working')
  } catch (error) {
    console.log(error)
  }

  return (
    <div className='mx-4 flex flex-col'>
      <h2 className='my-6 text-3xl font-medium capitalize'>All products</h2>
      <ProductsList products={products} />
    </div>
  )
}

export default Home
