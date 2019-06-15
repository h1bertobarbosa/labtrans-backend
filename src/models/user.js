const mongoose = require('mongoose')
const { bcryptHash } = include('utils/auth')

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  password: String
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  let user = this
  if (!user.isModified('password')) return next()

  user.password = await bcryptHash(user.password)
  next()
})

module.exports = mongoose.model('User', UserSchema)
