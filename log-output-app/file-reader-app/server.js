const express = require('express')
const app = express()
const {getTimestampAndRandomString, readInformationFile, getPingPongData} = require('./fileReader')

const envMessage = process.env.MESSAGE  || 'No env variable set'

app.get('/', async (req, res) => {
  const timeStampData = getTimestampAndRandomString()
  const pingPongData =  await getPingPongData()
  const informationData = await readInformationFile()
  res.send(
    `file content: ${informationData} <br/> 
    env variable: MESSAGE=${envMessage} <br/> 
    ${timeStampData} <br/> 
    Ping / Pongs: ${pingPongData.pingpongs}`)
})

app.get('/healthz', async (req, res) => {
  if (await getPingPongData() != null) {
    res.status(200).send('OK')
  } else {
    res.status(503).send('Database unavailable')
  }
})

const PORT = 3003 || process.env.PORT
app.listen(PORT, () => {
  console.log(`File reader app started at port ${PORT}`)
})