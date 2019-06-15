const User = include('models/user')
const userFake = require('../factories/user')
const { JWTSign } = include('utils/auth')

module.exports = async () => {
  const user = await User.create(userFake())
  return JWTSign(user)
}
