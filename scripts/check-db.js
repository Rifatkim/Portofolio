const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function checkDb() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log('Public tables in Supabase:', res.rows.map(r => r.table_name));

    const settings = await client.query('SELECT * FROM public.site_settings');
    console.log('Site settings count:', settings.rows.length);
  } catch (err) {
    console.error('Check error:', err);
  } finally {
    await client.end();
  }
}

checkDb();
