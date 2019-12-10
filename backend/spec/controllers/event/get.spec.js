import 'dotenv/config'
import request from 'request'
import { getToken } from '../../helpers/session.helper'

const endpoint = process.env.HOST + '/events'

const user_first_event = endpoint + '/1'
const user_second_event = endpoint + '/2'

const my_events = endpoint + '/user/0'

describe('Event Controller: GET', () => {
  it('should not allow unauthenticated requests', async (done) => {
    await request(endpoint, { method: 'GET' },
      (err, res, body) => {
        expect(res.statusCode).toBe(401)
        expect(JSON.parse(body).AuthorizationError).toBe('Invalid token')
        done()
      })
  })

  it('should return 200', async (done) => {
    await getToken('admin', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(endpoint, {
        method: 'GET',
        headers: { Authorization: auth }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(200)
        done()
      })
    })
  })

  it('should return json', async (done) => {
    await getToken('admin', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(endpoint, {
        method: 'GET',
        headers: { Authorization: auth }
      }, (err, res, body) => {
        expect(res.headers['content-type']).toContain('application/json')
        done()
      })
    })
  })

  it('should return nothing for /', async (done) => {
    await getToken('admin', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(endpoint, {
        method: 'GET',
        headers: { Authorization: auth }
      }, (err, res, body) => {
        expect(JSON.parse(body)).toEqual({})
        done()
      })
    })
  })

  it('should return the owners events', async (done) => {
    await getToken('user', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(my_events, {
        method: 'GET',
        headers: { Authorization: auth }
      }, (err, res, body) => {
        const json = JSON.parse(body)

        expect(json[0].name).toBe('event0')
        expect(json[1].name).toBe('projectX')

        expect(body).toContain('id')
        expect(body).toContain('userId')
        expect(body).toContain('name')
        expect(body).toContain('description')
        expect(body).toContain('date')

        done()
      })
    })
  })

  it('should return a specific event of the owner', async (done) => {
    await getToken('user', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_second_event, {
        method: 'GET',
        headers: { Authorization: auth }
      }, (err, res, body) => {
        const json = JSON.parse(body)

        expect(json.name).toEqual('projectX')
        expect(json.description).toEqual('a boring event')
        expect(json.date).toContain('2019-02-12')

        done()
      })
    })
  })

  it('user can\'t see another user\'s event', async (done) => {
    await getToken('bob', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_first_event, {
        method: 'GET',
        headers: { Authorization: auth }
      }, (err, res, body) => {
        expect(JSON.parse(body).message).toEqual('not found')
        done()
      })
    })
  })

  it('admins can\'t see another user\'s event', async (done) => {
    await getToken('admin', (err, res, body) => {
      const auth = 'Bearer ' + body.token
      request(user_first_event, {
        method: 'GET',
        headers: { Authorization: auth }
      }, (err, res, body) => {
        expect(JSON.parse(body).message).toEqual('not found')
        done()
      })
    })
  })
})
