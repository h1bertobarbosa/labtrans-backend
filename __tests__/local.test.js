const ServerMock = require('./mocks/server')
const Local = include('models/local')
const localFake = require('./factories/local')

const REQUEST_SUCCESS = 200
const REQUEST_SUCCESS_CREATED = 201
// const BAD_REQUEST = 400
describe('User Tests', () => {
  let request

  beforeAll(async () => {
    request = await ServerMock()
    await Local.deleteMany({})
  })

  beforeEach(async () => {
    await Local.deleteMany({})
  })

  test('should register local - POST /local/register', async () => {
    const fakeLocal = localFake()
    await request
      .post('/local/register')
      .send(fakeLocal)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS_CREATED)

    const local = await Local.findOne({ nome: fakeLocal.nome })

    expect(local.nome).toBe(fakeLocal.nome)
  })

  test('should list local - POST /local/list', async () => {
    const fakeLocal = localFake()
    const fakeLocal2 = localFake()

    await Local.create(fakeLocal)
    await Local.create(fakeLocal2)
    const res = await request
      .get('/local/list')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS)

    expect(res.body).toHaveLength(2)
  })

  afterAll(async () => {
    await Local.deleteMany({})
  })
})
