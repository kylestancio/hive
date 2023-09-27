import prisma from "@/lib/prisma";
import { Supplier } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import {type NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ISupplierExtended extends Supplier{
  bankAccountNumber: string
  bankAccountName: string
  bankName: string
  bankCountry: string
  bankBranch: string
  
}

export async function POST(req: NextRequest){

  const session = await getServerSession(authOptions)
  const { user }:Session = session;

  const body:ISupplierExtended = await req.json()

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