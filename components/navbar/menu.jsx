'use client'

import MenuIcon from '@components/icons/menu'
import { useRef } from 'react'
import MobileMenu from './mobile-menu'

const MenuButton = () => {
  const mobileMenuRef = useRef(null)
  const OpenCloseMobileMenu = () => {
    mobileMenuRef.current.classList.toggle('-translate-x-full')
  }
  return (
    <>
      <button
        type='button'
        aria-label='menu'
        onClick={() => OpenCloseMobileMenu()}
      >
        <MenuIcon className='w-6 h-6' />
      </button>
      
      <div
        ref={mobileMenuRef}
        className='Mobile-menu w-full bg-white h-screen -translate-x-full fixed top-0 left-0 duration-300 ease-in-out z-50'
      >
        <div className='m-4'>
          <MobileMenu onClick={OpenCloseMobileMenu} />
        </div>
      </div>
    </>
  )
}

export default MenuButton
