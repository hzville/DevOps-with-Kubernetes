const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const { initalizeTable, addNewTodo, getTodos, isDatabaseReady, updateTodoStatusDoneById } = require('./postgresQuery')


app.get('/api/todos', async (req, res) => {
  try {
    const listOfTodos = await getTodos()
    res.json(listOfTodos)
  } catch (error){
    console.log('Error getting todos', error)
    return null
  }
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

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params

  try {
    await updateTodoStatusDoneById(id)
    res.status(200).send('OK')
  } catch (error) {
    console.log('failed to update todo ', error)
    res.status(500).send('Failed updating todo status')
  }
})

app.get('/healthz', async (req, res) => {
  if (await isDatabaseReady()) {
    initalizeTable()
    res.status(200).send('OK')
  } else {
    res.status(503).send('Database unavailable')
  }
})

const PORT = 3004 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Todo-backend server started at port ${PORT}`)
})