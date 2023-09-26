import prisma from "@/lib/prisma";
import PrismaClient from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

  const body:PrismaClient.User = await req.json();

  try{
    await prisma.user.create({
      data: {
        fullName: body.fullName,
        primaryEmail: body.primaryEmail,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
      }
    })
    return NextResponse.json({status: 'ok', message: 'User created successfully'})
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}