import * as crypto from 'crypto'
export function generateSalt () {
  return crypto.randomBytes(16).toString('base64')
}
export function encryptPassword (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}
export function checkPassword (plainText, password, salt) {
  return encryptPassword(String(plainText), String(salt)) === String(password)
}
