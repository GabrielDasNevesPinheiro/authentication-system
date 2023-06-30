import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Inter } from 'next/font/google'
import { ContextProvider } from './context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Auth App',
  description: 'Developed by Gabriel das Neves',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
