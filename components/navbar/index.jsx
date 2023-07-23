import Link from 'next/link'
import LogoIcon from '@components/icons/logo'
import CartIcon from '@components/icons/cart'
import SearchBar from '@components/SearchBar'
import MenuButton from './menu'
import Profile from './Profile'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4'>
      <div className='md:hidden'>
        <MenuButton />
      </div>

      <div className='hidden md:w-1/3 md:block md:order-2 md:justify-self-center'>
        <SearchBar />
      </div>
      <div className='md:w-1/3 md:order-1 md:flex md:items-center md:space-x-6'>
        <Link href='/' className=''>
          <LogoIcon className='w-8 h-8' />
        </Link>
        <div className='hidden space-x-4 md:flex'>
        <Link className="hover:text-gray-400" href="/products/shirts">Shirts</Link>
        <Link className="hover:text-gray-400" href="/products/watches">Watches</Link>
        <Link className="hover:text-gray-400" href="/products/laptops">Laptops</Link>
        <Link className="hover:text-gray-400" href="/products/mobiles">Mobiles</Link>
        </div>
      </div>
      <Link href='/cart' className='md:order-3 md:w-1/3'>
        <CartIcon className='w-6 h-6' />
      </Link>
      <div className='flex items-center'>
        <Profile />
      </div>
    </nav>
  )
}

export default Navbar
