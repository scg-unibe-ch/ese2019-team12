const crypto = require('crypto');
function generateSalt() {
  return crypto.randomBytes(16).toString('base64')
}
function encryptPassword(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}
function checkPassword(plainText, password, salt) {
  return encryptPassword(String(plainText), String(salt)) == String(password);
}
