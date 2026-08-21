const { Client } = require('pg')

async function testPg() {
  const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_MemHW9SCdtg2@ep-fragrant-sound-azji41kz-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
    ssl: { rejectUnauthorized: false }
  })

  try {
    console.log("Connecting via pg client...")
    await client.connect()
    console.log("CONNECTED successfully to PostgreSQL!")
    const res = await client.query('SELECT tablename FROM pg_tables WHERE schemaname = \'public\';')
    console.log("Tables in DB:", res.rows)
    const prods = await client.query('SELECT id, name, slug, image FROM "Product"')
    console.log("Products in DB table:", prods.rows)
  } catch (err) {
    console.error("PG Connection error:", err)
  } finally {
    await client.end()
  }
}

testPg()
