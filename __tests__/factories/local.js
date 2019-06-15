const faker = require('faker')
faker.locale = 'pt_BR'

module.exports = () => {
  return {
    nome: faker.company.companyName()
  }
}
