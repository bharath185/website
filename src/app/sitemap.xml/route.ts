import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'sitemap.xml')
    if (fs.existsSync(filePath)) {
      const xml = fs.readFileSync(filePath, 'utf8')
      return new NextResponse(xml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
        },
      })
    }
  } catch (err) {
    console.error('Error reading sitemap.xml:', err)
  }

  return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.bmtbharat.com</loc></url></urlset>', {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
