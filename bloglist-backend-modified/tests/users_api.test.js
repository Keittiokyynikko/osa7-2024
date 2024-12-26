const bcrypt = require('bcryptjs')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

describe('when there is initially one user at db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await api.get('/api/users')

    const newUser = {
      username: 'andej',
      name: 'Anders Jäderud',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length + 1)

    const usernames = usersAtEnd.body.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('username is at least 3 characters long', async() => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
        username: 'an',
        name: 'Anders Jäderud',
        password: 'salainen',
      }

      const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await api.get('/api/users')
      assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
  })

  test('password is at least 3 characters long', async() => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
        username: 'andej',
        name: 'Anders Jäderud',
        password: 'sa',
      }

      const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await api.get('/api/users')
      assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
  })

  test('user without username can not be created', async() => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
        name: 'Anders Jäderud',
        password: 'salainen',
      }

      const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await api.get('/api/users')
      assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
  })

})

after(async () => {
    await mongoose.connection.close()
})