const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

notesRouter.get('/:id', (request, response, next) => {
    const id = request.params.id
    Note.findById(id).then(note => {
        if(note){
            response.json(note)
        }
        else{
            response.status(404).end()
        }
    })
    .catch(error => {
        next(error)
    })
})

notesRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id
    Note.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
    const {content, important} = request.body
    const id = request.params.id
    Note.findById(id).then(note => {
        if(!note){
            return response.status(404).end()
        }
        note.content = content
        note.important = important
        return note.save().then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
    const body = request.body
    if(!body.content){
        return response.status(400).json({
            //400 bad request
            error: "content missing"
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter