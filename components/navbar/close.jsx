'use client'

import CloseIcon from '@components/icons/close'

const CloseButton = ({ onClick }) => {
  return (
    <button
      type='button'
      name='close'
      aria-label='close'
      onClick={onClick}
    >
      <CloseIcon className='w-6 h-6' />
    </button>
  )
}

export default CloseButton
