const express = require('express')
const app = express()
const { initalizeTable, addNewPing, getPingPongs, isDatabaseReady } = require('./postgresQuerys.js')

app.get('/pingpong', async (req, res) => {
  try {
    await addNewPing()
    result = await getPingPongs()
    res.send(`pong ${result.count}`)
  } catch (error) {
    console.log('Error adding new pingpong', error)
  }
})

app.get('/api/get-number', async (req, res) => {
  try {
    result = await getPingPongs()
    res.json({ pingpongs: result.count })
  } catch (error) {
    console.log('Error getting pingpong count', error)
  }
})

app.get('/healthz', async (req, res) => {
  if (await isDatabaseReady()) {
    initalizeTable()
    res.status(200).send('OK')
  } else {
    res.status(503).send('Database unavailable')
  }
})

const PORT = process.env.PORT || 3002
app.listen(PORT, async () => {
  console.log(`ping-pong app started on port ${PORT}`)
})