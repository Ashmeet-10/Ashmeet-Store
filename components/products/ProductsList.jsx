import ProductCard from './ProductCard'

const ProductsList = ({ products, wishlist }) => {
  return (
    <div>
      <div className='grid grid-cols-1 justify-items-center gap-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {products.map((product, idx) => (
          <div key={product._id} className='w-4/5 min-w-[220px] max-w-[280px]'>
            <ProductCard
              product={product}
              wishlist={wishlist}
              priority={idx <= 1 ? true : false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsList
