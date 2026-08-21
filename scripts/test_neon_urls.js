const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const { Client } = require('pg');

async function testUrl(name, url) {
  console.log(`\nTesting ${name}: ${url}`);
  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000
  });

  try {
    await client.connect();
    console.log(`[SUCCESS] Connected to ${name}!`);
    const res = await client.query('SELECT current_database(), current_user;');
    console.log('Result:', res.rows[0]);
    await client.end();
    return true;
  } catch (err) {
    console.error(`[FAILED] ${name}:`, err.message);
    try { await client.end(); } catch {}
    return false;
  }
}

async function run() {
  const url1 = 'postgresql://neondb_owner:npg_MemHW9SCdtg2@ep-fragrant-sound-azji41kz-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
  const url2 = 'postgresql://neondb_owner:npg_MemHW9SCdtg2@ep-fragrant-sound-azji41kz.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
  
  await testUrl('Neon Pooler', url1);
  await testUrl('Neon Direct', url2);
}

run();
