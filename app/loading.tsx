import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-full h-full flex'>
      <div className='m-auto'>
        <h1 className='text-center text-4xl font-black'><Loader2 size={30} className='animate-spin inline me-3' />Loading...</h1>
      </div>
    </div>
  )
}
