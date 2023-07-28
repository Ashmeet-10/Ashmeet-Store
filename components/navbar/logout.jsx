'use client'

import { useSession, signOut } from 'next-auth/react'

const LogoutButton = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <button
      type='button'
      aria-label='logout'
      onClick={() => signOut()}
      className='rounded-md border-black bg-black px-4 py-2 text-white duration-300 ease-in-out hover:scale-105 hover:bg-gray-800'
    >
      Logout
    </button>
  )
}

export default LogoutButton
