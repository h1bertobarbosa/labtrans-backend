const ServerMock = require('./mocks/server')
const Sala = include('models/sala')
const salaFake = require('./factories/sala')

const REQUEST_SUCCESS = 200
const REQUEST_SUCCESS_CREATED = 201
// const BAD_REQUEST = 400
describe('User Tests', () => {
  let request

  beforeAll(async () => {
    request = await ServerMock()
    await Sala.deleteMany({})
  })

  beforeEach(async () => {
    await Sala.deleteMany({})
  })

  test('should register sala - POST /sala/register', async () => {
    const fakeSala = salaFake()
    await request
      .post('/sala/register')
      .send(fakeSala)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS_CREATED)

    const sala = await Sala.findOne({ nome: fakeSala.nome })

    expect(sala.nome).toBe(fakeSala.nome)
  })

  test('should list sala - POST /sala/list', async () => {
    const fakeSala = salaFake()
    const fakeSala2 = salaFake()

    await Sala.create(fakeSala)
    await Sala.create(fakeSala2)
    const res = await request
      .get('/sala/list')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS)

    expect(res.body.length).toBe(2)
  })

  afterAll(async () => {
    await Sala.deleteMany({})
  })
})
