import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'مطعم ماما نورا - تجربة طعام أصيلة',
  description: 'استمتع بتجربة طعام أصيلة مع قائمتنا المتنوعة من الأطباق الشهية والمكونات الطازجة. احجز طاولتك اليوم!',
  keywords: 'مطعم, طعام عربي, وجبات, عروض, حجز, ماما نورا',
  authors: [{ name: 'مطعم ماما نورا' }],
  openGraph: {
    title: 'مطعم ماما نورا - تجربة طعام أصيلة',
    description: 'استمتع بتجربة طعام أصيلة مع قائمتنا المتنوعة من الأطباق الشهية والمكونات الطازجة.',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

