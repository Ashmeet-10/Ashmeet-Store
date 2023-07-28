'use client'

import { useState } from 'react'
import SearchIcon from './icons/search'
import { useRouter } from 'next/navigation'

const SearchBar = ({ onClick }) => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  return (
    <div className='flex items-center rounded-full border border-gray-500 p-2 px-4'>
      <input
        type='text'
        onChange={(e) => setSearch(e.target.value)}
        className='w-full outline-none'
        placeholder='Search for Products'
      />
      <button
        type='button'
        name='search'
        aria-label='search'
        onClick={() => {
          if (search) {
            onClick && onClick()
            router.push(`/search/${search}`)
          }
        }}
        className='search-icon'
      >
        <SearchIcon className='h-6 w-6' />
      </button>
    </div>
  )
}

export default SearchBar
