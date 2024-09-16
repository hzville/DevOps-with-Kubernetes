const express = require('express')
const app = express()

let numberOfRequests = 0

app.get('/pingpong', (req, res) => {
  numberOfRequests++
  res.send(`pong ${numberOfRequests}`)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`ping-pong app started on port ${PORT}`)
})