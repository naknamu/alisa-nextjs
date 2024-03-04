import './globals.css'
import './globalicon.css'
import { Inter } from 'next/font/google'
import Provider from "@/app/context/client-provider.jsx"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// components
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Alisa',
  description: 'AI Images Sharing Platform',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <Navbar />
          {children}
        </Provider>

      </body>
    </html>
  )
}
