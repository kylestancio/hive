import React from 'react'
import ViewSupplierContainer from './ViewSupplierContainer'
import prisma from '@/lib/prisma'
import { Supplier } from '@prisma/client'

interface ISupplierExtended extends Supplier{
  ApproverL1: {
    fullName: string
  } | null,
  ApproverL2: {
    fullName: string
  } | null,
  createdByUser: {
    fullName: string
  } | null
}

export default async function ViewSupplier({params}:{params:{supplierId:string}}) {


  const supplierData:ISupplierExtended | null = await prisma.supplier.findFirst({
    where: {
      id: params.supplierId
    },
    include: {
      createdByUser: {
        select: {
          fullName: true
        }
      },
      ApproverL1: {
        select: {
          fullName: true
        }
      },
      ApproverL2: {
        select: {
          fullName: true
        }
      }
    }
  })

  return (
    <div className='w-full h-full overflow-y-hidden'>
      { !supplierData && 
        <div className='w-full h-full flex'>
          <div className='m-auto'>
            <h1 className='text-center text-4xl font-black'>Supplier Not Found</h1>
            <p className="text-center">This supplier does not exist.</p>
          </div>
        </div>
      }
      { supplierData && 
        <>
          <div className='w-full h-14 bg-white dark:bg-zinc-900 px-3 py-1 flex justify-between'>
            <div className='my-auto'>
              <p className='text-xl font-bold'>Suppliers</p>
              <p className='text-sm'>View</p>
            </div>
          </div>
          <ViewSupplierContainer supplierData={supplierData} />
        </>
      }
    </div>
  )
}
