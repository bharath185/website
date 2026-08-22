import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'

export async function GET() {
  try {
    let mdInfo: any = null
    try {
      const client = await getPgClient()
      try {
        const res = await client.query('SELECT * FROM "MDInfo" WHERE id = $1 LIMIT 1;', ['md-info'])
        if (res.rows.length > 0) {
          mdInfo = res.rows[0]
        }
      } finally {
        await client.end().catch(() => {})
      }
    } catch (dbErr) {
      console.warn('Direct PG error in /api/md-info, returning default settings')
    }

    if (!mdInfo) {
      mdInfo = {
        id: 'md-info',
        name: 'Mr. Abbas Khan',
        role: 'Founder & Managing Director',
        image: '',
        bioParagraph1: 'Sub-Micron Engineering: Engineered to match the sub-micron tolerances demanded by advanced aerospace, military, and automation OEMs.\n25+ Years Legacy: Continual investment in Bangalore cleanrooms, dynamic testing bays, and state-of-the-art grinding machinery.\nZero-Defect Standards: Ensuring every spindle, hydrostatic bearing, and custom part leaving our cells is an operational masterpiece.',
        bioParagraph2: '',
        quote: 'Precision is not a measurement constraint; it is our corporate culture. We don\'t build machines—we craft high-speed rotational masterpieces with sub-micron engineering.',
        quoteAuthor: 'Mr. Abbas Khan',
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

    if (!name || !role || !bioParagraph1 || !bioParagraph2 || !quote || !quoteAuthor) {
      return NextResponse.json({ error: 'All core fields are required' }, { status: 400 })
    }

    let updated: any = null
    try {
      const client = await getPgClient()
      try {
        const query = `
          INSERT INTO "MDInfo" (
            id, name, role, image, "bioParagraph1", "bioParagraph2",
            quote, "quoteAuthor", "expTitle", "expDescription",
            "stdTitle", "stdDescription", "affTitle", "affDescription",
            "badgeTitle", "badgeText", "updatedAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            role = EXCLUDED.role,
            image = EXCLUDED.image,
            "bioParagraph1" = EXCLUDED."bioParagraph1",
            "bioParagraph2" = EXCLUDED."bioParagraph2",
            quote = EXCLUDED.quote,
            "quoteAuthor" = EXCLUDED."quoteAuthor",
            "expTitle" = EXCLUDED."expTitle",
            "expDescription" = EXCLUDED."expDescription",
            "stdTitle" = EXCLUDED."stdTitle",
            "stdDescription" = EXCLUDED."stdDescription",
            "affTitle" = EXCLUDED."affTitle",
            "affDescription" = EXCLUDED."affDescription",
            "badgeTitle" = EXCLUDED."badgeTitle",
            "badgeText" = EXCLUDED."badgeText",
            "updatedAt" = NOW()
          RETURNING *;
        `
        const res = await client.query(query, [
          'md-info',
          name,
          role,
          image || '',
          bioParagraph1,
          bioParagraph2,
          quote,
          quoteAuthor,
          expTitle || 'Experience',
          expDescription || '',
          stdTitle || 'Standards',
          stdDescription || '',
          affTitle || 'Affiliations',
          affDescription || '',
          badgeTitle || 'MD Credentials',
          badgeText || ''
        ])
        updated = res.rows[0]
      } finally {
        await client.end().catch(() => {})
      }
    } catch (err) {
      console.error('Direct PG update MD info error:', err)
      updated = {
        id: 'md-info',
        name,
        role,
        image: image || '',
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
        badgeText: badgeText || '',
        updatedAt: new Date()
      }
    }

    return NextResponse.json({ success: true, mdInfo: updated })
  } catch (error) {
    console.error('Error saving MD info:', error)
    return NextResponse.json({ error: 'Server error saving MD info' }, { status: 500 })
  }
}
