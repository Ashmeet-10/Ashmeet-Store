'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

const frameworks = [
  {
    value: 'price: low to high',
    label: 'Price: low to high',
  },
  {
    value: 'price: high to low',
    label: 'Price: high to low',
  },
  {
    value: 'ratings: low to high',
    label: 'Ratings: low to high',
  },
  {
    value: 'ratings: high to low',
    label: 'Ratings: high to low',
  },
]

const Sort = ({defaultValue}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue || '')
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between border border-black/50'
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : 'Sort by...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandGroup>
            {frameworks.map((framework, idx) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                  let url = `/products/${params.category}/filters`
                  if(idx===0) url+=`?pricesort=asc`
                  if(idx===1) url+=`?pricesort=desc`
                  if(idx===2) url+=`?ratingsort=asc`
                  if(idx===3) url+=`?ratingsort=desc`
                  if(searchParams.has('pricerange'))   url += `&pricerange=${searchParams.get('pricerange')}`
                  if(searchParams.has('ratings'))      url += `&ratings=${searchParams.get('ratings')}`
                  router.push(url)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Sort
