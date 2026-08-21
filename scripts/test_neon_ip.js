const dns = require('dns').promises;
dns.setServers(['8.8.8.8', '1.1.1.1']);

const { Client } = require('pg');

async function test() {
  const host = 'ep-fragrant-sound-azji41kz-pooler.c-3.ap-southeast-1.aws.neon.tech';
  console.log('Resolving host:', host);
  const ips = await dns.resolve4(host);
  console.log('Resolved IPs:', ips);

  const client = new Client({
    host: ips[0],
    port: 5432,
    database: 'neondb',
    user: 'neondb_owner',
    password: 'npg_MemHW9SCdtg2',
    ssl: {
      rejectUnauthorized: false,
      servername: host
    }
  });

  try {
    await client.connect();
    console.log('[SUCCESS] Successfully connected to Neon Database!');
    const res = await client.query('SELECT count(*) FROM "Product";');
    console.log('Products count in DB:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('[ERROR] Failed connecting:', err);
    try { await client.end(); } catch {}
  }
}

test();
