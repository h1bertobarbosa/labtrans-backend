const Reserva = include('models/reserva')

module.exports = {
  async index (req, res) {
    const reservas = await Reserva.find().sort('-dataInicio')
    res.json(reservas)
  },

  async store (req, res) {
    const reserva = await Reserva.create(req.body)

    return res.status(201).json(reserva)
  },

  async edit (req, res) {
    const reserva = await Reserva.findById(req.params.id)
    res.json(reserva)
  },

  async update (req, res) {
    try {
      const reserva = await Reserva.findOne({ _id: req.params.id })
      const reservaUpdated = await reserva.set(req.body).save()
      res.json(reservaUpdated)
    } catch (e) {
      res.status(400).json({
        type: 'MongooseError',
        message: 'Reserva não encontrada'
      })
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
