const Sala = include('models/sala')

module.exports = {
  async index (req, res) {
    const salas = await Sala.find().sort('-nome')
    res.json(salas)
  },

  async store (req, res) {
    const { nome } = req.body
    const sala = await Sala.create({ nome })
    return res.status(201).json(sala)
  }
}
