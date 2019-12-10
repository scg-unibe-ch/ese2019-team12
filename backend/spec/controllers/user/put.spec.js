import 'dotenv/config'
import request from 'request'
import { getToken } from '../../helpers/session.helper'

const endpoint = process.env.HOST + '/users'

const bob_route = endpoint + '/5'
const admin_route = endpoint + '/1'

describe('User Controller: PUT', () => {
  it('should not allow unauthenticated requests', async (done) => {
    await request(endpoint, { method: 'PUT' },
      function (error, response, body) {
        expect(response.statusCode).toBe(401)
        expect(JSON.parse(body).AuthorizationError).toBe('Invalid token')
        done()
      })
  })

  it('should allow user to update his profile', async (done) => {
    await getToken('bob', (error, response, body) => {
      const auth = 'Bearer ' + body.token
      request(bob_route, {
        method: 'PUT',
        headers: {
          Authorization: auth
        },
        json: {
          firstname: 'Bobby'
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(200)
        expect(body.firstname).toBe('Bobby')
        done()
      }
      )
    })
  })

  it('should not allow user to update other profiles', async (done) => {
    await getToken('user', (error, response, body) => {
      const auth = 'Bearer ' + body.token
      request(bob_route, {
        method: 'PUT',
        headers: {
          Authorization: auth
        },
        json: {
          firstname: 'NotBobby'
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(403)
        expect(body.AuthorizationError).toBe('Insufficient privileges')
        done()
      }
      )
    })
  })

  it('should allow admin to update user profiles', async (done) => {
    await getToken('admin', (error, response, body) => {
      const auth = 'Bearer ' + body.token
      request(bob_route, {
        method: 'PUT',
        headers: {
          Authorization: auth
        },
        json: {
          firstname: 'Bleb'
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(200)
        expect(body.firstname).toBe('Bleb')
        done()
      }
      )
    })
  })
})
