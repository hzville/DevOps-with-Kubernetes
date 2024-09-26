const express = require('express')
const app = express()
const cors = require('cors')
const { createImageFolder, checkIfImageExists } = require('./getImage')
app.use(cors())
app.use(express.static(__dirname, {
  extensions:["jpg"]
}))

app.get('/', async (req, res) => {
  checkIfImageExists()
  res.sendFile('front-page.html', {root: __dirname})
})

app.get('/healthz', async (req, res) => {
  const result = await fetch('http://localhost:3004/api/todos')
  if (result.status == 200 ) {
        res.status(200).send('OK')
      } else {
        res.status(503).send('Service unavailable')
      }
})

const PORT = process.env.PORT  || 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
  createImageFolder()
})
