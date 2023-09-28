import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma';
import { Session, getServerSession } from 'next-auth'
import React from 'react'
import SupplierApproveContainer from './SupplierApproveContainer';
import { Supplier } from '@prisma/client';

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

export default async function SupplierApprovePage({params}:{params:{supplierId:string}}) {

  const session = await getServerSession(authOptions)
  const {user}:Session = session;

  // CHECK IF USER HAS RIGHT ROLES
  if (!(
    user.roles.includes('SUPERADMIN') || 
    user.roles.includes('L1APPROVER') ||
    user.roles.includes('L2APPROVER'))
    ){
    return (
      <div className='w-full h-full flex'>
        <div className='m-auto'>
          <h1 className='text-center text-4xl font-black'>Not Allowed</h1>
          <p className="text-center">You do not have the right role to access this page.</p>
        </div>
      </div>
    )
  }

  const supplier:ISupplierExtended | null = await prisma.supplier.findFirst({
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
    <div className='w-full h-full'>
      { !supplier && 
        <div className='w-full h-full flex'>
          <div className='m-auto'>
            <h1 className='text-center text-4xl font-black'>Supplier not found</h1>
            <p className="text-center">This supplier does not exist.</p>
          </div>
        </div>
      }

      { supplier && (supplier.Status==='ACTIVE' || supplier.Status==='INACTIVE') && 
        <div className='w-full h-full flex'>
          <div className='m-auto'>
            <h1 className='text-center text-4xl font-black'>Supplier already approved.</h1>
            <p className="text-center">This supplier has been approved.</p>
          </div>
        </div>
      }

      { supplier && (supplier.Status==='L1APPROVALDENIED' || supplier.Status==='L2APPROVALDENIED') && 
        <div className='w-full h-full flex'>
          <div className='m-auto'>
            <h1 className='text-center text-4xl font-black'>Supplier is denied</h1>
            <p className="text-center">This supplier has been denied. Please edit the details and submit again.</p>
          </div>
        </div>
      }

      { supplier && 
        <div>
          <div className='w-full h-14 bg-white dark:bg-zinc-900 px-3 py-1 flex justify-between'>
            <div className='my-auto'>
              <p className='text-xl font-bold'>Suppliers</p>
              <p className='text-sm'>Approve</p>
            </div>
          </div>
          <SupplierApproveContainer approverFullName={user.fullName} supplierData={supplier} />
        </div>
      }
    </div>
  )
}
