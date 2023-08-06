'use client'

const GlobalError = () => {
  return (
    <html>
      <body>
        <div>
          <div className='flex min-h-[90vh] flex-col items-center justify-center'>
            <h2 className='mx-2 text-xl'>Something went Wrong</h2>
            <button
              type='button'
              aria-label='Try again'
              className='my-4 rounded-lg bg-black px-4 py-3 text-white hover:bg-gray-800'
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

export default GlobalError
