'use client'

import { useSession, signIn, signOut } from "next-auth/react"

const LogoutButton = () => {
  const { data: session } = useSession()

  if(!session) return null

  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="bg-black text-white rounded-md ease-in-out duration-300 py-2 px-4 border-black hover:bg-gray-800 hover:scale-105"
    >
      Logout
    </button>
  )
}

export default LogoutButton
