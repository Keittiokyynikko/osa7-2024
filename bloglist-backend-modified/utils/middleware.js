const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const errorHandler = (error, request, response, next) => {
    if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
      }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '')
      const decodedToken = jwt.verify(token, config.SECRET)
      request.user = await User.findById(decodedToken.id)
    }
    next()
}

module.exports = {errorHandler, tokenExtractor, userExtractor}