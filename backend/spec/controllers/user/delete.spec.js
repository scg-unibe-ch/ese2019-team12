import 'dotenv/config';
import request from 'request';
import { getToken } from '../../helpers/session.helper';

const endpoint = process.env.HOST + '/users';

const user_to_delete_by_admin = endpoint + '/3'; 
const user_to_delete_by_himself = endpoint + '/4';
const bob_wont_be_deleted = endpoint + '/5';
const admin_to_delete = endpoint + '/6';

describe('User Controller: DELETE', () => {

  it('should check whether user is authenticated', async (done) => {
    await request(user_to_delete_by_admin, { method: 'DELETE' },
      function(error, response, body) {
        expect(response.statusCode).toBe(401);
        expect(JSON.parse(body)['AuthorizationError']).toBe('Invalid token');
        done();
      });
  });

  it('should not allow user to delete foreign account', async (done) => {
    await getToken('user', (error, response, body) => {
      let auth = 'Bearer ' + body.token;
      request(bob_wont_be_deleted, {
        method: 'DELETE',
        headers: {
          'Authorization': auth
        }
      }, function(error, response, body) {
        expect(response.statusCode).toBe(403);
        expect(JSON.parse(body)['AuthorizationError']).toBe('Insufficient privileges');
        done();
        }
      );
    });
  });

  it('should allow user to delete own account', async (done) => {
    await getToken('temp_user_2', (error, response, body) => {
      let auth = 'Bearer ' + body.token;
      request(user_to_delete_by_himself, {
        method: 'DELETE',
        headers: {
          'Authorization': auth
        }
      }, function(error, response, body) {
          expect(response.statusCode).toBe(204);
          done();
        }
      );
    });
  });

  it('should allow admin to delete user accounts', async (done) => {
    await getToken('admin', (error, response, body) => {
      let auth = 'Bearer ' + body.token;
      request(user_to_delete_by_admin, {
        method: 'DELETE',
        headers: {
          'Authorization': auth
        }
      }, function(error, response, body) {
          expect(response.statusCode).toBe(204);
          done();
        }
      );
    });
  });

  it('should allow admin to delete admin accounts', async (done) => {
    await getToken('admin', (error, response, body) => {
      let auth = 'Bearer ' + body.token;
      request(admin_to_delete, {
        method: 'DELETE',
        headers: {
          'Authorization': auth
        }
      }, function(error, response, body) {
          expect(response.statusCode).toBe(204);
          done();
        }
      );
    });
  });

});
