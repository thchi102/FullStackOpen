const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const note = await Note.findById(id)
    if (note) {
        response.json(note)
    }
    else{
        response.status(404).end()
    }

})

notesRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id
    Note.findByIdAndDelete(id).then(() => {
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

notesRouter.post('/', async(request, response) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    const savedNote = await note.save()
    response.status(201).json(savedNote)

})

module.exports = notesRouter