const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helpers = require('./test_helpers')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root', passwordHash: passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const userAtStart = await helpers.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('content-type', /application\/json/)

        const userAtEnd = await helpers.usersInDb()
        assert.strictEqual(userAtEnd.length, userAtStart.length+1)

        const usernames = userAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helpers.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helpers.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(userAtEnd.length, usersAtStart.length)
    })
})