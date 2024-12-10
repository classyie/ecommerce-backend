const { Client } = require('pg');
require('dotenv').config();

const db = new Client({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'ecommerce_db',
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = db;
