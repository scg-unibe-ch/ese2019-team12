import * as crypto from 'crypto'

/**
 * Helper functions to provide crypt utilities
 *
 * @module helper/crypt
 * @requires crypto
 */

/**
 * Generates a 16-bit hash and encodes to base64
 *
 * @function
 * @memberof module:helper/crypt
 * @returns {string} hash
 */
export function generateSalt () {
  return crypto.randomBytes(16).toString('base64')
}

/**
 * Hashes and salts the given text
 *
 * @function
 * @memberof module:helper/crypt
 * @param   {string}    plainText   - text to salt and hash
 * @param   {string}    salt        - salt, encoded base64
 * @returns {string}    crypt       - salted and hashed text
 */
export function encryptPassword (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * Tests whether the given plaintext is the correct password
 *
 * @function
 * @memberof module:helper/crypt
 * @param   {string}    plainText   -   plaintext password?
 * @param   {string}    password    -   password to test again
 * @param   {string}    salt        -   salt to use in computation
 * @returns {boolean}
 */
export function checkPassword (plainText, password, salt) {
  return encryptPassword(String(plainText), String(salt)) === String(password)
}
