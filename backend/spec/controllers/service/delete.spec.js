import 'dotenv/config'
import request from 'request'
import { getToken } from '../../helpers/session.helper'

const endpoint = process.env.HOST + '/services'

const service_to_delete_by_owner = endpoint + '/4'
const service_to_delete_by_admin = endpoint + '/5'
const bobs_service = endpoint + '/6'

describe('Service Controller: DELETE', () => {
  it('should not allow unauthenticated requests', async (done) => {
    await request(bobs_service, { method: 'DELETE' },
      function (error, response, body) {
        expect(response.statusCode).toBe(401)
        expect(JSON.parse(body).AuthorizationError).toBe('Invalid token')
        done()
      })
  })

  it('should not allow user to delete foreign service', async (done) => {
    await getToken('user', (error, response, body) => {
      const auth = 'Bearer ' + body.token
      request(bobs_service, {
        method: 'DELETE',
        headers: {
          Authorization: auth
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(403)
        expect(JSON.parse(body).AuthorizationError).toBe('Insufficient privileges')
        done()
      }
      )
    })
  })

  it('should allow owner to delete service', async (done) => {
    await getToken('user', (error, response, body) => {
      const auth = 'Bearer ' + body.token
      request(service_to_delete_by_owner, {
        method: 'DELETE',
        headers: {
          Authorization: auth
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(204)
        request(service_to_delete_by_owner, { method: 'GET' }, function (err, res, body) {
          expect(body).toContain('not found')
          done()
        })
      })
    })
  })

  it('should allow admin to delete service', async (done) => {
    await getToken('admin', (error, response, body) => {
      const auth = 'Bearer ' + body.token
      request(service_to_delete_by_admin, {
        method: 'DELETE',
        headers: {
          Authorization: auth
        }
      }, function (error, response, body) {
        expect(response.statusCode).toBe(204)
        request(service_to_delete_by_admin, { method: 'GET' }, function (err, res, body) {
          expect(body).toContain('not found')
          done()
        })
      })
    })
  })
})
