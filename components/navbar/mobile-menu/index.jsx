'use client'

import SearchBar from "@components/SearchBar"
import Link from "next/link"
import CloseButton from "../close"

const MobileMenu = ({onClick}) => {
  return (
    <div>
      <CloseButton onClick={onClick} />
      <div className="my-4">
        <SearchBar onClick={onClick} />
      </div>
      <div className="flex flex-col space-y-2 text-xl">
        <Link onClick={onClick} className="hover:text-gray-400" href="/">All</Link>
        <Link onClick={onClick} className="hover:text-gray-400" href="/products/shirts">Shirts</Link>
        <Link onClick={onClick} className="hover:text-gray-400" href="/products/earphones">Earphones</Link>
        <Link onClick={onClick} className="hover:text-gray-400" href="/products/shoes">Shoes</Link>
        <Link onClick={onClick} className="hover:text-gray-400" href="/products/watches">Watches</Link>
        <Link onClick={onClick} className="hover:text-gray-400" href="/products/laptops">Laptops</Link>
        <Link onClick={onClick} className="hover:text-gray-400" href="/products/mobiles">Mobiles</Link>
      </div>
    </div>
  )
}

export default MobileMenu
