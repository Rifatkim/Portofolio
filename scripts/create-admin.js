const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function createAdmin(email, password) {
  if (!email || !password) {
    console.log('Usage: node scripts/create-admin.js <email> <password>');
    return;
  }

  const client = new Client({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // Check if user already exists
    const existing = await client.query('SELECT id, email FROM auth.users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      console.log(`User ${email} already exists with ID: ${existing.rows[0].id}`);
      // Update password if needed
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await client.query('UPDATE auth.users SET encrypted_password = $1, updated_at = NOW() WHERE email = $2', [hash, email]);
      console.log(`Password for ${email} has been updated successfully.`);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
      ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        $1,
        $2,
        NOW(),
        NOW(),
        NOW(),
        '{"provider":"email","providers":["email"]}',
        '{}',
        NOW(),
        NOW(),
        '',
        '',
        '',
        ''
      ) RETURNING id, email;
    `;

    const res = await client.query(query, [email, hash]);
    console.log(`Admin user created successfully! ID: ${res.rows[0].id}, Email: ${res.rows[0].email}`);
  } catch (err) {
    console.error('Error creating admin user:', err.message);
  } finally {
    await client.end();
  }
}

const args = process.argv.slice(2);
const email = args[0] || 'admin@rifathakim.com';
const password = args[1] || 'Admin12345!';

createAdmin(email, password);
