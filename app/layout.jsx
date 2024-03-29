import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@components/navbar'
import Footer from '@components/Footer'
import Provider from '@components/Provider'
import { Toaster } from '@components/ui/toaster'

const isProduction = process.env.NODE_ENV === 'production'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(serverUrl),
  title: 'Ashmeet Store',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={GeistSans.className}>
        <Provider>
          <div className='max-w-[1900px] mx-auto'>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </div>
        </Provider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
