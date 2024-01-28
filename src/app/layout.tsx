import { Suspense } from 'react'
import Navbar from './component/navbar'
import './globals.css'
import { Providers } from './providers'
import Loading from './loading'
import Footer from './component/footer'


export const metadata = {
    title: 'CEHRSR',
  description: 'CEHRSR'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Suspense fallback={<Loading/>}>

          <Navbar />
          {children}
          </Suspense>
          </Providers>
      </body>
    </html>
  )
}