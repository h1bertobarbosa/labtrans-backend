const User = include('models/user')
const { bcryptCompare, JWTSign } = include('utils/auth')
const { isEmptyValue } = include('utils')
const ValidationError = include('errors/validation')

const validationAuth = async ({ email, password }) => {
  const hasUser = await User.findOne({ email })
  let errors = []
  if (isEmptyValue(hasUser)) { errors.push({ message: 'Email ou senha digitado esta errado ou usuário inexistente', service: 'auth_validation' }) }
  if (hasUser) {
    const match = await bcryptCompare(password, hasUser.password)
    if (!match) errors.push({ message: 'Email ou senha digitado esta errado', service: 'auth_validation' })
  }

  if (isEmptyValue(errors)) return hasUser

  throw new ValidationError({
    message: 'Erro de autenticação',
    errors
  })
}

module.exports = {
  async store (req, res) {
    const { nome, email, password } = req.body
    const user = await User.create({ nome, email, password })
    return res.status(201).json(user)
  },

  async auth (req, res) {
    try {
      const { email, password } = req.body
      const user = await validationAuth({ email, password })
      const token = await JWTSign(user)
      res.status(200).json({ token })
    } catch (e) {
      res.status(400).json({
        type: e.type,
        message: e.message,
        errors: e.errors
      })
    }
  }
}
