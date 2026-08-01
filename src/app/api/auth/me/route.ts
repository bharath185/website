import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { ensureAdminUser } from '@/lib/seed'

export async function GET() {
  try {
    await ensureAdminUser()
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ user: null })
    }
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error in /api/auth/me:', error)
    return NextResponse.json({ user: null })
  }
}
