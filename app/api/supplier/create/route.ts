import prisma from "@/lib/prisma";
import { Supplier } from "@prisma/client";
import {type NextRequest, NextResponse } from "next/server";

interface ISupplierExtended extends Supplier{
  bankAccountNumber: string
  bankAccountName: string
  bankName: string
  bankCountry: string
  bankBranch: string
  
}

export async function POST(req: NextRequest){

  const body:ISupplierExtended = await req.json()

  // const session = getServerSession(authOptions)
  const user = {
    id: "clmzqifln0002uvjctip8w2ri"
  }

  try{
    await prisma.supplier.create({
      data: {
        name: body.name,
        country: body.country,
        primaryAddress: body.primaryAddress,
        secondaryAddress: body.secondaryAddress,
        primaryPhone: body.primaryPhone,
        secondaryPhone: body.secondaryPhone,
        primaryEmail: body.primaryEmail,
        secondaryEmail: body.secondaryEmail,
        bankingDetails: {
          bankAccountNumber: body.bankAccountNumber,
          bankAccountName: body.bankAccountName,
          bankName: body.bankName,
          bankCountry: body.bankCountry,
          bankBranch: body.bankBranch
        },
        ApproverL1Status: "PROCESSING",
        createdByUserId: user.id
      }
    })
    return NextResponse.json({status: 'ok', message: 'Supplier creation successful'})
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}