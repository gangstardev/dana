import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'سیستم مدیریت مدرسه دانا',
  description: 'سیستم مدیریت دانش‌آموزان مدرسه ابتدایی دانا',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className="font-dirooz text-white">
        <ThemeProvider>
          <Footer />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
