const faker = require('faker')
faker.locale = 'pt_BR'
const localFake = require('./local')
const salaFake = require('./sala')
const Sala = include('models/sala')
const Local = include('models/local')

module.exports = async () => {
  const sala = await Sala.create(salaFake())
  const local = await Local.create(localFake())

  return {
    responsavel: `${faker.name.firstName()} ${faker.name.lastName()}`,
    cafe: faker.random.boolean(),
    qtdPessoas: faker.random.number(),
    descricao: faker.lorem.sentence(),
    dataInicio: faker.date.past(),
    dataFim: faker.date.future(),
    sala: sala._id,
    local: local._id
  }
}
