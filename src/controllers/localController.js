const Local = include('models/local')

module.exports = {
    async index (req, res){
        const locais = await Local.find().sort('-nome')
        res.json(locais)
    },

    async store(req, res) {
        const {nome} = req.body
        const sala = await Local.create({nome})
        return res.status(201).json(sala)
    }
}
