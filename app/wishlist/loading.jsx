import Image from 'next/image'

const loading = () => {
  return (
    <div className='flex min-h-[90vh] items-center justify-center'>
      <Image
        src='/loading.svg'
        alt='Loading...'
        width={60}
        height={60}
        className='animate-spin'
      />
    </div>
  )
}

export default loading
