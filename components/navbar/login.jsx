'use client'

import { useSession, signIn } from 'next-auth/react'

const LoginButton = () => {
  const { data: session } = useSession()

  if (session) return null

  return (
    <>
      <button
        type='button'
        aria-label='login'
        onClick={() => signIn()}
        className='rounded-md border-black bg-black px-4 py-2 text-white duration-300 ease-in-out hover:scale-105 hover:bg-gray-800'
      >
        Login
      </button>
    </>
  )
}

export default LoginButton
