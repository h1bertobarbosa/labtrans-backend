class ValidationError extends Error {
  constructor ({ message, errors } = {}) {
    super()

    this.name = 'ValidationError'
    this.type = 'validation_error'
    this.message = message
    this.errors = errors
  }
}

module.exports = ValidationError
