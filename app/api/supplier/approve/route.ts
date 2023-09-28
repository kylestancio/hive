import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface IRequestBody{
  supplierId: string,
  approvalComment: string
}

export async function POST(req: NextRequest){
  
  const session = await getServerSession(authOptions);
  const { user }:Session = session;

  const body:IRequestBody = await req.json()
  
  try{
    // INITIAL CHECK OF THE SUPPLIER DATA
    const supplier = await prisma.supplier.findFirst({
      where: {
        id: body.supplierId
      }
    })

    if (!supplier) throw new Error("Supplier not found!")
    if (supplier.Status==='ACTIVE' || supplier.Status==='INACTIVE') throw new Error("Supplier is already approved.")
    if (supplier.Status==='L1APPROVALDENIED' || supplier.Status==='L2APPROVALDENIED') throw new Error("Supplier is already denied")

    const updateData:Prisma.SupplierUncheckedUpdateInput= {}

    if (supplier.Status==='L1APPROVALREQUIRED'){
      updateData.approverL1UserId = user.id
      updateData.approverL1Comments = body.approvalComment
      updateData.ApproverL1Status = "APPROVED"
      updateData.Status='ACTIVE'
    }
    
    // if (supplier.Status==='L2APPROVALREQUIRED'){
    //   updateData.approverL2UserId = user.id
    //   updateData.approverL2Comments = body.approvalComment 
    //   updateData.ApproverL2Status = "APPROVED"
    //   updateData.Status = 'ACTIVE'
    // }
    
    await prisma.supplier.update({
      where:{
        id: body.supplierId
      },
      data: updateData
    })
    return NextResponse.json({status: 'ok', message: 'Supplier approval successful'})

  }catch(err){  
    console.log(err)
    return NextResponse.error()
  }
}