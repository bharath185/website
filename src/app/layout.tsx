import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prigenix | Custom Software & Mobile Application Development Studio',
  description: 'Prigenix is a high-performance software engineering studio specializing in custom web applications, mobile app development, workflow automation code, and AI agent integration. Development-only services without hosting or cloud infrastructure.',
  keywords: [
    'Custom Software Development',
    'Mobile Application Development',
    'Full-Stack App Engineering',
    'React Native Mobile Development',
    'AI Agent Application Integration',
    'Next.js Custom Web Apps',
    'Workflow Automation Coding',
    'Software Maintenance Contracts',
    'Enterprise Codebase Engineering',
    'App Development Studio',
    'Prigenix Software'
  ],
  authors: [{ name: 'Prigenix Studio' }],
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prigenix.com',
    title: 'Prigenix | Custom Software & Mobile Application Development Studio',
    description: 'Prigenix is a high-performance software engineering studio specializing in custom web applications, mobile app development, workflow automation code, and AI agent integration. Development-only services without hosting or cloud infrastructure.',
    siteName: 'Prigenix Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prigenix | Custom Software & Mobile Application Development Studio',
    description: 'Prigenix is a high-performance software engineering studio specializing in custom web applications, mobile app development, workflow automation code, and AI agent integration. Development-only services without hosting or cloud infrastructure.',
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-[#0A0A0A] text-white antialiased font-sans overflow-x-hidden select-none">
        {children}
      </body>
    </html>
  )
}
