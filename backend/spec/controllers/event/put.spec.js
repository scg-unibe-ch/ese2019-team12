import 'dotenv/config'
import request from 'request'
import { getToken } from '../../helpers/session.helper'

const endpoint = process.env.HOST + '/events'

const user_event = endpoint + '/6'

describe('Event Controller: PUT', () => {
  it('should not allow unauthenticated requests', async (done) => {
    await request(endpoint, { method: 'PUT' },
      function (err, res, body) {
        expect(res.statusCode).toBe(401)
        expect(JSON.parse(body).AuthorizationError).toBe('Invalid token')
        done()
      })
  })

  it('should allow owner to update event', async (done) => {
    await getToken('user', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_event, {
        method: 'PUT',
        headers: {
          Authorization: auth
        },
        json: {
          name: 'updated'
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(202)
        expect(body.name).toEqual('updated')
        done()
      })
    })
  })

  it('should not allow user to update foreign event', async (done) => {
    await getToken('bob', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_event, {
        method: 'PUT',
        headers: {
          Authorization: auth
        },
        json: {
          name: 'wolfsblood'
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(403)
        expect(body.AuthorizationError).toBe('Insufficient privileges')
        done()
      })
    })
  })

  it('should not allow admin to update foreign event', async (done) => {
    await getToken('admin', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_event, {
        method: 'PUT',
        headers: {
          Authorization: auth
        },
        json: {
          name: 'wolfsblood'
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(403)
        expect(body.AuthorizationError).toBe('Insufficient privileges')
        done()
      })
    })
  })
})
