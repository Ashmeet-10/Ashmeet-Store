import SearchIcon from '@components/icons/search'
import ProductsList from '@components/products/ProductsList'
import Product from '@models/product'
import connectToDB from '@utils/database'

const SearchResultsPage = async ({ params: { query } }) => {
  let products, filteredProducts
  // remove %20 from query
  let searchQuery = query.replace(/%20/g, ' ')
  try {
    await connectToDB()
    products = await Product.find({})
    filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  } catch (error) {
    console.log(error)
  }

  if (filteredProducts.length === 0) {
    return (
      <div className='mx-4 flex min-h-[90vh] flex-col items-center justify-center'>
        <SearchIcon className='h-14 w-14 lg:h-20 lg:w-20' />
        <h2 className='mx-4 mb-2 mt-6 text-xl font-medium lg:text-2xl'>
          Sorry, No results found!
        </h2>
        <p className='text-center text-sm font-medium lg:text-base'>
          Please check the spelling or try searching for something else
        </p>
      </div>
    )
  }

  return (
    <div className='mx-4 min-h-[90vh] lg:mx-8'>
      <h2 className='my-6 text-xl font-medium lg:my-8 lg:text-2xl xl:my-10 xl:text-3xl'>
        Showing results for : {searchQuery}
      </h2>
      <ProductsList products={filteredProducts} />
    </div>
  )
}

export default SearchResultsPage
