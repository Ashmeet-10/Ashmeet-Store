import Price from '@components/filters/Price'
import Rating from '@components/filters/Rating'
import Sort from '@components/filters/Sort'
import ProductsList from '@components/products/ProductsList'
import { Button } from '@components/ui/button'
import Product from '@models/product'
import connectToDB from '@utils/database'
import Link from 'next/link'

const page = async ({ params: { category }, searchParams }) => {
  console.log('filters page')
  await connectToDB()
  const products = await Product.find({}).select(
    'name rating discountedPrice actualPrice images category'
  )
  const categoryProducts = products.filter((product) =>
    product.category.includes(category)
  )
  let defaultSort = '',
    defaultPriceRange = '',
    defaultRating = ''
  let filteredProducts = categoryProducts

  if (searchParams.pricerange) {
    let priceRange = searchParams.pricerange.split('-')
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.discountedPrice >= Number(priceRange[0]) &&
        product.discountedPrice <= Number(priceRange[1])
    )
    if (priceRange[0] === '0' && priceRange[1] === '749')
      defaultPriceRange = '₹0-₹749'
    if (priceRange[0] === '750' && priceRange[1] === '1499')
      defaultPriceRange = '₹750-₹1499'
    if (priceRange[0] === '1500' && priceRange[1] === '4999')
      defaultPriceRange = '₹1500-₹4999'
    if (priceRange[0] === '5000' && priceRange[1] === '10000000')
      defaultPriceRange = 'above ₹5000'
  }
  if (searchParams.ratings) {
    const ratings = searchParams.ratings
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= ratings
    )
    defaultRating = `above ${ratings}`
  }
  if (searchParams.pricesort) {
    const order = searchParams.pricesort
    if (order === 'asc') {
      filteredProducts = filteredProducts.sort(
        (a, b) => a.discountedPrice - b.discountedPrice
      )
      defaultSort = 'price: low to high'
    } else {
      filteredProducts = filteredProducts.sort(
        (a, b) => b.discountedPrice - a.discountedPrice
      )
      defaultSort = 'price: high to low'
    }
  }

  if (searchParams.ratingsort) {
    const order = searchParams.ratingsort
    if (order === 'asc') {
      filteredProducts = filteredProducts.sort((a, b) => a.rating - b.rating)
      defaultSort = 'ratings: low to high'
    } else {
      filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating)
      defaultSort = 'ratings: high to low'
    }
  }
  return (
    <div className='mx-4 flex min-h-[90vh] flex-col space-y-8 lg:mx-8 xl:space-y-10'>
      <h2 className='mt-6 text-3xl font-bold capitalize lg:mt-8 lg:text-4xl xl:mt-10 xl:text-5xl'>
        {category}
      </h2>
      <div className='flex flex-wrap gap-3'>
        <Sort defaultValue={defaultSort} />
        <Price defaultValue={defaultPriceRange} />
        <Rating defaultValue={defaultRating} />
        <Button
          variant='outline'
          className='w-[200px] border border-black/50'
          asChild
        >
          <Link href={`/products/${category}`}>Clear filters</Link>
        </Button>
      </div>
      {filteredProducts.length === 0 ? (
        <h2 className='mt-16 text-center text-2xl font-semibold lg:text-3xl'>
          No products found
        </h2>
      ) : (
        <ProductsList products={filteredProducts} />
      )}
    </div>
  )
}

export default page
