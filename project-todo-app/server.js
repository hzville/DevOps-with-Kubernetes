const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello from the cluster </h1>')
})

const PORT = process.env.PORT  || 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
