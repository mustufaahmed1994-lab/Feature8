import { Jost, Inter, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-jost',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata = {
  title: 'Feature8 — Work Worth Waking Up For',
  description: 'Feature8 is a Karachi-based tech, info, and media company building work worth waking up for.',
  openGraph: {
    title: 'Feature8 — Work Worth Waking Up For',
    description: 'Feature8 is a Karachi-based tech, info, and media company building work worth waking up for.',
    url: 'https://feature8.com',
    siteName: 'Feature8',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${inter.variable} ${barlowCondensed.variable}`}>
      <body className="bg-dark-900 text-white antialiased">{children}</body>
    </html>
  );
}
