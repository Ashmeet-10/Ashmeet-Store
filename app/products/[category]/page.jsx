import { connectToDB } from '@utils/database'
import { Product } from '@models/product'
import ProductsList from '@components/products/ProductsList'

export async function generateStaticParams() {
  await connectToDB()
  const products = await Product.find({})
  return products.map((product) => ({
    category: product.category.split(' ')[0],
  }))
}

const Category = async ({ params: { category } }) => {
  await connectToDB()
  const products = await Product.find({})
  const categoryProducts = products.filter((product) =>
    product.category.includes(category)
  )
  return (
    <div className='mx-4 flex min-h-[90vh] flex-col lg:mx-8'>
      <h2 className='my-6 text-3xl font-medium capitalize lg:text-4xl lg:my-8 xl:my-10'>{category}</h2>
      <ProductsList products={categoryProducts} />
    </div>
  )
}

export default Category
