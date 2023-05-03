import { Providers } from './providers'

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cazamonedas',
  description: 'Colecciona todas las monedas de dos euros conmemorativas de la Unión Europea'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
