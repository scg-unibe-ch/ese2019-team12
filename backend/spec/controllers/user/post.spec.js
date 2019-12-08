import 'dotenv/config';
import request from 'request';

const endpoint = process.env.HOST + '/users';

describe('POST', () => {

  it('should create a user', async (done) => {
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      json: {
        username: 'test',
        email: 'post1@test.ch',
        firstname: 'Hans',
        lastname: 'Peter',
        bio: 'NTR',
        password: 'password'
      }
    }, function (error, response, body) { 
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.statusCode).toEqual(201);
      expect(body['id']).toBeDefined();
      expect(body["username"]).toEqual('test');
      expect(body["email"]).toEqual('post1@test.ch');
      expect(body["firstname"]).toEqual('Hans');
      expect(body["lastname"]).toEqual('Peter');
      expect(body["bio"]).toEqual('NTR');
      done();
    });
  });

  it('should not allow incorrect email-addresses', async (done) =>{
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      json: {
        username: 'post2',
        email: 'notanemailaddress',
        firstname: 'Hans',
        lastname: 'Peter',
        bio: 'NTR',
        password: 'password'
      }
    }, function (error, response, body) {
      expect(body['Validation error'][0]).toEqual('Validation isEmail on email failed');
      done();
    });
  });

  it('should not allow duplicate usernames', async (done) => {
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      json: {
        username: 'post3',
        email: 'post31@test.ch',
        firstname: 'Hans',
        lastname: 'Peter',
        bio: 'NTR',
        password: 'password'
      }
    });
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      json: {
        username: 'post3',
        email: 'post32@test.ch',
        firstname: 'Hans',
        lastname: 'Peter',
        bio: 'NTR',
        password: 'password'
      }
    }, function (error, response, body) {
      expect(Object.keys(body)).toContain('unique violation');
      expect(body['unique violation'][0]).toEqual('username must be unique');
      done();
    });
  });

  it('should not allow duplicate email addresses', async (done) => {
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      json: {
        username: 'post41',
        email: 'post4@test.ch',
        firstname: 'Hans',
        lastname: 'Peter',
        bio: 'NTR',
        password: 'password'
      }
    }, async function() {
      await request(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        json: {
          username: 'post41',
          email: 'post4@test.ch',
          firstname: 'Hans',
          lastname: 'Peter',
          bio: 'NTR',
          password: 'password'
        }
      }, function (error, response, body) {
        expect(Object.keys(body)).toContain('unique violation');
        expect(body['unique violation'][0]).toEqual('email must be unique');
        done();
      });
    });
  });
});
