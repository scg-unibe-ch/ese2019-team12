import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const regSessionId = new RegExp('SESSIONID=');

export function getSessionToken(userId){
  return jwt.sign({}, process.env.SECRET, {
    algorithm: 'RS256',
    expiresIn: 604800,
    subject: userId
  });
}
export function extractSessionToken(req){
  let cookies = req.headers.cookie;
  if(cookies) {
    for(let cookie of cookies.split(';')) {
      if(regSessionId.test(cookie)) {
        return cookie.split('=')[1];
      }
    }
  }
}
