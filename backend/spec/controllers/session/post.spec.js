import 'dotenv/config';
import request from 'request';

const endpoint = process.env.HOST + '/session/login'

describe('Session Controller: POST', () => {

  it('should login for username and password', async (done) => {
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      json: {
        login: 'user',
        password: 'hello'
      }
    }, function (error, response, body) {
      expect(body.user).toBeDefined();
      expect(body.token).toBeDefined();
      done();
    });
  });

  it('should login for email and password', async (done) => {
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      json: {
        login: 'user@test.com',
        password: 'hello'
      }
    }, function (error, response, body) {
      expect(body.user).toBeDefined();
      expect(body.token).toBeDefined();
      done();
    });
  });

  it('should fail for wrong password', async (done) => {
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      json: {
        login: 'admin',
        password: 'whatwasthepassagain'
      }
    }, function (error, response, body) {
      expect(body).toBe('login failed');
      done();
    });
  });

  it('should fail for wrong username', async (done) => {
    await request(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      json: {
        login: 'nonsensename',
        password: 'hello'
      }
    }, function (error, response, body) {
      expect(body).toBe('login failed');
      done();
    });
  });

});
