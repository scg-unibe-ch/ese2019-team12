import 'dotenv/config'
import request from 'request'
import { getToken } from '../../helpers/session.helper'

const endpoint = process.env.HOST + '/events'

describe('Event Controller: POST', () => {
  it('should not allow unauthenticated requests', async (done) => {
    await request(endpoint, { method: 'POST' },
      function (error, response, body) {
        expect(response.statusCode).toBe(401)
        expect(JSON.parse(body).AuthorizationError).toBe('Invalid token')
        done()
      })
  })

  it('should create a new Event', async (done) => {
    await getToken('user', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(endpoint, {
        method: 'POST',
        headers: { Authorization: auth },
        json: {
          name: 'new event',
          description: 'new description',
          date: '2011-01-01'
        }
      }, (err, res, body) => {
        expect(body.name).toEqual('new event')
        expect(body.description).toEqual('new description')
        expect(body.date).toContain('2011-01-01')
        done()
      })
    })
  })
})
