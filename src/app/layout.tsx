import type { Metadata } from 'next';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/share-tech-mono/latin-400.css';
import './globals.css';
import { SolarProvider } from '@/components/SolarCycle';

export const metadata: Metadata = {
  metadataBase: new URL('https://optimistotaku.tech'),
  title: 'Aditya Singh — AI / ML Engineer',
  description: 'Full-stack engineer and AI builder crafting intelligent, scalable systems. Specializing in AI/ML, LLM integration, and high-performance full-stack architectures.',
  keywords: [
    'Aditya Singh', 
    'Aditya Singh Portfolio', 
    'Aditya Singh AI Engineer', 
    'OPTIMISTOTAKU', 
    'OptimistOtaku Portfolio',
    'Continual Learning',
    'Full-Stack Developer', 
    'Machine Learning Engineer', 
    'Next.js Portfolio', 
    'AI Research',
  ],
  authors: [{ name: 'Aditya Singh' }],
  creator: 'Aditya Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://optimistotaku.tech',
    title: 'Aditya Singh — AI / ML Engineer',
    description: 'Specializing in AI/ML and building intelligent, scalable systems.',
    siteName: 'Aditya Singh Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Singh — AI Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Singh — AI / ML Engineer',
    description: 'Building intelligent systems and high-performance full-stack architectures.',
    creator: '@optimistotaku',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">SKIP TO CONTENT</a>


        <SolarProvider>{children}</SolarProvider>
      </body>
    </html>
  )
}
