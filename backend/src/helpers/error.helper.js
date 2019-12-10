/**
 * Helper functions to provide error handling
 *
 * @module helper/error
 */

/**
 * Sends Error 404, not found.
 *
 * @function
 * @memberof module:helper/error
 * @param   {object} res    -   Express response
 */
export function sendNotFoundError (res) {
  res.statusCode = 404
  res.send({ message: 'not found' })
}

/**
 * Sends Error 500, internal Error and logs the error on the server side.
 *
 * @function
 * @memberof module:helper/error
 * @param   {object} res    -   Express response
 * @param   {object} err    -   Error
 */
export function sendInternalError (res, err) {
  console.log('Internal Error: ', err)
  res.statusCode = 500
  res.send()
}

/**
 * Sends Error 403, forbidden.
 *
 * @function
 * @memberof module:helper/error
 * @param   {object} res    -   Express response
 */
export function sendForbiddenError (res) {
  res.statusCode = 403
  res.send({ AuthorizationError: 'Insufficient privileges' })
}

/**
 * Sends 500, internal. Handles unanticipated Sequelize Errors and validation errors.
 *
 * @function
 * @memberof module:helper/error
 * @param   {object} res    -   Express response
 * @param   {object} err    -   Error
 */
export function handleSequelizeErrors (res, err) {
  const msg = {}
  err.errors.forEach(e => {
    const errorType = e.type

    if (errorType !== 'Validation error' && errorType !== 'unique violation') {
      console.log('Internal Error: ', e)
    }
    if (msg[e.type] === undefined) {
      msg[e.type] = []
    }
    msg[e.type].push(e.message)
  })
  res.status(500).send(msg)
}
