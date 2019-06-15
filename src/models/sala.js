const mongoose = require('mongoose')

const SalaSchema = new mongoose.Schema({
    nome: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Sala', SalaSchema)
