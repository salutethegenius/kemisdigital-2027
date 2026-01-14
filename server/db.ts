import pg from 'pg';
const { Pool } = pg;

// Check if database is configured
const isDatabaseConfigured = !!(process.env.PGHOST || process.env.DATABASE_URL);

if (!isDatabaseConfigured) {
  console.warn('⚠️  Database not configured - blog and other DB features will return empty/mock data');
}

// Use environment variables provided by Replit or DATABASE_URL
const poolConfig = process.env.DATABASE_URL 
  ? { 
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  : isDatabaseConfigured 
    ? {
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT || '5432'),
        ssl: {
          rejectUnauthorized: false
        }
      }
    : undefined;

// Create a mock pool if no database is configured
class MockPool {
  async query(): Promise<{ rows: any[] }> {
    return { rows: [] };
  }
  on() {}
}

export const db = poolConfig ? new Pool(poolConfig) : new MockPool() as unknown as pg.Pool;

if (poolConfig) {
  (db as pg.Pool).on('error', (err: Error) => {
    console.error('Database pool error:', err.message);
    // Don't exit in development - just log the error
    if (process.env.NODE_ENV === 'production') {
      process.exit(-1);
    }
  });
}
