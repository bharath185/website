import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const cleanEmail = email.toLowerCase().trim()

    // Find user
    const user = await db.user.findUnique({
      where: { email: cleanEmail }
    })

    if (!user) {
      return NextResponse.json({ error: 'User with this email does not exist' }, { status: 404 })
    }

    // Generate random temporary default password
    const tempPassword = `BMT@Temp${Math.floor(1000 + Math.random() * 9000)}`
    const passwordHash = await hashPassword(tempPassword)

    // Update user
    await db.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetRequired: true
      }
    })

    // Fetch mail config
    let mailConfig = null
    try {
      mailConfig = await db.mailConfig.findFirst()
    } catch (e) {
      console.warn('Prisma config query skipped:', e)
    }

    if (!mailConfig || !mailConfig.host) {
      // Fallback: If SMTP is not set up, return password directly in response for development convenience
      return NextResponse.json({
        success: true,
        message: 'Mail settings not configured. Temporary password generated.',
        tempPassword
      })
    }

    // Configure transport
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
      }
    })

    // Send email
    await transporter.sendMail({
      from: `"${mailConfig.fromEmail || 'BMT Support'}" <${mailConfig.fromEmail || mailConfig.user}>`,
      to: user.email,
      subject: 'Temporary Password Reset - Bharat Machine Tools',
      text: `Hello ${user.name},\n\nYour BMT password has been reset to a temporary default password.\n\nTemporary Password: ${tempPassword}\n\nFor security reasons, you will be prompted to change this password immediately upon logging in.\n\nBest Regards,\nBharat Machine Tools Team`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 500px; margin: auto;">
          <h2 style="color: #122f87; margin-bottom: 20px;">Bharat Machine Tools</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>Your BMT account password has been reset to a temporary default password.</p>
          <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
            <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; display: block; margin-bottom: 5px;">Temporary Password</span>
            <span style="font-family: monospace; font-size: 18px; font-weight: bold; color: #0f172a; tracking: 1px;">${tempPassword}</span>
          </div>
          <p style="color: #b91c1c; font-weight: bold;">Important: You will be required to change this password immediately after logging in.</p>
          <p style="font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">Bharat Machine Tools | Peenya Industrial Area, Bangalore</p>
        </div>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'Temporary password sent to email.'
    })
  } catch (error: any) {
    console.error('Error in forgot-password:', error)
    return NextResponse.json({ error: 'Server error during password reset' }, { status: 500 })
  }
}
