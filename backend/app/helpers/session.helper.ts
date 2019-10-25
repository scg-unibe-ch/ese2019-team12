import { Request } from 'express';
const expressJwt = require('express-jwt');

import { getSessionToken, cert_pub } from '../helpers/crypt.helper';
import { User } from '../models/user.model';

const regEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/');
const regSessionId = new RegExp('SESSIONID=');

export async function getUserDataOrNull(login: string, password: string){
  let data = { user: {}, token: ""};
  let column = '';
  await User.findOne({ where: { 'email': login }}).then(instance => {
    if(instance){
      let userData = instance.toSimplification();
      let userToken = getSessionToken(String(userData.id));
      data['user'] = userData;
      data['token'] = userToken;
    }
  });
  return data;
}
export const checkIfAuthenticated = expressJwt({
  secret: cert_pub,
  getToken: extractToken
});
function extractToken(req: Request){
  let cookies = req.headers.cookie;
  if(cookies){
    for(let cookie of cookies.split(';')) {
      if(regSessionId.test(cookie)){
        return cookie.split('=')[1];
      }
    }
  }
}
