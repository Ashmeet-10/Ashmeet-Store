'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import ProfileIcon from '@components/icons/profile'
import Link from 'next/link'
import { useRef } from 'react'
import CloseButton from '../close'
import LoginButton from '../login'
import LogoutButton from '../logout'

const Profile = () => {
  const { data: session } = useSession()
  const ProfileRef = useRef(null)
  const OpenCloseProfile = () => {
    ProfileRef.current.classList.toggle('translate-x-full')
  }
  
  return (
    <>
      <button type='button' onClick={OpenCloseProfile}>
        {session ? (
          <Image
            src={session?.user?.image}
            width={32}
            height={32}
            className='rounded-full'
            alt='user'
          />
        ) : (
          <ProfileIcon className='h-8 w-8' />
        )}
      </button>
      <div
        ref={ProfileRef}
        className='Profile fixed left-0 top-0 z-50 h-screen w-full translate-x-full bg-white p-4 duration-300 ease-in-out'
      >
        <div>
          <CloseButton onClick={OpenCloseProfile} />
        </div>
        <div className='mx-auto h-80 w-52 items-center space-y-4 rounded-xl border border-gray-300 p-4'>
          <div className='flex flex-col items-center space-y-1'>
            {session ? (
              <>
                <Image
                  src={session?.user?.image}
                  width={56}
                  height={56}
                  alt='user'
                  className='rounded-full'
                />
                <p className='text-xl font-semibold'>{session.user.name}</p>
                <p className='text-sm font-semibold'>{session.user.email}</p>
              </>
            ) : (
              <>
                <ProfileIcon className='h-14 w-14' />
                <p className='font-semibold'>Guest</p>
              </>
            )}
          </div>
          <div className='flex flex-col space-y-1'>
            <Link onClick={OpenCloseProfile} className='hover:text-gray-400 text-lg' href='/'>My Account</Link>
            <Link onClick={OpenCloseProfile} className='hover:text-gray-400 text-lg' href='/wishlist'>Wishlist</Link>
            <Link onClick={OpenCloseProfile} className='hover:text-gray-400 text-lg' href='/cart'>Cart</Link>
          </div>
          <div className=''>{session ? <LogoutButton /> : <LoginButton />}</div>
        </div>
      </div>
    </>
  )
}

export default Profile
