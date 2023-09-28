'use client'

import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { Supplier } from '@prisma/client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

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

const formSchema = z.object({
  approvalComment: z.string()
})

export default function SupplierApproveContainer({approverFullName, supplierData}:{approverFullName:string, supplierData:ISupplierExtended}) {
  
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      supplierId: supplierData.id,
      approvalComment: values.approvalComment
    }
    fetch(`http://localhost:3000/api/supplier/approve`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    router.push('/suppliers')
  }

  return (
    <div className='w-full h-full'>
      <div className='w-full h-[calc(100%-3.5rem)] p-4 overflow-y-auto'>
        <div className='p-3 border rounded mb-5 bg-white dark:bg-zinc-950'>
          <h1 className='text-4xl font-black mb-2'>{supplierData.name}</h1>
          <p className='text-zinc-500'>{supplierData.id}</p>
          <p>{supplierData.Status}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='p-3 border rounded mb-5 bg-white dark:bg-zinc-950'>
              <h2 className='text-2xl mb-3'>Approvals</h2>
              <h3 className='text-xl mb-2'>Approval Type: &nbsp;
                { supplierData.Status==='L1APPROVALREQUIRED' && 'L1 Approval' }
                { supplierData.Status==='L2APPROVALREQUIRED' && 'L2 Approval' }
              </h3>
              <div className='grid grid-cols-4 gap-3'>
                <div className='col-span-full'>
                  <FormField
                    control={form.control}
                    name="approvalComment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approval Comment</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>

      </div>
    </div>
  )
}
