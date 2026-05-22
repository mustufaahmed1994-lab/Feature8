import { Inter, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['700', '800'] })

export const metadata = {
  title: 'Feature⁸ — Work Worth Waking Up For',
  description: "Feature8 is building the place talented people in Pakistan don't want to leave. Real ownership. Fair pay. Actual growth.",
  keywords: 'Feature8, tech jobs Karachi, Pakistan tech company, software jobs Karachi, hiring Pakistan',
  openGraph: {
    title: 'Feature⁸ — Work Worth Waking Up For',
    description: 'Real ownership. Fair compensation. Actual growth. Karachi, Pakistan.',
    url: 'https://feature8.com',
    siteName: 'Feature8',
    images: [{ url: '/web-app-manifest-512x512.png' }],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${syne.variable} bg-dark-900 text-cream font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
