'use client'

import SearchBar from '@components/SearchBar'
import Link from 'next/link'
import CloseButton from '../close'

const MobileMenu = ({onClick}) => {
  return (
    <div>
      <CloseButton onClick={onClick} />
      <div className='my-4'>
        <SearchBar onClick={onClick} />
      </div>
      <div className='flex flex-col space-y-2 text-xl'>
        <Link onClick={onClick} className='hover:text-gray-400' href='/' aria-label='All products'>All</Link>
        <Link onClick={onClick} className='hover:text-gray-400' href='/products/shirts' aria-label='Shirts'>Shirts</Link>
        <Link onClick={onClick} className='hover:text-gray-400' href='/products/earphones' aria-label='Earphones'>Earphones</Link>
        <Link onClick={onClick} className='hover:text-gray-400' href='/products/shoes' aria-label='Shoes'>Shoes</Link>
        <Link onClick={onClick} className='hover:text-gray-400' href='/products/watches' aria-label='Watches'>Watches</Link>
        <Link onClick={onClick} className='hover:text-gray-400' href='/products/laptops' aria-label='Laptops'>Laptops</Link>
        <Link onClick={onClick} className='hover:text-gray-400' href='/products/mobiles' aria-label='Mobiles'>Mobiles</Link>
      </div>
    </div>
  )
}

export default MobileMenu
