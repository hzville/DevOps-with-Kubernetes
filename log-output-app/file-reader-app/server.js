const express = require('express')
const app = express()
const {getTimestampAndRandomString} = require('./fileReader')

app.get('/', (req, res) => {
  const result = getTimestampAndRandomString()
  res.send(result)
})

const PORT = 3003 || process.env.PORT
app.listen(PORT, () => {
  console.log(`File reader app started at port ${PORT}`)
})