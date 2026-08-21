const dns = require('dns').promises;
dns.setServers(['8.8.8.8', '1.1.1.1']);
const { Client } = require('pg');

async function check() {
  const host = 'ep-fragrant-sound-azji41kz-pooler.c-3.ap-southeast-1.aws.neon.tech';
  const ips = await dns.resolve4(host);
  const client = new Client({
    host: ips[0],
    port: 5432,
    database: 'neondb',
    user: 'neondb_owner',
    password: 'npg_MemHW9SCdtg2',
    ssl: { rejectUnauthorized: false, servername: host }
  });

  await client.connect();
  const res = await client.query('SELECT id, name, slug, category, "createdAt" FROM "Product" ORDER BY "createdAt" DESC;');
  console.log('PRODUCTS IN NEON DB:');
  console.table(res.rows);
  await client.end();
}

check();
