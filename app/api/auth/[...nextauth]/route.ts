import prisma from "@/lib/prisma"
import NextAuth, {type Session} from "next-auth"
import { type JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const data = await prisma.user.findFirst({
          where: {
            username: credentials.username
          },
          select: {
            id: true,
            password: true,
            fullName: true,
            primaryEmail: true,
            roles: true
          }
        })
        if (!data) return null
        if (bcrypt.compareSync(credentials.password, data.password)){
          const { password, ...result } = data;
          return result
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({token, user}:any){
      if(user){
        token.user = user
      }
      return token
    },
    async session({session, token, user}:any){
      session.user = token.user
      return session
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}