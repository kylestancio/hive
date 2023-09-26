import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(){

  try{
    const query = await prisma.supplier.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return NextResponse.json(query)
  }catch(err){
    console.log(err)
    return NextResponse.error()
  }
}