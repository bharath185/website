import { db } from './db'
import { hashPassword } from './auth'

export async function ensureAdminUser() {
  try {
    const adminEmail = 'admin@bmtbharat.com'
    const passwordHash = await hashPassword('Admin@123')

    const existing = await db.user.findUnique({
      where: { email: adminEmail }
    })

    if (!existing) {
      await db.user.create({
        data: {
          name: 'BMT Admin',
          email: adminEmail,
          passwordHash,
          role: 'ADMIN',
          phone: '+91 9845000000'
        }
      })
      console.log('Seeded admin user: admin@bmtbharat.com')
    } else if (existing.role !== 'ADMIN') {
      await db.user.update({
        where: { id: existing.id },
        data: { role: 'ADMIN', passwordHash }
      })
    }
  } catch (error) {
    console.error('Error seeding admin user:', error)
  }
}
