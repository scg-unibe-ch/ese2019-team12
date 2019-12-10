import 'dotenv/config'
import request from 'request'

const endpoint = process.env.HOST + '/users'

describe('User Controller: GET', () => {
  it('should return 200', async (done) => {
    await request.get(endpoint)
      .on('response', (response) => {
        expect(response.statusCode).toEqual(200)
        done()
      })
  })

  it('should return json', async (done) => {
    await request.get(endpoint)
      .on('response', (response) => {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
  })

  it('should return an array of users', async (done) => {
    // Test users have been inserted with the test-users.js seeder from src/seeders
    await request.get(endpoint, { method: 'GET' }, function (error, response, body) {
      const json = JSON.parse(body)

      expect(json.length).toBeGreaterThanOrEqual(2) // There are five test users given from start of which 3 will get deleted
      expect(json[0].username).toEqual('admin')
      expect(json[1].username).toEqual('user')
      expect(body).toContain('username')
      expect(body).toContain('email')
      expect(body).toContain('firstname')
      expect(body).toContain('lastname')
      expect(body).toContain('bio')
      expect(body).toContain('role')
      expect(body).toContain('image')

      done()
    })
  })
  it('should return a specific user if id is appended', async (done) => {
    await request.get(endpoint + '/1', { method: 'GET' },
      function (error, response, body) {
        const json = JSON.parse(body)

        expect(json.username).toEqual('admin')
        expect(json.email).toContain('admin@test.ch')
        expect(json.firstname).toEqual('Admin')
        expect(json.lastname).toEqual('Johnson')
        expect(json.bio).toEqual('Born to administrate')
        expect(json.role).toEqual('Admin')
        expect(json.image).toEqual(null)

        done()
      }
    )
  })
  it('should return \'not found\' for invalid user id', async (done) => {
    await request(endpoint + '/-1', { method: 'GET' },
      function (error, response, body) {
        expect(body).toContain('not found')
        done()
      }
    )
  })
})
