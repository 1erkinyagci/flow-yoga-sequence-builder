import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yoga-sequencing.com'),
  icons: {
    icon: '/images/yoga_sequencing_logo_transparent.jpg',
    shortcut: '/images/yoga_sequencing_logo_transparent.jpg',
    apple: '/images/yoga_sequencing_logo_transparent.jpg',
  },
  title: {
    default: 'FLOW - Professional Yoga Sequence Builder',
    template: '%s | FLOW Yoga Sequence Builder',
  },
  description:
    'Create, organize, and share professional yoga class sequences with our intuitive drag-and-drop builder. Perfect for yoga teachers and studios.',
  keywords: [
    'yoga sequence builder',
    'yoga class planner',
    'yoga teacher tools',
    'yoga flow builder',
    'yoga pose library',
    'class sequencing',
    'vinyasa flow',
    'yoga teaching',
  ],
  authors: [{ name: 'FLOW Yoga' }],
  creator: 'FLOW Yoga Sequence Builder',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.yoga-sequencing.com',
    siteName: 'FLOW Yoga Sequence Builder',
    title: 'FLOW - Professional Yoga Sequence Builder',
    description:
      'Create, organize, and share professional yoga class sequences with our intuitive drag-and-drop builder.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FLOW Yoga Sequence Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FLOW - Professional Yoga Sequence Builder',
    description:
      'Create, organize, and share professional yoga class sequences with our intuitive drag-and-drop builder.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
