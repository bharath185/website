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
          name: 'BMTADMIN',
          email: adminEmail,
          passwordHash,
          role: 'ADMIN',
          phone: '+91 9845000000'
        }
      })
      console.log('Seeded admin user: admin@bmtbharat.com')
    } else {
      await db.user.update({
        where: { id: existing.id },
        data: {
          name: 'BMTADMIN',
          role: 'ADMIN',
          passwordHash
        }
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

    // Seed/upsert default MDInfo settings
    await db.mDInfo.upsert({
      where: { id: 'md-info' },
      update: {},
      create: {
        id: 'md-info',
        name: 'Mr. B.R. Gowda',
        role: 'Founder & Managing Director',
        image: '',
        bioParagraph1: 'Welcome to Bharat Machine Tools (BMT). When we established BMT in Bangalore, our objective was single-focused: to engineer and build dynamic mechanical systems that match the sub-micron tolerances demanded by advanced aerospace, military, and automation OEMs.',
        bioParagraph2: 'Over the past 25 years, precision manufacturing has evolved, but our foundational promise remains absolute. We invest continuously in our cleanrooms, dynamic testing bays, and state-of-the-art grinding machinery to ensure that every spindle, hydrostatic bearing, and custom part leaving our cells is an operational masterpiece.',
        quote: 'Precision is not a measurement constraint; it is our corporate culture. We don\'t build machines—we craft high-speed rotational masterpieces with sub-micron engineering.',
        quoteAuthor: 'B. R. Gowda',
        expTitle: 'Experience',
        expDescription: '30+ Years in rotodynamic systems design.',
        stdTitle: 'Standards',
        stdDescription: 'Direct supervisor of BMT Zero-Defect QA cell.',
        affTitle: 'Affiliations',
        affDescription: 'Technical panelist at CMTI & AMTI Bangalore.',
        badgeTitle: 'MD Credentials',
        badgeText: 'CMTI Panelist'
      }
    })
    console.log('Seeded default MDInfo settings')
  } catch (error) {
    console.error('Error seeding admin user or mail config:', error)
  }
}
