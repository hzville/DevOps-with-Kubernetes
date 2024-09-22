const { Pool } = require('pg')
const table = 'pingpongs'
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
})

const initalizeTable = async () => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const query = `
      CREATE TABLE IF NOT EXISTS ${table} (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        event_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `
    await client.query(query)
    await client.query('COMMIT')

  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Transaction error:', err.stack)

  } finally {
    client.release()
  }
}

const addNewPing = async () => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(`INSERT INTO ${table} (event_name)  VALUES ('ping');`)
    await client.query('COMMIT')

  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Transaction error:', err.stack)

  } finally {
    client.release()
  }
}

const getPingPongs = async () => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const res2 = await client.query(`SELECT COUNT(*) FROM ${table};`)
    await client.query('COMMIT')
    return res2.rows[0]
  
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Transaction error:', err.stack)
  
  } finally {
    client.release()
  }
}

module.exports = { initalizeTable, addNewPing, getPingPongs }