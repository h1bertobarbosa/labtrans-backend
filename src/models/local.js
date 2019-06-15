const mongoose = require('mongoose')

const LocalSchema = new mongoose.Schema({
    nome: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Local', LocalSchema)
