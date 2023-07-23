import Link from 'next/link'
import LogoIcon from './icons/logo'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='mt-14 border-t border-black pb-6 pt-12'>
      <div className='mx-6'>
        <Link href='/' className='logo flex items-center space-x-2'>
          <LogoIcon className='h-8 w-8' />
          <span className='font-bold'>Ashmeet Store</span>
        </Link>

        <div className='footer-links my-8 flex flex-col space-y-6'>
          <Link className='hover:text-gray-400' href='/'>Home</Link>
          <Link className='hover:text-gray-400' href='/about'>About</Link>
          <Link className='hover:text-gray-400' href='/terms-conditions'>Terms & Conditions</Link>
          <Link className='hover:text-gray-400' href='/shipping-return-policy'>Shipping & Return Policy</Link>
          <Link className='hover:text-gray-400' href='/privacy-policy'>Privacy Policy</Link>
          <Link className='hover:text-gray-400' href='/faq'>FAQ</Link>
        </div>

        <div className='flex flex-col items-center justify-center space-y-4 border-t border-black py-6 text-sm md:flex-row md:justify-between md:space-y-0'>
          <p>© 2023 Ashmeet Store. All rights reserved.</p>
          <div className='flex space-x-2'>
            <span>Created with</span>
            <Image src='/next.svg' width={100} height={100} alt='next' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
