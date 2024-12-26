const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Testiotsikko',
        author: 'Heikki Helander',
        url: 'www.example.blog.com',
        likes: 7
    },
    {
        title: 'Testiotsikko 2',
        author: 'Anders Jäderud',
        url: 'www.example.blog2.com',
        likes: 10
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

describe('fetching blogs', async() => {
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('blog id is named correctly', async () => {
        const response = await api.get('/api/blogs')
        for(i=0; i<response.body.length; i++) {
            const firstObject = response.body[i]
            assert.strictEqual(Object.keys(firstObject)[4], 'id')
        }
    })
})

describe('adding blogs to database', async() => {
    test('a valid blog can be added', async () => {

        
        const newBlog = {
            title: 'Taas uusi otsikko',
            author: 'Ingmar Stenmark',
            url: 'www.example.blog3.com',
            likes: 4,
            user: '673df230c7151d20ab2cc3ba'
        }
    
        await api
        .post('/api/blogs')
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZGVqIiwiaWQiOiI2NzNjOWI2ZGJkZDkyNjU2YzU5OWVhZDAiLCJpYXQiOjE3MzIxOTY0ODZ9.w4Quk6OK7LN7AxJbxdI0Qqcod5vxktIGM712LGO1jVk'})
        .set('Body', newBlog)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
    })
    
    test('if likes is empty it is zero', async () => {
        const newBlog = {
            title: 'Taas uusi otsikko',
            author: 'Ingmar Stenmark',
            url: 'www.example.blog3.com'
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body[2].likes, 0)
    })
    
    test('if title or url empty it is a bad request', async () => {
        const newBlog = {
            author: 'Ingmar Stenmark',
            likes: 0
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })
})

describe('editing existing blogs', async() => {
    test('a blog can be deleted', async() => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]
    
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
        const blogsAtEnd = await api.get('/api/blogs')
    
        assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)
    })

    test('a blog can be edited', async() => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToEdit = blogsAtStart.body[0]

        const newBlog = {
            likes: 7
        }

        await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body[0].likes, newBlog.likes)
    })
})

after(async () => {
    await mongoose.connection.close()
})