const express = require('express')
const routes = new express.Router()
const SalaController = include('./controllers/salaController')
const LocalController = include('./controllers/localController')
const UserController = include('./controllers/userController')
const ReservaController = include('./controllers/reservaController')

routes.post('/sala/register', SalaController.store)
routes.get('/sala/list', SalaController.index)

routes.post('/local/register', LocalController.store)
routes.get('/local/list', LocalController.index)

routes.post('/user/register', UserController.store)
routes.post('/authenticate', UserController.auth)

routes.post('/reserva/register', ReservaController.store)
routes.get('/reserva/list', ReservaController.index)
routes.get('/reserva/:id', ReservaController.edit)
routes.put('/reserva/:id', ReservaController.update)
routes.delete('/reserva/:id', ReservaController.remove)

module.exports = routes
