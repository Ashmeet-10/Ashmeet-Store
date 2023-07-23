import ProductCard from './ProductCard'

const ProductsList = ({ products }) => {
  return (
    <div>
      <div className='grid grid-cols-1 gap-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <div
            key={product._id}
            className='mx-auto w-4/5 min-w-[230px] max-w-[250px]'
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsList
