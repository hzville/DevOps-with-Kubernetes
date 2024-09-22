const express = require('express')
const app = express()
const { initalizeTable, addNewPing, getPingPongs } = require('./postgresQuerys.js')

app.get('/pingpong', async (req, res) => {
  await addNewPing()
  result = await getPingPongs()
  res.send(`pong ${result.count}`)
})

app.get('/api/get-number', async (req, res) => {
  result = await getPingPongs()
  res.json({ pingpongs: result.count })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, async () => {
  console.log(`ping-pong app started on port ${PORT}`)
  setTimeout(() => {
    console.log('starting postgres connection')
    initalizeTable()
  },5000)
})