import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'

export async function GET() {
  try {
    let settings = null
    try {
      const client = await getPgClient()
      try {
        const res = await client.query('SELECT * FROM "SocialSettings" WHERE id = $1 LIMIT 1;', ['social-settings'])
        if (res.rows.length > 0) {
          settings = res.rows[0]
        }
      } finally {
        await client.end().catch(() => {})
      }
    } catch (dbErr) {
      console.warn("Direct PG error fetching social settings:", dbErr)
    }

    if (!settings) {
      settings = {
        id: 'social-settings',
        facebook: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        twitter: '',
        whatsapp: '',
        updatedAt: new Date()
      }
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error fetching social settings:', error)
    return NextResponse.json({ error: 'Server error fetching social settings' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { facebook, instagram, linkedin, youtube, twitter, whatsapp } = body

    let updated = null
    try {
      const client = await getPgClient()
      try {
        const query = `
          INSERT INTO "SocialSettings" (id, facebook, instagram, linkedin, youtube, twitter, whatsapp, "updatedAt")
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
          ON CONFLICT (id) DO UPDATE SET
            facebook = EXCLUDED.facebook,
            instagram = EXCLUDED.instagram,
            linkedin = EXCLUDED.linkedin,
            youtube = EXCLUDED.youtube,
            twitter = EXCLUDED.twitter,
            whatsapp = EXCLUDED.whatsapp,
            "updatedAt" = NOW()
          RETURNING *;
        `
        const res = await client.query(query, [
          'social-settings',
          facebook || '',
          instagram || '',
          linkedin || '',
          youtube || '',
          twitter || '',
          whatsapp || ''
        ])
        updated = res.rows[0]
      } finally {
        await client.end().catch(() => {})
      }
    } catch (err) {
      console.error('Direct PG update social settings error:', err)
      updated = {
        id: 'social-settings',
        facebook: facebook || '',
        instagram: instagram || '',
        linkedin: linkedin || '',
        youtube: youtube || '',
        twitter: twitter || '',
        whatsapp: whatsapp || '',
        updatedAt: new Date()
      }
    }

    return NextResponse.json({ success: true, settings: updated })
  } catch (error) {
    console.error('Error saving social settings:', error)
    return NextResponse.json({ error: 'Server error saving social settings' }, { status: 500 })
  }
}
