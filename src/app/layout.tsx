import Navbar from './component/navbar'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'CEHRSR',
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
          <Navbar />
          {children}
          </Providers>
      </body>
    </html>
  )
}