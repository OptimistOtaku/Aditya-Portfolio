import type { Metadata } from 'next'
import { Cinzel, Cormorant_Garamond, Share_Tech_Mono } from 'next/font/google'
import './globals.css'
import GrainOverlay from '@/components/GrainOverlay'
import DuneCursor from '@/components/DuneCursor'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-cinzel'
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
})

const shareTechMono = Share_Tech_Mono({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-share-tech'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://optimistotaku.tech'),
  title: 'Aditya Singh — AI Engineer & Full-Stack Developer',
  description: 'Full-stack engineer and AI builder crafting intelligent, scalable systems. Specializing in AI/ML, LLM integration, and high-performance full-stack architectures.',
  keywords: [
    'Aditya Singh', 
    'Aditya Singh Portfolio', 
    'Aditya Singh AI Engineer', 
    'OPTIMISTOTAKU', 
    'OptimistOtaku Portfolio',
    'AI Engineer Arrakis',
    'Full-Stack Developer', 
    'Machine Learning Engineer', 
    'Next.js Portfolio', 
    'Dune Theme Website',
  ],
  authors: [{ name: 'Aditya Singh' }],
  creator: 'Aditya Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://optimistotaku.tech',
    title: 'Aditya Singh — AI Engineer & Full-Stack Developer',
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
    title: 'Aditya Singh — AI Engineer & Full-Stack Developer',
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
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${shareTechMono.variable}`}>
      <body>
        <GrainOverlay />
        <DuneCursor />
        {children}
      </body>
    </html>
  )
}