const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {

    if(!request.body.title || !request.body.url){
        return response.status(400).json({error: 'title or url missing'})
    }

    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
   const id = request.params.id
   await Blog.findByIdAndDelete(id)
   response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const filter = {_id:id}
    const updatedBlog = await Blog.findOneAndUpdate(filter, request.body)

    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
  