const { PrismaClient } = require('@prisma/client')

async function testUrl(url, label) {
  console.log(`Testing ${label}...`)
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    }
  })
  try {
    const count = await prisma.product.count()
    console.log(`SUCCESS ${label}! Count:`, count)
    const prods = await prisma.product.findMany()
    console.log(`Products in DB (${prods.length}):`, prods.map(p => ({ id: p.id, name: p.name })))
  } catch (err) {
    console.error(`FAILED ${label}:`, err.message || err)
  } finally {
    await prisma.$disconnect()
  }
}

async function main() {
  const url1 = "postgresql://neondb_owner:npg_MemHW9SCdtg2@ep-fragrant-sound-azji41kz-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  const url2 = "postgresql://neondb_owner:npg_MemHW9SCdtg2@ep-fragrant-sound-azji41kz.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  
  await testUrl(url1, "Neon Pooler without channel_binding")
  await testUrl(url2, "Neon Direct (non-pooler)")
}

main()
