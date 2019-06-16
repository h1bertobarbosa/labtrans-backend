require('dotenv/config')
const path = require('path')
const { setAbsPath } = require('./utils')
setAbsPath(path.join(__dirname, './'))
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')

mongoose.Promise = Promise
mongoose.connect('mongodb://0.0.0.0:27017/labtrans', { useNewUrlParser: true, useCreateIndex: true })

app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/user/register', '/authenticate'] }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const options = {
  origin: true,
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': true,
  'Access-Control-Allow-Headers': true,
  'Access-Control-Expose-Headers': true
}

app.use(cors(options))
app.use(include('routes'))

app.listen(3333)
