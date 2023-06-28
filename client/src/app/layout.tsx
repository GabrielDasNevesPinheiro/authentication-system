import '../style/globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Basic System',
  description: 'a test app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
