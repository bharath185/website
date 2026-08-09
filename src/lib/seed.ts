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

    // Seed/upsert default MailConfig settings with verified Gmail App Password
    await db.mailConfig.upsert({
      where: { id: 'smtp-settings' },
      update: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        user: 'prigenixsoftware@gmail.com',
        pass: 'taiqosebebmwxsmp',
        fromEmail: 'BMT Support <prigenixsoftware@gmail.com>'
      },
      create: {
        id: 'smtp-settings',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        user: 'prigenixsoftware@gmail.com',
        pass: 'taiqosebebmwxsmp',
        fromEmail: 'BMT Support <prigenixsoftware@gmail.com>'
      }
    })
    console.log('Seeded default MailConfig settings')
  } catch (error) {
    console.error('Error seeding admin user or mail config:', error)
  }
}
