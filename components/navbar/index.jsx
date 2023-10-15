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

      <div className='hidden w-1/3 min-w-[200px] max-w-[600px] lg:block lg:order-2 lg:justify-self-center'>
        <SearchBar />
      </div>
      <div className='md:order-1 md:flex md:items-center md:space-x-6'>
        <Link href='/' aria-label='Ashmeet store'>
          <LogoIcon className='w-8 h-8' />
        </Link>
        <div className='hidden space-x-4 md:flex xl:space-x-7 xl:text-lg 2xl:space-x-9'>
          <Link className="hover:text-gray-400" href="/products/shirts">Shirts</Link>
          <Link className="hover:text-gray-400" href="/products/earphones">Earphones</Link>
          <Link className="hover:text-gray-400" href="/products/shoes">Shoes</Link>
          <Link className="hover:text-gray-400" href="/products/watches">Watches</Link>
          <Link className="hover:text-gray-400" href="/products/laptops">Laptops</Link>
          <Link className="hover:text-gray-400" href="/products/mobiles">Mobiles</Link>
        </div>
      </div>
      <Link href='/cart' className='md:order-3' aria-label='Cart'>
        <CartIcon className='w-6 h-6' />
      </Link>
      <div className='flex items-center md:order-4'>
        <Profile />
      </div>
    </nav>
  )
}

export default Navbar
