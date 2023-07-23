'use client'

const AvailableSizes = ({
  productSizes,
  selectedSizeIndex,
  setSelectedSizeIndex,
}) => {
  return (
    <div className='mt-3 space-y-2'>
      <p>SIZE</p>
      <div className='flex flex-wrap items-center'>
        {productSizes.map((size, index) => (
          <button
            key={index}
            onClick={() => setSelectedSizeIndex(index)}
            className={`mb-2 mr-2 flex items-center rounded-full border border-gray-400 px-4 py-3 text-xs font-semibold duration-300 ease-in-out hover:ring-2 hover:ring-black ${
              index === selectedSizeIndex ? 'ring-2 ring-black' : ''
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AvailableSizes
