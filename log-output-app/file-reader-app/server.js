const express = require('express')
const app = express()
const {getTimestampAndRandomString, getPingPongData} = require('./fileReader')

app.get('/', (req, res) => {
  const timeStampData = getTimestampAndRandomString()
  const pingPongData = getPingPongData()
  res.send(`${timeStampData} \n Ping / Pongs: ${pingPongData}`)
})

const PORT = 3003 || process.env.PORT
app.listen(PORT, () => {
  console.log(`File reader app started at port ${PORT}`)
})