const express = require('express')
const app = express()
const path = require('path')
const { writeFile, mkdirSync } = require('node:fs')
const logPath =  path.join('/', 'usr', 'src', 'app', 'files')
const logFileName = logPath+'/pingponglogs.txt'

let numberOfRequests = 0

const createLogFile = () => {
  mkdirSync(logPath, { recursive: true }, (error) => {
    console.log('Error writing file ', error)
  })
}

app.get('/pingpong', (req, res) => {
  numberOfRequests++
  writeFile(logFileName, numberOfRequests.toString(), err => {
    if (err) {
      console.log('error was ',err)
    }
  })
  res.send(`pong ${numberOfRequests}`)
})

app.get('/api/get-number', (req, res) => {
  res.json({ pingpongs: numberOfRequests })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  createLogFile()
  console.log(`ping-pong app started on port ${PORT}`)
})