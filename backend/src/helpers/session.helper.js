import 'dotenv/config'
import * as jwt from 'jsonwebtoken'
import * as jwtExpress from 'express-jwt'

/**
 * Session helper functions
 *
 * @module helper/session
 * @requires jsonwebtoken
 * @requires express-jwt
 * @requires 'dotenv/config'
 */

/**
 * Generates a json web token to use as session token
 *
 * @function
 * @memberof module:helper/session
 * @params  {string} userId
 * @returns {object} jwt
 */
export function getSessionToken (userId) {
  const token = jwt.sign({}, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '168h',
    subject: userId
  })
  const expiresAt = Date.now() + 1000 * (60 * 60 * 168)
  return { token, expiresAt }
}

/**
 * Extracts jwt from headers
 *
 * @function
 * @memberof module:helper/session
 * @params  {object} req    -   Express request
 * @returns {string} jwt    -   returns the token or null if no token present
 */
function getTokenFromHeaderOrQuery (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

/**
 * Middleware to check authentication
 *
 * @const
 * @memberof module:helper/session
 */
export const checkIfAuthenticated = jwtExpress.default({
  secret: process.env.SECRET,
  getToken: getTokenFromHeaderOrQuery
})

/**
 * Middleware to handle authentication errors
 *
 * @const
 * @memberof module:helper/session
 *
 * @params  {object}   err    -   Error which occured
 * @params  {object}   req    -   Express request
 * @params  {object}   res    -   Express response
 * @params  {function} next   -   Express function
 */
export const handleAuthError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ AuthorizationError: 'Invalid token' })
  }
  next()
}
