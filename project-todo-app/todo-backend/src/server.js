const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const { initalizeTable, addNewTodo, getTodos } = require('./postgresQuery')


app.get('/api/todos', async (req, res) => {
  const listOfTodos = await getTodos()
  res.json(listOfTodos)
})

app.post('/api/todos', async (req, res) => {
  const content = req.body.content
  if (content.length > 140){
    console.log('ERROR : Todo rejected, todos content length exceeded 140 characters')
  } else {
    try {
      console.info('INFO : Adding new todo with content:', content)
      await addNewTodo(req.body.content)
    } catch (error) {
      console.error('ERROR : Error adding new todo: ', error)
    }
  }
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