import { sendNotFoundError, sendInternalError } from './error.helper'

/**
 * User related helper functions
 *
 * @module helper/user
 */

/**
 * Extract User from req.context.models.
 *
 * @function
 * @memberof module:helper/service
 * @param   {object} req   -   Express request 
 * @returns {Object} User
 */
export function getUser (req) {
  return req.context.models.User
}

/**
 * Delete user specified in req.params.id if sufficient authorisation is given.
 * Send back an error message otherwise.
 *
 * @function
 * @memberof module:helper/service
 * @param   {object} req   -   Express request 
 * @param   {object} req   -   Express response 
 */
export function deleteUser (req, res) {
  const User = getUser(req)
  User.findByPk(req.params.id).then(user => {
    if (!user) {
      sendNotFoundError(res)
    }
    user.destroy()
    res.statusCode = 204
    res.send()
  }).catch(err => {
    sendInternalError(res, err)
  })
};

/**
 * Update user specified in req.params.id if sufficient authorisation is given.
 *
 * @function
 * @memberof module:helper/service
 * @param   {object} req   -   Express request 
 * @param   {object} req   -   Express response 
 */
export function updateUser (req, res) {
  const User = getUser(req)
  User.findByPk(req.params.id).then(user => {
    if (!user) {
      sendNotFoundError(res)
    }

    const keys = Object.keys(req.body) // Find all transmitted attributes
    keys.forEach((key) => { // For each attribute name,
      if (key !== 'id' && user[key] !== undefined) {
        user[key] = req.body[key]
      }
    })
    user.save().then(user => {
      res.statusCode = 200
      res.send(user)
    }).catch(err => {
      sendInternalError(res, err)
    })
  }).catch(err => {
    sendInternalError(res, err)
  })
}

/**
 * Allow requests of the type OPTIONS, POST and searches to pass.
 *
 * @function
 * @memberof module:helper/service
 * @param   {object} req   -    Express request
 */
export function userAuthFilter (req) {
  return req.method === 'OPTIONS' || req.method === 'POST' ||
    (req.method === 'GET' && req.originalUrl !== '/users/')
}
