import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { db } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'bmt-bharat-jwt-secret-key-2026'
const TOKEN_NAME = 'bmt_token'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export async function getSessionUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(TOKEN_NAME)?.value
    if (!token) return null

    const decoded = verifyToken(token)
    if (!decoded) return null

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true, phone: true }
    })

    return user
  } catch (error) {
    console.error('Error fetching session user:', error)
    return null
  }
}

export { TOKEN_NAME }
