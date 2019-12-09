import 'dotenv/config';
import request from 'request';
import { getToken } from '../../helpers/session.helper';

const endpoint = process.env.HOST + '/services';

const user_service  = endpoint + '/3';
const admins_service = endpoint + '/1';

describe('Service Controller: PUT', () => {
  
  it('should not allow unauthenticated requests', async (done) => {
    await request(endpoint, { method: 'POST' },
      function(err, res, body) {
        expect(res.statusCode).toBe(401);
        expect(JSON.parse(body)['AuthorizationError']).toBe('Invalid token');
        done();
      });
  });

  it('should allow owner to update service', async (done) => {
    await getToken('user', (err, res, body) => {
      let auth = 'Bearer ' + body.token;
      request(user_service, {
        method: 'PUT',
        headers: {
          'Authorization': auth
        }
      }, (err, res, body) => {
        //console.log(body);
        done();
      });
    });
  });

  it('should not allow user to update other users services', async (done) => {
    await getToken('user', (err, res, body) => {
      let auth = 'Bearer ' + body.token;
      request(admins_service, {
        method: 'PUT',
        headers: {
          'Authorization': auth
        }
      }, function(err, res, body) {
        expect(res.statusCode).toBe(403);
        //expect(JSON.parse(body)['AuthorizationError']).toBe('Insufficient privileges');
        done();
        }
      );
    });
  });

  it('should allow admin to update services', async (done) => {
    await getToken('admin', (err, res, body) => {
      let auth = 'Bearer ' + body.token;
      request(user_service, {
        method: 'PUT',
        headers: {
          'Authorization': auth
        }
      }, (err, res, body) => {
        done();
      });
    });
  });

});
