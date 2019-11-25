import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
var jwtExpress = require('express-jwt');

export function getSessionToken(userId) {
  let token = jwt.sign({}, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '168h',
    subject: userId
  });
  let expiresAt = Date.now() + 1000 * (60 * 60 * 168)
  return { token, expiresAt };
}
function getTokenFromHeaderOrQuery(req) {
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  var res = req.res;
  res.status = 401;
  res.send({});
}
export const checkIfAuthenticated = jwtExpress({
  secret: process.env.SECRET,
  getToken: getTokenFromHeaderOrQuery
});
