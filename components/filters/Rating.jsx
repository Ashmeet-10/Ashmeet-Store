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
    value: 'above 1',
    label: 'above 1',
  },
  {
    value: 'above 2',
    label: 'above 2',
  },
  {
    value: 'above 3',
    label: 'above 3',
  },
  {
    value: 'above 4',
    label: 'above 4',
  },
]

const Rating = ({defaultValue}) => {
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
            : 'Rating...'}
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
                  if(idx===0) url += `?ratings=1`
                  if(idx===1) url += `?ratings=2`
                  if(idx===2) url += `?ratings=3`
                  if(idx===3) url += `?ratings=4`
                  if(searchParams.has('pricesort'))   url += `&pricesort=${searchParams.get('pricesort')}`
                  if(searchParams.has('ratingsort'))  url += `&ratingsort=${searchParams.get('ratingsort')}`
                  if(searchParams.has('pricerange'))  url += `&pricerange=${searchParams.get('pricerange')}`
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

export default Rating
