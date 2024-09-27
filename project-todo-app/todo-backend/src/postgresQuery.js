const { Pool } = require('pg')
const table = 'todos'
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
        todo_content VARCHAR(255) NOT NULL,
        todo_status VARCHAR(255) DEFAULT todo,
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

const addNewTodo = async (content) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(`INSERT INTO ${table} (todo_content)  VALUES ('${content}');`)
    await client.query('COMMIT')

  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Transaction error:', err.stack)

  } finally {
    client.release()
  }
}

const getTodos = async () => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await client.query(`SELECT id, todo_content, todo_status FROM ${table};`)
    await client.query('COMMIT')
    return result.rows
  
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Transaction error:', err.stack)
  
  } finally {
    client.release()
  }
}

const updateTodoStatusDoneById = async (id) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(`UPDATE ${table} SET todo_status ='done' WHERE id = '${id}';`)
    await client.query('COMMIT')  
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Transaction error:', err.stack)
  
  } finally {
    client.release()
  }
}

const isDatabaseReady = async () => {
  try {
    const client = await pool.connect()
    client.release()
    return true
  } catch (error) {
    console.log('Error connecting to database ', error)
    return false
  }
}

module.exports = { initalizeTable, addNewTodo, getTodos, isDatabaseReady, updateTodoStatusDoneById }