import { getServerSession } from 'next-auth'
import Providers from './Providers'
import SideNavigation from './SideNavigation'
import './globals.css'
import type { Metadata } from 'next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'HIVE',
  description: 'A B2B application made by @kylestancio',
}

interface IUser{
  id: string;
  primaryEmail: string;
  roles: string;
  fullName: string;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  const user:IUser = session!.user

  return (
    <html className='w-full h-full' lang="en">
      <body className='w-full h-full flex'>
        <Providers>
          <SideNavigation user={user} />
          <div className='w-full h-full bg-zinc-200 dark:bg-zinc-950'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
