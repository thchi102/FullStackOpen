const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


app.use(express.json())
//app.use(requestLogger)
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  })
)

var persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
  const datetime = new Date()
  response.send(
    `
    <div>Phonebook has info for ${persons.length} people<div/>
    <div>${datetime}<div/>
    `
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if(person){
    response.send(
      `
        <div>${person.name}</div>
        <div>${person.number}</div>
      `
    )
  }
  else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end() //204 means no content to return
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body){
    return response.status(400).json({error: "No content found"})
  }

  if(!body.name || !body.number){
    return response.status(400).json({error: "Missing name or number"})
  }

  if(persons.find(p => p.name === body.name)){
    return response.status(400).json({error: "Name must be unique"})
  }

  const new_person = {
    "id": String(Math.floor(Math.random()*100000)),
    "name": body.name,
    "number": body.number
  }
  persons = persons.concat(new_person)
  response.json(new_person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)})
