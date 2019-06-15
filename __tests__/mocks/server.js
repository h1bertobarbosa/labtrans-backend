require('dotenv').config({
  path: '.env.testing'
})

const path = require('path')
const { setAbsPath } = require('../../src/utils')
setAbsPath(path.join(__dirname, '/../../src'))
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const SuperTest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('express-jwt')

app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/user/register', '/authenticate'] }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(include('routes'))

module.exports = async () => {
  mongoose.Promise = Promise
  await mongoose.connect('mongodb://0.0.0.0:27017/testing', { useNewUrlParser: true, useCreateIndex: true })
  return SuperTest(app)
}
