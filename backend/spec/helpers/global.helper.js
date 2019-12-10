import models, { sequelize } from '../../src/models'
import createMockUsers from '../mocks/users'
import createMockServices from '../mocks/services'
import createMockTags from '../mocks/tags'
import createMockEvents from '../mocks/events'

var server
beforeAll(async () => {
  await sequelize.sync().then(async () => {
    await Promise.all([
      createMockUsers(models.User),
      createMockServices(models.Service),
      createMockTags(models.Tag),
      createMockEvents(models.Event)
    ]).then(() => { console.log('Mocks inserted in DB') })
      .catch(err => { console.log(err) })
  })

  server = require('../../src/index')
  await server.on('ready', () => {
    console.log('Server ready')
  })
})
afterAll(() => {
  server.close()
})
