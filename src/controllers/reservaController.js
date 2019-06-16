const Reserva = include('models/reserva')
const { temChoque, isEmptyValue } = include('utils')
const ValidationError = include('errors/validation')

const validarChoqueHorario = async (data, id) => {
  let reservasByLocalSala
  if (id) {
    reservasByLocalSala = await Reserva.find({ local: data.local, sala: data.sala, _id: { $ne: id } })
  } else {
    reservasByLocalSala = await Reserva.find({ local: data.local, sala: data.sala })
  }
  let errors = []

  reservasByLocalSala.forEach((reserva, i) => {
    if (temChoque(reserva.dataInicio, reserva.dataFim, new Date(data.dataInicio))) {
      errors.push({ message: 'Já existe uma sala reservada com esse horário', service: 'reserva_validation' })
    }
  })

  if (!isEmptyValue(errors)) {
    throw new ValidationError({
      message: 'Erro de validação',
      errors
    })
  }
}

module.exports = {
  async index (req, res) {
    const reservas = await Reserva.find().sort('-dataInicio')
    res.json(reservas)
  },

  async store (req, res) {
    try {
      await validarChoqueHorario(req.body)
      const reserva = await Reserva.create(req.body)

      return res.status(201).json(reserva)
    } catch (e) {
      res.status(400).json({
        type: e.type,
        message: e.message,
        errors: e.errors
      })
    }
  },

  async edit (req, res) {
    const reserva = await Reserva.findById(req.params.id)
    res.json(reserva)
  },

  async update (req, res) {
    try {
      await validarChoqueHorario(req.body, req.params.id)
      const reserva = await Reserva.findOne({ _id: req.params.id })
      const reservaUpdated = await reserva.set(req.body).save()
      res.json(reservaUpdated)
    } catch (e) {
      let exception = {
        type: e.type,
        message: e.message,
        errors: e.errors
      }
      if (e.name === 'CastError') {
        exception = {
          type: 'MongooseError',
          message: 'Reserva não encontrada'
        }
      }
      res.status(400).json(exception)
    }
  },

  async remove (req, res) {
    try {
      await Reserva.deleteOne({ _id: req.params.id })
      res.json({ ok: true })
    } catch (e) {
      res.status(400).json({
        type: 'MongooseError',
        message: 'Reserva não encontrada'
      })
    }
  }
}
