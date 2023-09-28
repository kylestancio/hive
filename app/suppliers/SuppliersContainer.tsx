'use client'

import React, { useEffect, useState } from 'react'
import SuppliersDataTable from './SuppliersDataTable'
import { Button } from '@/components/ui/button'
import { Supplier } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function SuppliersContainer() {

  const router = useRouter()

  const [rowData, setRowData] = useState<Supplier[]>()

  const getData = async () => {
    const data:Supplier[] = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/supplier/all`).then(res=>res.json())
    return data;
  }

  useEffect(()=>{
    getData().then(data=>setRowData(data))
  },[])

  return (
    <div className='w-full h-full'>
      <div className='w-full h-14 bg-white dark:bg-zinc-900 px-3 py-1 flex justify-between'>
        <div className='my-auto'>
          <p className='text-xl font-bold'>Suppliers</p>
          <p className='text-sm'>All</p>
        </div>
        <div className='my-auto'>
          <Button onClick={()=>router.push('/suppliers/create')}>Add Supplier</Button>
        </div>
      </div>
      { !rowData && 
        <div className='w-full h-[calc(100%-3.5rem)] flex'>
          <div className='m-auto'>
            <h1 className='text-center text-4xl font-black'><Loader2 size={30} className='animate-spin inline me-3' />Loading Data...</h1>
          </div>
        </div>
      }
      { rowData && 
        <SuppliersDataTable className="w-full h-[calc(100%-3.5rem)]" rowData={rowData} />
      }
      
    </div>
  )
}
