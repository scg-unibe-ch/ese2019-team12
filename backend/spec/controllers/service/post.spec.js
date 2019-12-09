import 'dotenv/config';
import request from 'request';
import { getToken } from '../../helpers/session.helper';

const endpoint = process.env.HOST + '/services';

describe('Service Controller: POST', () => {

  it('should not allow unauthenticated requests', async (done) => {
    await request(endpoint, { method: 'POST' },
      function(error, response, body) {
        expect(response.statusCode).toBe(401);
        expect(JSON.parse(body)['AuthorizationError']).toBe('Invalid token');
        done();
      });
  });

  it('should create a new service', async (done) => {
    await getToken('user', (err, res, body) => {
      let auth = 'Bearer ' + body.token;
      request(endpoint, {
        method: 'POST',
        headers: { 'Authorization': auth },
        json: {
          title: 'service101',
          description: 'a new service',
          price: '5000000000000000000'
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(201);
        //expect(body.userId).toEqual('2');
        //expect(body.title).toEqual('service101');
        //expect(body.description).toEqual('a new service');
        //expect(body.price).toEqual('5000000000000000000');
        done();
      });
    });
  });

  it('should create a new service with tags', async (done) => {
    await getToken('user', (err, res, body) => {
      let auth = 'Bearer ' + body.token;
      request(endpoint, {
        method: 'POST',
        headers: { 'Authorization': auth },
        json: {
          title: 'service102',
          description: 'a second new service',
          price: '5000000000000000000',
          tags: [ 'tag1', 'tag2' ]
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(201);
        expect(body.userId).toEqual('2');
        expect(body.title).toEqual('service102');
        expect(body.description).toEqual('a second new service');
        expect(body.price).toEqual('5000000000000000000');
        expect(body.tags).toEqual(['tag1', 'tag2']);
        done();
      });
    });
  });

});
