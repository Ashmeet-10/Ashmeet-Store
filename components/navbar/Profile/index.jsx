'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import ProfileIcon from '@components/icons/profile'
import Link from 'next/link'
import LoginButton from '../login'
import LogoutButton from '../logout'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import HeartIconEmpty from '@components/icons/heart-empty'
import CartIcon from '@components/icons/cart'
import { User } from 'lucide-react'

const Profile = () => {
  const { data: session } = useSession()
  return (
    <Popover>
      <PopoverTrigger>
        <ProfileIcon className='h-8 w-8' />
      </PopoverTrigger>
      <PopoverContent className='w-72 rounded-2xl'>
        <div className='mx-auto items-center space-y-4 '>
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
            <Link className='text-lg hover:text-gray-400' href='/orders'>
              <PopoverClose>
                <p className='flex items-center space-x-2'>
                  <User className='h-6 w-6' />
                  <span>My Orders</span>
                </p>
              </PopoverClose>
            </Link>
            <Link className='text-lg hover:text-gray-400' href='/wishlist'>
              <PopoverClose>
                <div className='flex items-center space-x-2'>
                  <HeartIconEmpty className='h-6 w-6' />
                  <span>Wishlist</span>
                </div>
              </PopoverClose>
            </Link>
            <Link className='text-lg hover:text-gray-400' href='/cart'>
              <PopoverClose>
                <div className='flex items-center space-x-2'>
                  <CartIcon className='h-6 w-6' />
                  <span>Cart</span>
                </div>
              </PopoverClose>
            </Link>
          </div>
          <div className=''>{session ? <LogoutButton /> : <LoginButton />}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Profile
