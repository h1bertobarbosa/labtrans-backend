const ServerMock = require('./mocks/server')
const Reserva = include('models/reserva')
const reservaFake = require('./factories/reserva')
const authUser = require('./mocks/authUser')
const User = include('models/user')
const Sala = include('models/sala')
const Local = include('models/local')
const REQUEST_SUCCESS = 200
const REQUEST_SUCCESS_CREATED = 201
const BAD_REQUEST = 400
describe('User Tests', () => {
  let request, token

  beforeAll(async () => {
    request = await ServerMock()
    token = await authUser()
    await Reserva.deleteMany({})
  })

  beforeEach(async () => {
    await Reserva.deleteMany({})
  })

  test('should register reserva - POST /reserva/register', async () => {
    const fakeReserva = await reservaFake()
    const res = await request
      .post('/reserva/register')
      .send(fakeReserva)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS_CREATED)

    const reserva = await Reserva.findById(res.body._id)

    expect(res.body._id).toEqual(String(reserva._id))
  })

  test('should list reserva - GET /reserva/list', async () => {
    const fakeReserva = reservaFake()
    const fakeReserva2 = reservaFake()
    await Reserva.create(fakeReserva)
    await Reserva.create(fakeReserva2)

    const res = await request
      .get('/reserva/list')
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS)

    expect(res.body).toHaveLength(2)
  })

  test('should edit reserva - GET /reserva/:id', async () => {
    const fakeReserva = reservaFake()
    const reservaCreated = await Reserva.create(fakeReserva)

    const res = await request
      .get(`/reserva/${reservaCreated._id}`)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS)

    expect(res.body._id).toEqual(String(reservaCreated._id))
  })

  test('should update reserva - PUT /reserva/:id', async () => {
    const fakeReserva = reservaFake()
    const reservaCreated = await Reserva.create(fakeReserva)

    const editedReserva = {
      responsavel: 'Humberto Barbosa',
      descricao: 'Reserva alterada'
    }
    const res = await request
      .put(`/reserva/${reservaCreated._id}`)
      .send(editedReserva)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS)

    const reservaUpdated = res.body

    expect(reservaUpdated.responsavel).toEqual(editedReserva.responsavel)
    expect(reservaUpdated.descricao).toEqual(editedReserva.descricao)
  })

  test('should throw error when id does not exist - PUT /reserva/:id', async () => {
    const fakeReserva = reservaFake()
    await Reserva.create(fakeReserva)

    const editedReserva = {
      responsavel: 'Humberto Barbosa',
      descricao: 'Reserva alterada'
    }

    const expectedError = {
      type: 'MongooseError',
      message: 'Reserva não encontrada'
    }

    await request
      .put(`/reserva/87`)
      .send(editedReserva)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(BAD_REQUEST, expectedError)
  })

  test('should delete reserva - DELETE /reserva/:id', async () => {
    const fakeReserva = reservaFake()
    const reservaCreated = await Reserva.create(fakeReserva)

    await request
      .delete(`/reserva/${reservaCreated._id}`)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(REQUEST_SUCCESS, { ok: true })

    const reserva = await Reserva.findById(reservaCreated._id)

    expect(reserva).toBeNull()
  })

  test('should throw error when id does not exist - DELETE /reserva/:id', async () => {
    const fakeReserva = reservaFake()
    await Reserva.create(fakeReserva)

    const expectedError = {
      type: 'MongooseError',
      message: 'Reserva não encontrada'
    }

    await request
      .delete(`/reserva/87`)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(BAD_REQUEST, expectedError)
  })

  test('should throw an error when there is a time clash in the same room and location - POST /reserva/register', async () => {
    let fakeReserva = reservaFake()
    fakeReserva.dataInicio = '2019-06-15 19:40'
    fakeReserva.dataFim = '2019-06-15 20:00'
    await Reserva.create(fakeReserva)

    const expectedError = {
      type: 'validation_error',
      message: 'Erro de validação',
      errors: [
        {
          message: 'Já existe uma sala reservada com esse horário',
          service: 'reserva_validation'
        }
      ]
    }

    await request
      .post(`/reserva/register`)
      .send(fakeReserva)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(BAD_REQUEST, expectedError)
  })

  test('should throw an error when there is a time clash in the same room and location - PUT /reserva/register', async () => {
    let fakeReserva = reservaFake()
    const reservaCreated = await Reserva.create(fakeReserva)

    fakeReserva.dataInicio = '2019-06-15 19:40'
    fakeReserva.dataFim = '2019-06-15 20:00'
    await Reserva.create(fakeReserva)

    const expectedError = {
      type: 'validation_error',
      message: 'Erro de validação',
      errors: [
        {
          message: 'Já existe uma sala reservada com esse horário',
          service: 'reserva_validation'
        }
      ]
    }

    await request
      .put(`/reserva/${reservaCreated._id}`)
      .send(fakeReserva)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(BAD_REQUEST, expectedError)
  })

  afterAll(async () => {
    await Reserva.deleteMany({})
    await User.deleteMany({})
    await Sala.deleteMany({})
    await Local.deleteMany({})
  })
})
