const fs = require('fs');
const sql = fs.readFileSync('bmt_clean_production.sql', 'utf8');
const lines = sql.split('\n').filter(l => l.includes('INSERT INTO "Product"'));
lines.forEach(l => {
  const m = l.match(/VALUES\s*\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*([0-9.]+),\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'/);
  if (m) {
    console.log(m[1].padEnd(40), '|', m[2].padEnd(35), '|', m[8]);
  }
});
