const ServerMock = require('./mocks/server')
const User = include('models/user')
const userFake = require('./factories/user')
const { bcryptCompare } = include('utils/auth')
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

  test('should encrypt the password when saving the user - POST /user/register', async () => {
    let fakeUser = userFake()

    await request
      .post('/user/register')
      .send(fakeUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS_CREATED)

    const user = await User.findOne({ email: fakeUser.email })
    const comparePass = await bcryptCompare(fakeUser.password, user.password)
    expect(comparePass).toBeTruthy()
  })

  afterAll(async () => {
    await User.deleteMany({})
  })
})
