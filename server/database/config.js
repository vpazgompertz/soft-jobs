import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  allowExitOnIdle: true,
});

(async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('DB connected:', result.rows[0].now);
    client.release();
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
})();

export { pool };
