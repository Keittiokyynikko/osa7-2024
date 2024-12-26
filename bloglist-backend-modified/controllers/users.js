const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({}).populate('blogs', {url:1, title:1, author:1, id:1})
        response.json(users)
    } catch(exception) {
        next(exception)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body
    console.log(username, password)

    if(username === undefined || password === undefined) {
        return response.status(400).json({error: 'username and password required'})
    } else if(username.length < 3) {
        return response.status(400).json({error: 'username need to be at least 3 characters long'})
    } else if(password.length < 3) {
        return response.status(400).json({error: 'password need to be at least 3 characters long'})
    }

    const currentUsers = await User.find({})
    let userExists = false
    currentUsers.forEach(user => {
        if(user.username === username) {
            userExists = true
        }
    })

    if(userExists) {
        return response.status(400).json({error: 'username need to be unique'})
    } else {

        try {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)
        
            const user = new User({
                username,
                name,
                passwordHash,
            })
        
            const savedUser = await user.save()
        
            response.status(201).json(savedUser)

        } catch(error) {
            next(error)
        }
    }
  })
  
  module.exports = usersRouter