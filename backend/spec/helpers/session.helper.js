import 'dotenv/config';
import request from 'request';

const login_route = process.env.HOST + '/session/login';

export async function getToken(username, cb) {
  await request(login_route, { 
    method: 'POST',
    json: {
      login: username,
      password: 'hello'
    }
  }, cb);
}
