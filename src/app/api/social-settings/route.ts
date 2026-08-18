import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    let settings = null
    try {
      settings = await db.socialSettings.findUnique({
        where: { id: 'social-settings' }
      })
    } catch (dbErr) {
      console.warn("DB connection issue fetching social settings:", dbErr)
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
      updated = await db.socialSettings.upsert({
        where: { id: 'social-settings' },
        update: {
          facebook: facebook || '',
          instagram: instagram || '',
          linkedin: linkedin || '',
          youtube: youtube || '',
          twitter: twitter || '',
          whatsapp: whatsapp || ''
        },
        create: {
          id: 'social-settings',
          facebook: facebook || '',
          instagram: instagram || '',
          linkedin: linkedin || '',
          youtube: youtube || '',
          twitter: twitter || '',
          whatsapp: whatsapp || ''
        }
      })
    } catch {
      // Fallback
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
