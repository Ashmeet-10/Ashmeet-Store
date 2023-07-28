'use client'

const GlobalError = () => {
  return (
    <html>
      <body>
        <div>
          <h2>Something went wrong</h2>
          <button aria-label='Try again' type='button' onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

export default GlobalError
