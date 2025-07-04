import pool from '../lib/db';

async function testConnection() {
  try {
    // Test the connection
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database');

    // Test creating the contact_messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Contact messages table created or already exists');

    // Test inserting a row
    const testResult = await client.query(
      'INSERT INTO public.contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      ['Test User', 'test@example.com', 'Test message']
    );
    console.log('Test message inserted:', testResult.rows[0]);

    // Release the client back to the pool
    client.release();
    
    // Close the pool
    await pool.end();
    
    console.log('Database test completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error testing database connection:', err);
    process.exit(1);
  }
}

testConnection(); 