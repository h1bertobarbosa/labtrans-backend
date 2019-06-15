const express = require('express')
const routes = new express.Router()
const SalaController = include('./controllers/salaController')
const LocalController = include('./controllers/localController')

// const PostController = require('./controllers/PostController')
// const LikeController = require('./controllers/LikeController')

//routes.get('/posts', PostController.index)
// routes.post('/posts/:id/like', LikeController.store)
routes.post('/sala/register', SalaController.store)
routes.get('/sala/list', SalaController.index)

routes.post('/local/register', LocalController.store)
routes.get('/local/list', LocalController.index)
module.exports = routes
