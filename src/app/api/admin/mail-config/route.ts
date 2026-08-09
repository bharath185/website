import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let config = await db.mailConfig.findUnique({
      where: { id: 'smtp-settings' }
    })

    if (!config) {
      config = {
        id: 'smtp-settings',
        host: '',
        port: 587,
        secure: false,
        user: '',
        pass: '',
        fromEmail: '',
        updatedAt: new Date()
      }
    }

    // Mask password
    const maskedConfig = {
      ...config,
      pass: config.pass ? '******' : ''
    }

    return NextResponse.json({ config: maskedConfig })
  } catch (error) {
    console.error('Error fetching mail config:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { host, port, secure, user: smtpUser, pass, fromEmail } = body

    if (!host || !port || !smtpUser || !fromEmail) {
      return NextResponse.json({ error: 'Host, Port, SMTP User and From Email are required' }, { status: 400 })
    }

    // Check existing pass and strip spaces if updated
    let finalPass = pass
    if (pass === '******') {
      const existing = await db.mailConfig.findUnique({
        where: { id: 'smtp-settings' }
      })
      finalPass = existing?.pass || ''
    } else if (pass) {
      finalPass = pass.replace(/\s+/g, '')
    }

    const updatedConfig = await db.mailConfig.upsert({
      where: { id: 'smtp-settings' },
      update: {
        host,
        port: parseInt(port),
        secure: !!secure,
        user: smtpUser,
        pass: finalPass,
        fromEmail
      },
      create: {
        id: 'smtp-settings',
        host,
        port: parseInt(port),
        secure: !!secure,
        user: smtpUser,
        pass: finalPass,
        fromEmail
      }
    })

    return NextResponse.json({
      success: true,
      config: {
        ...updatedConfig,
        pass: '******'
      }
    })
  } catch (error) {
    console.error('Error saving mail config:', error)
    return NextResponse.json({ error: 'Server error saving config' }, { status: 500 })
  }
}
