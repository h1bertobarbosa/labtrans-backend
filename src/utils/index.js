const setAbsPath = (srcPath) => {
  global.include = (file) => {
    return require(`${srcPath}/${file}`)
  }
}

module.exports = {
  setAbsPath
}
