'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getSupplierApprovalStatusText } from '@/lib/utils'
import { Prisma, Supplier } from '@prisma/client'
import { Label } from '@radix-ui/react-label'
import React from 'react'

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

export default function ViewSupplierContainer({supplierData}:{supplierData:ISupplierExtended}) {
  
  const bankingDetails = supplierData.bankingDetails as Prisma.JsonObject

  const getSupplierRenderedStatus = (status:string) => {
    if (status === 'L1APPROVALREQUIRED') {
      return <span className='inline-block'><div className="w-2 h-2 rounded-full bg-yellow-400 inline-block me-3"></div>L1 Approval Required</span>
    }
    if (status === 'L1APPROVALDENIED') {
      return <span className='inline-block'><div className="w-2 h-2 rounded-full bg-red-500 inline-block me-3"></div>L1 Approval Denied</span>
    }
    if (status === 'L2APPROVALREQUIRED') {
      return <span className='inline-block'><div className="w-2 h-2 rounded-full bg-yellow-400 inline-block me-3"></div>L2 Approval Required</span>
    }
    if (status === 'L2APPROVALDENIED') {
      return <span className='inline-block'><div className="w-2 h-2 rounded-full bg-red-500 inline-block me-3"></div>L2 Approval Denied</span>
    }
    if (status === 'ACTIVE') {
      return <span className='inline-block'><div className="w-2 h-2 rounded-full bg-green-500 inline-block me-3"></div>Active</span>
    }
    if (status === 'INACTIVE') {
      return <span className='inline-block'><div className="w-2 h-2 rounded-full bg-zinc-500 inline-block me-3"></div>Inactive</span>
    }
    return <span className='inline-block'>{status}</span>
  }

  

  return (
    <div className='w-full h-full'>
      <div className='w-full h-[calc(100%-3.5rem)] p-4 overflow-y-auto'>
        <div className='p-3 border rounded mb-5 bg-white dark:bg-zinc-950'>
          <h1 className='text-4xl font-black mb-2'>{supplierData.name}</h1>
          <p className='text-zinc-500'>{supplierData.id}</p>
          { getSupplierRenderedStatus(supplierData.Status) }
        </div>
        <div className='p-3 border rounded mb-5 bg-white dark:bg-zinc-950'>
          <h2 className='text-2xl mb-3'>Basic Information</h2>
          <div className='grid grid-cols-4 gap-3'>

            <div className='col-span-3'>
              <Label className='text-sm font-medium'>Supplier Company Name</Label>
              <Input value={supplierData.name} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Country</Label>
              <Input value={supplierData.name} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Primary Email</Label>
              <Input value={supplierData.name} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Secondary Email</Label>
              <Input value={supplierData.name} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Primary Phone</Label>
              <Input value={supplierData.name} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Secondary Phone</Label>
              <Input value={supplierData.name} readOnly></Input>
            </div>

            <div className='col-span-full'>
              <Label className='text-sm font-medium'>Primary Address</Label>
              <Textarea value={supplierData.name} readOnly></Textarea>
            </div>

            <div className='col-span-full'>
              <Label className='text-sm font-medium'>Secondary Address</Label>
              <Textarea value={supplierData.name} readOnly></Textarea>
            </div>

          </div>

        </div>
        <div className='p-3 border rounded mb-5 bg-white dark:bg-zinc-950'>
          <h2 className='text-2xl mb-3'>Banking Details</h2>
          <div className='grid grid-cols-4 gap-3'>

            <div className=''>
              <Label className='text-sm font-medium'>Account Number</Label>
              <Input value={bankingDetails.bankAccountNumber?.toString() || ''} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Account Name</Label>
              <Input value={bankingDetails.bankAccountName?.toString() || ''} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Bank Name</Label>
              <Input value={bankingDetails.bankName?.toString() || ''} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Bank Branch</Label>
              <Input value={bankingDetails.bankBranch?.toString() || ''} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>Bank Country</Label>
              <Input value={bankingDetails.bankCountry?.toString() || ''} readOnly></Input>
            </div>

          </div>
        </div>

        <div className='p-3 border rounded mb-5 bg-white dark:bg-zinc-950'>
          <h2 className='text-2xl mb-3'>Approvals</h2>
          <h3 className='text-xl mb-2'>L1 Approval</h3>
          <div className='grid grid-cols-4 gap-3 mb-5'>

            <div className='col-span-3'>
              <Label className='text-sm font-medium'>L1 Approver</Label>
              <Input value={supplierData.ApproverL1?.fullName || ''} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>L1 Approval Status</Label>
              <Input value={getSupplierApprovalStatusText(supplierData.ApproverL1Status) || ''} readOnly></Input>
            </div>

            <div className='col-span-full'>
              <Label className='text-sm font-medium'>L1 Approver Comments</Label>
              <Textarea value={supplierData.approverL1Comments || ''} readOnly></Textarea>
            </div>

          </div>
          <h3 className='text-xl mb-2'>L2 Approval</h3>
          <div className='grid grid-cols-4 gap-3'>

            <div className='col-span-3'>
              <Label className='text-sm font-medium'>L2 Approver</Label>
              <Input value={supplierData.ApproverL2?.fullName || ''} readOnly></Input>
            </div>

            <div className=''>
              <Label className='text-sm font-medium'>L2 Approval Status</Label>
              <Input value={getSupplierApprovalStatusText(supplierData.ApproverL2Status) || ''} readOnly></Input>
            </div>

            <div className='col-span-full'>
              <Label className='text-sm font-medium'>L2 Approver Comments</Label>
              <Textarea value={supplierData.approverL2Comments || ''} readOnly></Textarea>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
