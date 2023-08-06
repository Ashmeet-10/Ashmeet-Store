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
    value: '₹0-₹749',
    label: '₹0-₹749',
  },
  {
    value: '₹750-₹1499',
    label: '₹750-₹1499',
  },
  {
    value: '₹1500-₹4999',
    label: '₹1500-₹4999',
  },
  {
    value: 'above ₹5000',
    label: 'above ₹5000',
  },
]

const Price = ({defaultValue}) => {
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
            : 'Price...'}
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
                  if(idx===0) url += `?pricerange=0-749`
                  if(idx===1) url += `?pricerange=750-1499`
                  if(idx===2) url += `?pricerange=1500-4999`
                  if(idx===3) url += `?pricerange=5000-10000000`
                  if(searchParams.has('pricesort'))  url += `&pricesort=${searchParams.get('pricesort')}`
                  if(searchParams.has('ratings'))    url += `&ratings=${searchParams.get('ratings')}`
                  if(searchParams.has('ratingsort')) url += `&ratingsort=${searchParams.get('ratingsort')}`
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

export default Price
