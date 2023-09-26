import Providers from './Providers'
import SideNavigation from './SideNavigation'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HIVE',
  description: 'A B2B application made by @kylestancio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='w-full h-full' lang="en">
      <body className='w-full h-full flex'>
        <Providers>
          <SideNavigation />
          <div className='w-full h-full bg-zinc-200 dark:bg-zinc-950'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
