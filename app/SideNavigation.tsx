'use client'

import { Button } from '@/components/ui/button';
import { Building2, LayoutDashboard, MoreVertical, SidebarCloseIcon, UserSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function SideNavigation() {

  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className='w-[300px] flex flex-col border-r border-r-zinc-300'>
      <div className='mb-5 p-7'>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-black'>HIVE</h1>
          <Button variant={'ghost'} size={'icon'} className='my-auto'><SidebarCloseIcon /></Button>
        </div>
        <h1 className='text-zinc-400-'>v 0.0</h1>
      </div>

      <nav className='grow p-2 flex flex-col gap-1'>
        <Button size={'lg'} className='block w-full text-left' onClick={()=>router.push('/')}><LayoutDashboard className='inline me-2' />Dashboard</Button>
        <Button size={'lg'} className='block w-full text-left' onClick={()=>router.push('/users')}><UserSquare className='inline me-2' />Users</Button>
        <Button size={'lg'} className='block w-full text-left' onClick={()=>router.push('/suppliers')}><Building2 className='inline me-2' />Suppliers</Button>
      </nav>

      <div className='p-3'>
        <div className='mb-2 border-t border-b border-t-zinc-400 border-b-zinc-400 py-2 flex gap-2'>
          <div className='rounded-full bg-zinc-600 h-10 w-10'>
            {/* IMAGE CONTAINER */}
          </div>
          <div className='grow my-auto'>
            <p>Username</p>
          </div>
          <div className='my-auto'>
            <Button variant={'ghost'} size={'icon'}><MoreVertical /></Button>
          </div>
        </div>
        <p className='text-xs text-center'>Created by @kylestancio</p>
      </div>

    </div>
  )
}