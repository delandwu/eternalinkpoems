import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '@/database/schema_sqlite';
import path from 'path';

// This file creates a new SQLite database instance and passes it to Drizzle. 
// We're also passing our schema to Drizzle, so it can create the necessary tables. 
// Finally, we're running the migration to ensure that our database is up-to-date.

// Use absolute path for better compatibility in serverless environments
const dbPath = path.resolve(process.cwd(), 'src/database/poetry.db');

// Add error handling for database initialization
let sqlite: Database.Database;
try {
  sqlite = new Database(dbPath, { readonly: true });
} catch (error) {
  console.error('Failed to initialize database:', error);
  throw new Error('Database initialization failed');
}

export const localdb = drizzle(sqlite, { schema });
