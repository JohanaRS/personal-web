import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Johana Ríos | Coaching, Liderazgo y Mejora Continua',
  description: 'Acompaño procesos de cambio personal, profesional y organizacional. Liderazgo consciente, coaching basado en neurociencia, comunicación efectiva y cultura de calidad.',
  keywords: ['coaching', 'liderazgo', 'mejora continua', 'desarrollo personal', 'coaching organizacional', 'neurociencia', 'comunicación efectiva'],
  authors: [{ name: 'Johana Ríos' }],
  openGraph: {
    title: 'Johana Ríos | Coaching, Liderazgo y Mejora Continua',
    description: 'Acompaño procesos de cambio personal, profesional y organizacional desde un enfoque humano e integral.',
    type: 'website',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#6b7b4c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
