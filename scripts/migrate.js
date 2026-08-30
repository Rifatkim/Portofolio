const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function runMigrations() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  console.log('Connecting to database...');
  
  if (!connectionString || connectionString.includes('[YOUR-PASSWORD]')) {
    console.error('DATABASE_URL or DIRECT_URL is missing or contains placeholder password.');
    return;
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully.');

    const migration1 = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql'), 'utf-8');
    console.log('Running 001_initial_schema.sql...');
    await client.query(migration1);
    console.log('001_initial_schema.sql applied successfully.');

    const migration2 = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '002_storage_buckets.sql'), 'utf-8');
    console.log('Running 002_storage_buckets.sql...');
    await client.query(migration2);
    console.log('002_storage_buckets.sql applied successfully.');

    console.log('All migrations applied successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    await client.end();
  }
}

runMigrations();
