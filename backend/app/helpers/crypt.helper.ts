import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

const cert_priv = fs.readFileSync(path.join(process.cwd() + '/app/.conf', 'rsa-private-key.pem'));

export function getSessionToken(userId: string) {
  return jwt.sign({}, cert_priv, {
    algorithm: 'RS256',
    expiresIn: 120,
    subject: userId
  });
}
