const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const listOfTodos = require('./todos.json')


app.get('/todos', (req, res) => {
  res.json(listOfTodos)
})

app.post('/todos', (req, res) => {
  listOfTodos.todos.push({ content: req.body.content})
  res.redirect('back')
})


const PORT = 3004 || process.env.PORT
app.listen(PORT, () => {
  console.log(`1 Todo-backend server started at port ${PORT}`)
})