const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'John Doe',
        url: 'https://www.google.com',
        likes: 10
    },
    {
        title: 'Browser can execute only JavaScript',
        author: 'John Doe',
        url: 'https://www.google.com',
        likes: 16
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('backend API', () => {
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('correct number of blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('returned unique identifier property of the blog post is `id` instead of `_id`', async () => {
        const response = await api.get('/api/blogs')
        response.body.map(blog => {
            const keys = Object.keys(blog)
            assert(keys.includes('id'))
        })
    })

    test('a blog post can be added', async () => {
        const newBlog = {
            title: 'This blog is added by post',
            author: 'Jonathan',
            url: 'https://www.addedbypost.com',
            likes: 32
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await api.get('/api/blogs')
        assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1)
        assert.deepStrictEqual(blogsAtEnd.body[blogsAtEnd.body.length - 1].title, newBlog.title)
    })

    test('blog without likes property is added with the default value 0', async () => {
        const newBlog = {
            title: 'This blog doesn\'t have likes property',
            author: 'Jonathan',
            url: 'https://www.nolikeproperty.com',
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await api.get('/api/blogs')
        assert.deepStrictEqual(blogsAtEnd.body[blogsAtEnd.body.length - 1].likes, 0)
    })

    test('blog without title or url is not added', async () => {
        const newBlogWoTitle = {
            author: 'Jonathan',
            url: 'https://www.nolikeproperty.com',
            likes: 10
        }

        const newBlogWoUrl = {
            title: 'This blog doesn\'t have url property',
            author: 'Jonathan',
            likes: 10
        }

        await api
        .post('/api/blogs')
        .send(newBlogWoTitle)
        .expect(400)

        await api
        .post('/api/blogs')
        .send(newBlogWoUrl)
        .expect(400)

        const blogsAtEnd = await api.get('/api/blogs')
        assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)
    })

    test('a blog can be deleted', async () => {
        const response = await api.get('/api/blogs')
        const blogIdToDelete = response.body[0].id
        await api
        .delete(`/api/blogs/${blogIdToDelete}`)
        .expect(204)

        const responseAfter = await api.get('/api/blogs')

        assert.strictEqual(responseAfter.body.length, initialBlogs.length-1)
    })

    test('a blog can be updated', async () => {
        const toUpdate = {
            title: 'This blog is updated',
            author: 'update',
            url: 'https://www.update.com',
            likes: 100
        }
        const response = await api.get('/api/blogs')
        const blogIdToUpdate = response.body[0].id

        await api
        .put(`/api/blogs/${blogIdToUpdate}`)
        .send(toUpdate)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const responseAfter = await api.get('/api/blogs')
        assert.strictEqual(responseAfter.body[0].title, toUpdate.title)
        assert.strictEqual(responseAfter.body[0].author, toUpdate.author)
        assert.strictEqual(responseAfter.body[0].url, toUpdate.url)
        assert.strictEqual(responseAfter.body[0].likes, toUpdate.likes)
    })
})

after(async () => {
    await mongoose.connection.close()
})


