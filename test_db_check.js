const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    const count = await prisma.product.count()
    console.log('Total products count in DB:', count)
    const products = await prisma.product.findMany()
    console.log('Products in DB:', JSON.stringify(products.map(p => ({ id: p.id, name: p.name, slug: p.slug, image: p.image, images: p.images })), null, 2))
  } catch (err) {
    console.error('Error connecting to DB:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
