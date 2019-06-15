const path = require('path')
const { setAbsPath } = require('./utils')
setAbsPath(path.join(__dirname, './'))
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

await mongoose.connect('mongodb://0.0.0.0:27017/labtrans', { useNewUrlParser: true, useCreateIndex: true })
const bodyParser = require('body-parser')

mongoose.Promise = Promise
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(include('routes'))
app.use(cors())

app.listen(3333)
