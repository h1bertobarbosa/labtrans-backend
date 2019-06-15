const ServerMock = require('./mocks/server')
const User = include('models/user')
const userFake = require('./factories/user')
const { JWTVerify } = include('utils/auth')
const REQUEST_SUCCESS = 200
const BAD_REQUEST = 400

describe('User Tests', () => {
  let request

  beforeAll(async () => {
    request = await ServerMock()
    await User.deleteMany({})
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('should return an error when the user sends and wrong email - POST /authenticate', async () => {
    const fakeUser = userFake()
    await User.create(fakeUser)

    const postObject = {
      email: 'juvenaldasilva@yahoo.com.br',
      password: fakeUser.password
    }

    const expectedError = {
      type: 'validation_error',
      message: 'Erro de autenticação',
      errors: [
        {
          message: 'Email ou senha digitado esta errado ou usuário inexistente',
          service: 'auth_validation'
        }
      ]
    }

    await request
      .post('/authenticate')
      .send(postObject)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(BAD_REQUEST, expectedError)
  })

  test('should return an error when the user sends and wrong password - POST /authenticate', async () => {
    const fakeUser = userFake()
    await User.create(fakeUser)

    const postObject = {
      email: fakeUser.email,
      password: 'sdklasjaskljsdk'
    }

    const expectedError = {
      type: 'validation_error',
      message: 'Erro de autenticação',
      errors: [
        {
          message: 'Email ou senha digitado esta errado',
          service: 'auth_validation'
        }
      ]
    }

    await request
      .post('/authenticate')
      .send(postObject)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(BAD_REQUEST, expectedError)
  })

  test('must authenticate a registered user - POST /authenticate', async () => {
    const fakeUser = userFake()
    const createdUser = await User.create(fakeUser)

    const postObject = {
      email: fakeUser.email,
      password: fakeUser.password
    }

    const response = await request
      .post('/authenticate')
      .send(postObject)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS)

    const { token } = response.body
    const decoded = await JWTVerify(token)

    expect(token).toEqual(expect.anything())
    expect(decoded.data._id).toEqual(String(createdUser._id))
  })

  afterAll(async () => {
    await User.deleteMany({})
  })
})
