import React from 'react'
import type { Metadata } from 'next'
import BookletClient from './BookletClient'

export const metadata: Metadata = {
  title: 'Digital Technical Booklet & Machine Tool Catalogue | Bharat Machine Tools',
  description: 'Interactive Digital Flipbook & Corporate Brochure of Bharat Machine Tools. Explore high-precision machine tool motorized spindles, hydrostatic bearings, CNC rotary tables, ball screws, defense actuators, and turnkey CNC reconditioning in Bangalore, India.',
  keywords: [
    'Bharat Machine Tools booklet',
    'BMT digital catalog',
    'BMT technical brochure',
    'flipbook catalog machine tools',
    'spindles catalog PDF',
    'CNC rotary table brochure',
    'Make in India machine tools'
  ],
  openGraph: {
    title: 'Bharat Machine Tools - Official Digital Booklet & Catalogue',
    description: 'Explore high-precision spindles, hydrostatic bearings, CNC rotary tables, ball screws, and defense actuators in an interactive flipbook booklet.',
    url: 'https://bmt.prigenix.com/booklet',
    siteName: 'Bharat Machine Tools',
    images: [
      {
        url: 'https://bmt.prigenix.com/images/company-profile/bmt_web_1.jpg',
        width: 1200,
        height: 850,
        alt: 'Bharat Machine Tools Corporate Booklet Cover'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bharat Machine Tools - Official Digital Booklet & Catalogue',
    description: 'Explore high-precision spindles, hydrostatic bearings, CNC rotary tables, ball screws, and defense actuators in an interactive flipbook booklet.',
    images: ['https://bmt.prigenix.com/images/company-profile/bmt_web_1.jpg'],
  }
}

export default function BookletPage() {
  return <BookletClient />
}
