import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { newPassword } = body

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 })
    }

    const passwordHash = await hashPassword(newPassword)

    await db.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetRequired: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    })
  } catch (error) {
    console.error('Error in change-password route:', error)
    return NextResponse.json({ error: 'Server error updating password' }, { status: 500 })
  }
}
