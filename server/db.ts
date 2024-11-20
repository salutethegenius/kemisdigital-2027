import pg from 'pg';
const { Pool } = pg;

// Use environment variables provided by Replit
export const db = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || '5432'),
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
});

db.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
