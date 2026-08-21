const { Client } = require('pg');

async function test() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_MemHW9SCdtg2@13.251.213.89:5432/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Successfully connected to Neon PostgreSQL directly via IP!');
    const res = await client.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';');
    console.log('Tables:', res.rows.map(r => r.table_name));
    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

test();
