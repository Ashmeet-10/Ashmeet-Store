import connectToDB from '@utils/database'
import Product from '@models/product'
import ProductsList from '@components/products/ProductsList'
import Sort from '@components/filters/Sort'
import Price from '@components/filters/Price'
import Rating from '@components/filters/Rating'
import { Button } from '@components/ui/button'
import Link from 'next/link'

export async function generateStaticParams() {
  await connectToDB()
  const products = await Product.find({}).select(
    'name rating discountedPrice actualPrice images category'
  )
  return products.map((product) => ({
    category: product.category.split(' ')[0],
  }))
}

const Category = async (props) => {
  const params = await props.params

  const { category } = params

  console.log('category page')
  await connectToDB()
  const products = await Product.find({}).select(
    'name rating discountedPrice actualPrice images category'
  )
  const categoryProducts = products.filter((product) =>
    product.category.includes(category)
  )
  return (
    <div className='mx-4 flex min-h-[90vh] flex-col space-y-8 lg:mx-8 xl:space-y-10'>
      <h2 className='mt-6 text-3xl font-bold tracking-tight capitalize lg:mt-8 lg:text-4xl xl:mt-10 xl:text-5xl'>
        {category}
      </h2>
      <div className='flex flex-wrap gap-3'>
        <Sort />
        <Price />
        <Rating />
        <Button
          variant='outline'
          className='w-[200px] border border-black/50'
          asChild
        >
          <Link href={`/products/${category}`}>Clear filters</Link>
        </Button>
      </div>
      <ProductsList products={categoryProducts} />
    </div>
  )
}

export default Category
