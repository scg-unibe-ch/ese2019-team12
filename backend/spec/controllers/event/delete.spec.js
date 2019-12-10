import 'dotenv/config'
import request from 'request'
import { getToken } from '../../helpers/session.helper'

const endpoint = process.env.HOST + '/events'

const user_dont_delete_event_1 = endpoint + '/3'
const user_dont_delete_event_2 = endpoint + '/4'
const user_do_delete_event = endpoint + '/5'

describe('Event Controller: DELETE', () => {
  it('should not allow unauthenticated requests', async (done) => {
    await request(user_dont_delete_event_1, { method: 'DELETE' },
      function (error, response, body) {
        expect(response.statusCode).toBe(401)
        expect(JSON.parse(body).AuthorizationError).toBe('Invalid token')
        done()
      })
  })

  it('should not allow user to delete foreign event', async (done) => {
    await getToken('bob', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_dont_delete_event_1, {
        method: 'DELETE',
        headers: {
          Authorization: auth
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(403)
        expect(JSON.parse(body).AuthorizationError).toBe('Insufficient privileges')
        done()
      })
    })
  })

  it('should not allow admin to delete foreign event', async (done) => {
    await getToken('admin', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_dont_delete_event_2, {
        method: 'DELETE',
        headers: {
          Authorization: auth
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(403)
        expect(JSON.parse(body).AuthorizationError).toBe('Insufficient privileges')
        done()
      })
    })
  })

  it('should allow owner to delete his event', async (done) => {
    await getToken('user', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_do_delete_event, {
        method: 'DELETE',
        headers: {
          Authorization: auth
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(204)
        done()
      })
    })
  })
})
