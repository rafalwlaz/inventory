const fs = require('fs');
const path = require('path');
const db = require('./db');

async function run() {
  console.log('DATABASE_URL=', process.env.DATABASE_URL);
  const file = path.join(__dirname, 'migrations', 'init.sql');
  const sql = fs.readFileSync(file, 'utf8');
  try {
    await db.pool.query(sql);
    console.log('Migrations applied successfully.');
  } catch (err) {
    console.error('Migration failed:', err.message || err);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
}

run();
