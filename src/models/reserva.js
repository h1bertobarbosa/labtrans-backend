const { Schema, model } = require('mongoose')

const ReservaSchema = new Schema({
  responsavel: String,
  cafe: Boolean,
  qtdPessoas: Number,
  descricao: String,
  dataInicio: Date,
  dataFim: Date,
  sala: { type: Schema.Types.ObjectId, ref: 'Sala' },
  local: { type: Schema.Types.ObjectId, ref: 'Local' }
}, {
  timestamps: true
})

module.exports = model('Reserva', ReservaSchema)
