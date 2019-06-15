const User = include('models/user')

module.exports = {
  async store (req, res) {
    const { nome, email, password } = req.body
    const user = await User.create({ nome, email, password })
    return res.status(201).json(user)
  }
}
