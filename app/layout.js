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
          images: [
            {
                      url: 'https://feature8.com/og-image.png',
                      width: 1200,
                      height: 630,
                      alt: 'Feature8 — Work Worth Waking Up For',
            },
                ],
    },
    twitter: {
          card: 'summary_large_image',
          title: 'Feature8 — Work Worth Waking Up For',
          description: 'Feature8 is a Karachi-based tech, info, and media company building work worth waking up for.',
          images: ['https://feature8.com/og-image.png'],
    },
};

export default function RootLayout({ children }) {
    return (
          <html lang="en" className={`${jost.variable} ${inter.variable} ${barlowCondensed.variable}`}>
      <body className="bg-dark-900 text-white antialiased">
{/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          style={{
                        position: 'absolute',
                        top: '-100px',
                        left: '1rem',
                        background: '#b8f224',
                        color: '#080808',
                        padding: '0.5rem 1rem',
                        borderRadius: '0 0 8px 8px',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        zIndex: 99999,
                        transition: 'top 0.2s',
          }}
          onFocus={(e) => { e.currentTarget.style.top = '0'; }}
          onBlur={(e) => { e.currentTarget.style.top = '-100px'; }}
        >
          Skip to main content
            </a>
{children}
</body>
  </html>
  );
}
