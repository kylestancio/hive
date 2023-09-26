import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <div className=''>
      <div className='w-full h-14 bg-white px-3 py-1 flex justify-between'>
        <div className='my-auto'>
          <p className='text-xl font-bold'>Dashboard</p>
          <p className='text-sm'>View</p>
        </div>
        <div className='my-auto'>
          <Button>Action Button</Button>
        </div>
      </div>
      <div className='p-3'>
        <p>test</p>
      </div>
    </div>
  )
}
