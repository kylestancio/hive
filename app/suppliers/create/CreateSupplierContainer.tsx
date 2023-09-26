'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(1).max(50),
  country: z.string(),
  primaryAddress: z.string(),
  secondaryAddress: z.string().optional(),
  primaryPhone: z.string(),
  secondaryPhone: z.string().optional(),
  primaryEmail: z.string(),
  secondaryEmail: z.string().optional(),

  bankAccountNumber: z.string(),
  bankAccountName: z.string(),
  bankName: z.string(),
  bankCountry: z.string(),
  bankBranch: z.string(),
})

export default function CreateSupplierContainer() {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    fetch(`http://localhost:3000/api/supplier/create`, {
      method: 'POST',
      body: JSON.stringify(values)
    })

    router.push('/suppliers')
  }


  return (
    <div className='w-full h-full'>
      <div className='w-full h-14 bg-white dark:bg-zinc-900 px-3 py-1 flex justify-between'>
        <div className='my-auto'>
          <p className='text-xl font-bold'>Suppliers</p>
          <p className='text-sm'>Create</p>
        </div>
      </div>
      <div className='w-full h-[calc(100%-3.5rem)] p-4 overflow-x-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='p-3 border rounded mb-5'>
              <h2 className='text-2xl mb-3'>Basic Information</h2>
              <div className='grid grid-cols-4 gap-3'>

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="primaryEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="secondaryEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="primaryPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="secondaryPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=' col-span-full'>
                  <FormField
                    control={form.control}
                    name="primaryAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=' col-span-full'>
                  <FormField
                    control={form.control}
                    name="secondaryAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary Address</FormLabel>
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
            <div className='p-3 border rounded mb-5'>
              <h2 className='text-2xl mb-3'>Banking Details</h2>
              <div className='grid grid-cols-4 gap-3'>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="bankAccountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name="bankAccountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="bankBranch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Branch</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=''>
                  <FormField
                    control={form.control}
                    name="bankCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
