import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const RSA_PRIVATE_KEY = fs.readFileSync('../.conf/id_rsa');

export function getSessionToken(userId: string) {
  return jwt.sign({}, RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: 120,
    subject: userId
  });
}
