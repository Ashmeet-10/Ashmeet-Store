'use client'

const Error = ({ error, reset }) => {
  console.log(error)
  return (
    <div className='flex min-h-[90vh] flex-col items-center justify-center'>
      <h2 className='mx-2 text-xl'>Error fetching category</h2>
      <button
        type='button'
        aria-label='Try again'
        className='my-4 rounded-lg bg-black px-4 py-3 text-white hover:bg-gray-800'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}

export default Error
