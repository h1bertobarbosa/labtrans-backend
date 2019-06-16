const { isAfter, isBefore, isEqual } = require('date-fns')

const setAbsPath = (srcPath) => {
  global.include = (file) => {
    return require(`${srcPath}/${file}`)
  }
}

const isEmptyValue = (data) => {
  if (typeof (data) === 'number' || typeof (data) === 'boolean') {
    return false
  }
  if (typeof (data) === 'undefined' || data === null) {
    return true
  }
  if (typeof (data.length) !== 'undefined') {
    return data.length === 0
  }
  var count = 0
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      count++
    }
  }
  return count === 0
}

const temChoque = (DataInicioReserva, DataFimReserva, DataInicio) => {
  return (isEqual(DataInicio, DataInicioReserva) || isAfter(DataInicio, DataInicioReserva)) && isBefore(DataInicio, DataFimReserva)
}

module.exports = {
  temChoque,
  setAbsPath,
  isEmptyValue
}
