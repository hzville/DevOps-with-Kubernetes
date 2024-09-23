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

const PORT = process.env.PORT  || 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
  createImageFolder()
})
