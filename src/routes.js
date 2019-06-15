const express = require('express')
const routes = new express.Router()
const SalaController = include('./controllers/salaController')
const LocalController = include('./controllers/localController')
const UserController = include('./controllers/userController')

routes.post('/sala/register', SalaController.store)
routes.get('/sala/list', SalaController.index)

routes.post('/local/register', LocalController.store)
routes.get('/local/list', LocalController.index)

routes.post('/user/register', UserController.store)

module.exports = routes
