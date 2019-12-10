import { sendInternalError } from '../helpers/error.helper'
import { updateTags } from '../helpers/tag.helper'

/**
 * Service related helper functions
 *
 * @module helper/service
 */

/**
 * Extract Service from req.context.models
 *
 * @function
 * @memberof module:helper/service
 * @param   {object} req   -   Express request
 * @returns {Object} Service
 */
export function getService (req) {
  return req.context.models.Service
}

/**
 * Create a json from a list of services
 *
 * @function
 * @memberof module:helper/service
 * @param   {Service[]} services    - list of services
 * @returns {Object}    Service     - JSON of services
 */
export function jsonFromServices (services) {
  const res = []
  services.forEach((service) => {
    res.push(service.simplified())
  })
  return res
}

/**
 * Requests that pass don't have to authenticate
 *
 * @function
 * @memberof module:helper/service
 * @param   {object} req   -    Express request
 */
export function serviceAuthFilter (req) {
  return req.method === 'OPTIONS' || req.method === 'GET'
}

/**
 * Update given Service
 *
 * @function
 * @memberof module:helper/service
 * @param   {Service}   service -   service
 * @param   {object}    data    -   Data with which to update the service
 * @param   {object}    req     -   Express request
 * @param   {object}    res     -   Express response
 */
export function updateService (service, data, req, res) {
  const keys = Object.keys(data)

  keys.forEach(key => {
    if (service[key] !== undefined && key !== 'tags' &&
      key !== 'id' && key !== 'userId') {
      service[key] = data[key]
    }
  })

  if (data.tags !== undefined) {
    updateTags(service, data.tags, req, res)
  } else {
    service.save().then((s) => {
      res.status(202).send(s)
    }).catch(err => {
      sendInternalError(res, err)
    })
  }
}

/**
 * Checks the write rights of the user
 *
 * @function
 * @memberof module:helper/service
 * @param   {User}      user
 * @param   {Service}   service
 * @returns {boolean}   isAllowed
 */
export function isAllowedWrite (user, service) {
  return service.userId === user.id || user.isAdmin()
}

/**
 * Checks whether the request has body.services set
 *
 * @function
 * @memberof module:helper/service
 * @param   {object} req   -   Express request
 * @returns {boolean} hasServices
 */
export function hasServices (req) {
  return req.body.services !== undefined
}
