const ServerMock = require('./mocks/server')
const User = include('models/user')
const userFake = require('./factories/user')
const REQUEST_SUCCESS_CREATED = 201

describe('User Tests', () => {
  let request

  beforeAll(async () => {
    request = await ServerMock()
    await User.deleteMany({})
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('should register user - POST /user/register', async () => {
    const fakeUser = userFake()
    await request
      .post('/user/register')
      .send(fakeUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS_CREATED)

    const user = await User.findOne({ email: fakeUser.email })

    expect(user.nome).toBe(fakeUser.nome)
    expect(user.email).toBe(fakeUser.email)
    expect(user.password).toEqual(expect.anything())
  })

  afterAll(async () => {
    await User.deleteMany({})
  })
})
