import { Request } from 'express';
const expressJwt = require('express-jwt');

import { getSessionToken, cert_pub } from '../helpers/crypt.helper';
import { User } from '../models/user.model';

const regEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/');
const regSessionId = new RegExp('SESSIONID=');

export async function getTokenOrNull(login: string, password: string){
  let token = null;
  let column = '';
  column = regEmail.test(login) ? 'email' : 'username';
  searchByColumn(column, login).then(instance => {
    if(instance){
      const id = instance.toSimplification().id;
      token = getSessionToken(String(id));
    }
  });
  return token;
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
async function searchByColumn(column: string, login: string){
  return await User.findOne({ where: { 'email': login }});
}
