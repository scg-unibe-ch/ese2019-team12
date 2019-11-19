import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
const expressJwt = require('express-jwt');

const cert_priv = fs.readFileSync(path.join(process.cwd(), 'rsa-private-key.pem'));
export const cert_pub = fs.readFileSync(path.join(process.cwd(), 'rsa-public-key.pem'));

export function getSessionToken(userId: string) {
  return jwt.sign({}, cert_priv, {
    algorithm: 'RS256',
    expiresIn: 604800,
    subject: userId
  });
}
