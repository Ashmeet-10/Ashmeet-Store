'use client'

const AvailableColors = ({
  productColors,
  selectedColorIndex,
  setSelectedColorIndex,
}) => {
  return (
    <div className='space-y-2'>
      <p className='font-medium'>COLOR</p>
      <div className='flex flex-wrap items-center'>
        {productColors.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelectedColorIndex(index)}
            className={`mb-2 mr-2 flex items-center rounded-full border border-gray-400 p-3 text-xs font-semibold duration-300 ease-in-out hover:ring-2 hover:ring-black ${
              index === selectedColorIndex ? 'ring-2 ring-black' : ''
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AvailableColors
