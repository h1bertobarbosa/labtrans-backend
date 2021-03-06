const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 10

const bcryptCompare = async (plainText, hash) => {
  return bcrypt.compare(plainText, hash)
}

const bcryptHash = async (plainText) => {
  return bcrypt.hash(plainText, SALT_ROUNDS)
}

const JWTSign = async (payload) => {
  return jwt.sign({
    data: payload
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const JWTVerify = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  bcryptCompare,
  bcryptHash,
  JWTVerify,
  JWTSign
}
