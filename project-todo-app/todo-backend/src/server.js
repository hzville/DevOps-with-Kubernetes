const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const { initalizeTable, addNewTodo, getTodos } = require('./postgresQuery')


app.get('/todos', async (req, res) => {
  const listOfTodos = await getTodos()
  res.json(listOfTodos)
})

app.post('/todos', async (req, res) => {
  await addNewTodo(req.body.content)
  res.redirect('back')
})


const PORT = 3004 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Todo-backend server started at port ${PORT}`)
  setTimeout(() => {
    console.log('Starting Postgres database')
    initalizeTable()
  }, 5000)
})