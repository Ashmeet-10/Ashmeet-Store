'use client'

import { useSession, signIn } from "next-auth/react"

const LoginButton = () => {
  const { data: session } = useSession()

  if (session) return null

  return (
    <>
      <button
        type="button"
        onClick={() => signIn()}
        className="bg-black text-white rounded-md ease-in-out duration-300 py-2 px-4 border-black hover:bg-gray-800 hover:scale-105"
      >
        Login
      </button>
    </>
  )
}

export default LoginButton
