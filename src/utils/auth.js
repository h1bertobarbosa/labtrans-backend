const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const bcryptCompare = async (plainText, hash) => {
  return bcrypt.compare(plainText, hash)
}

const bcryptHash = async (plainText) => {
  return bcrypt.hash(plainText, SALT_ROUNDS)
}

module.exports = {
  bcryptCompare,
  bcryptHash
}
