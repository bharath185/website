import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Check if running in a serverless environment (like Vercel or AWS Lambda)
const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)

let prismaInstance: PrismaClient

if (isServerless) {
  const tmpDbPath = '/tmp/dev.db'
  
  try {
    // Determine the build-time source DB path
    let srcDbPath = path.join(process.cwd(), 'prisma', 'dev.db')
    if (!fs.existsSync(srcDbPath)) {
      srcDbPath = path.join(process.cwd(), 'dev.db')
    }

    if (fs.existsSync(srcDbPath)) {
      // Only copy if the writeable file does not exist yet in /tmp
      if (!fs.existsSync(tmpDbPath)) {
        fs.copyFileSync(srcDbPath, tmpDbPath)
        // Set permissions to ensure it is writeable
        try {
          fs.chmodSync(tmpDbPath, 0o666)
        } catch (e) {
          console.warn('Failed to chmod /tmp/dev.db:', e)
        }
        console.log('Successfully copied SQLite dev.db to /tmp/dev.db')
      }
    } else {
      console.warn('Source SQLite db file not found at:', srcDbPath)
    }
  } catch (err) {
    console.error('Failed to copy SQLite database to /tmp:', err)
  }

  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: `file:${tmpDbPath}`,
      },
    },
    log: ['error'],
  })
} else {
  prismaInstance =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ['error'],
    })
}

export const db = prismaInstance

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

