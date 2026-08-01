import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, signToken, TOKEN_NAME } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    const passwordHash = await hashPassword(password)

    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        phone: phone || null,
        role: 'USER'
      }
    })

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    })

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Server error during registration' }, { status: 500 })
  }
}
