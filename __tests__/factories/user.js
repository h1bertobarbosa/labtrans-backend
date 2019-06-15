const faker = require('faker')
faker.locale = 'pt_BR'

module.exports = () => {
  return {
    nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}
