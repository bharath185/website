import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    let mdInfo: any = null
    try {
      mdInfo = await db.mDInfo.findUnique({
        where: { id: 'md-info' }
      })
    } catch (dbErr) {
      console.warn('DB connection error in /api/md-info, returning default settings')
    }

    if (!mdInfo) {
      mdInfo = {
        id: 'md-info',
        name: 'Mr. B.R. Gowda',
        role: 'Founder & Managing Director',
        image: '',
        bioParagraph1: 'Welcome to Bharat Machine Tools (BMT). When we established BMT in Bangalore, our objective was single-focused: to engineer and build dynamic mechanical systems that match the sub-micron tolerances demanded by advanced aerospace, military, and automation OEMs.',
        bioParagraph2: 'Over the past 25 years, precision manufacturing has evolved, but our foundational promise remains absolute. We invest continuously in our cleanrooms, dynamic testing bays, and state-of-the-art grinding machinery to ensure that every spindle, hydrostatic bearing, and custom part leaving our cells is an operational masterpiece.',
        quote: 'Precision is not a measurement constraint; it is our corporate culture. We don\'t build machines—we craft high-speed rotational masterpieces with sub-micron engineering.',
        quoteAuthor: 'B. R. Gowda',
        expTitle: 'Experience',
        expDescription: '30+ Years in rotodynamic systems design.',
        stdTitle: 'Standards',
        stdDescription: 'Direct supervisor of BMT Zero-Defect QA cell.',
        affTitle: 'Affiliations',
        affDescription: 'Technical panelist at CMTI & AMTI Bangalore.',
        badgeTitle: 'MD Credentials',
        badgeText: 'CMTI Panelist',
        updatedAt: new Date()
      }
    }

    return NextResponse.json({ mdInfo })
  } catch (error) {
    console.error('Error fetching MD info:', error)
    return NextResponse.json({ error: 'Server error fetching MD info' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      name,
      role,
      image,
      bioParagraph1,
      bioParagraph2,
      quote,
      quoteAuthor,
      expTitle,
      expDescription,
      stdTitle,
      stdDescription,
      affTitle,
      affDescription,
      badgeTitle,
      badgeText
    } = body

    // Validation
    if (!name || !role || !bioParagraph1 || !bioParagraph2 || !quote || !quoteAuthor) {
      return NextResponse.json({ error: 'All core fields are required' }, { status: 400 })
    }

    const updated = await db.mDInfo.upsert({
      where: { id: 'md-info' },
      update: {
        name,
        role,
        image,
        bioParagraph1,
        bioParagraph2,
        quote,
        quoteAuthor,
        expTitle: expTitle || 'Experience',
        expDescription: expDescription || '',
        stdTitle: stdTitle || 'Standards',
        stdDescription: stdDescription || '',
        affTitle: affTitle || 'Affiliations',
        affDescription: affDescription || '',
        badgeTitle: badgeTitle || 'MD Credentials',
        badgeText: badgeText || ''
      },
      create: {
        id: 'md-info',
        name,
        role,
        image,
        bioParagraph1,
        bioParagraph2,
        quote,
        quoteAuthor,
        expTitle: expTitle || 'Experience',
        expDescription: expDescription || '',
        stdTitle: stdTitle || 'Standards',
        stdDescription: stdDescription || '',
        affTitle: affTitle || 'Affiliations',
        affDescription: affDescription || '',
        badgeTitle: badgeTitle || 'MD Credentials',
        badgeText: badgeText || ''
      }
    })

    return NextResponse.json({ success: true, mdInfo: updated })
  } catch (error) {
    console.error('Error saving MD info:', error)
    return NextResponse.json({ error: 'Server error saving MD info' }, { status: 500 })
  }
}
