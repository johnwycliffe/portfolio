import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    console.log('Received contact form submission');
    const { name, email, message } = await req.json();
    console.log('Form data:', { name, email, message });

    // Validate input
    if (!name || !email || !message) {
      console.log('Validation failed:', { name, email, message });
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    console.log('Attempting database connection...');
    const client = await pool.connect();
    console.log('Database connected successfully');

    try {
      // Create contact_messages table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS public.contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Table checked/created successfully');

      // Insert the message
      const result = await client.query(
        'INSERT INTO public.contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [name, email, message]
      );
      console.log('Message inserted successfully:', result.rows[0]);

      return NextResponse.json(
        { message: 'Message sent successfully', data: result.rows[0] },
        { status: 201 }
      );
    } finally {
      // Always release the client back to the pool
      client.release();
      console.log('Database client released');
    }
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 