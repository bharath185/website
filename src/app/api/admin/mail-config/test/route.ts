import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import nodemailer from 'nodemailer'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { host, port, secure, user: smtpUser, pass, fromEmail, testRecipient } = body

    if (!host || !port || !smtpUser || !pass || !testRecipient) {
      return NextResponse.json({ error: 'All fields (Host, Port, User, Pass, Recipient) are required to test' }, { status: 400 })
    }

    // Resolve masked password from database if needed
    let finalPass = pass
    if (pass === '******') {
      const existing = await db.mailConfig.findUnique({
        where: { id: 'smtp-settings' }
      })
      finalPass = existing?.pass || ''
    }

    // Automatically strip all whitespaces from Gmail app passwords
    const cleanPass = finalPass.replace(/\s+/g, '')

    console.log('SMTP Test Connection Params:', {
      host,
      port,
      secure,
      user: smtpUser,
      fromEmail,
      recipient: testRecipient,
      passLength: cleanPass.length,
      passFirstLast: cleanPass.length > 0 ? `${cleanPass[0]}...${cleanPass[cleanPass.length - 1]}` : 'empty'
    })

    const smtpPort = parseInt(port)
    const isSecure = smtpPort === 465 ? true : (smtpPort === 587 ? false : !!secure)

    const transporter = nodemailer.createTransport({
      host,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: smtpUser,
        pass: cleanPass
      },
      connectionTimeout: 10000 // 10 seconds timeout
    })

    // Verify SMTP connection handshake
    await transporter.verify()

    // Send actual test email
    await transporter.sendMail({
      from: `"${fromEmail || 'BMT SMTP Tester'}" <${fromEmail || smtpUser}>`,
      to: testRecipient,
      subject: 'BMT SMTP Connection Test - Successful',
      text: `Congratulations! Your SMTP settings on Bharat Machine Tools are configured correctly.\n\nConnection Details:\n- Host: ${host}\n- Port: ${port}\n- SSL/TLS: ${secure ? 'Yes' : 'No'}\n- Sender: ${fromEmail || smtpUser}\n\nThis is an automated system check.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 500px; margin: auto;">
          <h2 style="color: #122f87; margin-bottom: 20px;">SMTP Connection Test</h2>
          <p style="color: #15803d; font-weight: bold; font-size: 16px; margin-bottom: 15px;">✓ Connection Successful</p>
          <p>Congratulations! Your SMTP server settings on Bharat Machine Tools are configured correctly.</p>
          <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 13px;">
            <strong>Connection Details:</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
              <li><strong>Host:</strong> ${host}</li>
              <li><strong>Port:</strong> ${port}</li>
              <li><strong>SSL/TLS:</strong> ${secure ? 'Yes' : 'No'}</li>
              <li><strong>SMTP User:</strong> ${smtpUser}</li>
            </ul>
          </div>
          <p style="font-size: 12px; color: #64748b;">This is an automated test notification. You do not need to reply.</p>
        </div>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'SMTP connection verified & test email sent successfully!'
    })
  } catch (error: any) {
    console.error('SMTP test error:', error)
    return NextResponse.json({
      error: error.message || 'SMTP connection failed. Check host, port, credentials, or firewall restrictions.'
    }, { status: 500 })
  }
}
