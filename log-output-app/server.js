const express = require('express')
const app = express()
const {startRandomStringLog, getStringValue} = require('./logOutputApp')

app.get('/', (req, res) => {
  const stringValue = getStringValue()
  res.send(stringValue)
})

const PORT = process.env.PORT  || 3001
app.listen(PORT, () => {
  console.log(`Log output app started in port ${PORT}`)
  startRandomStringLog()
})