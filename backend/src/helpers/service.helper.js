import { sendInternalError } from '../helpers/error.helper'
import { updateTags } from '../helpers/tag.helper'

export function getService (req) {
  return req.context.models.Service
}

export function jsonFromServices (services) {
  const res = []
  services.forEach((service) => {
    res.push(service.simplified())
  })
  return res
}

export function serviceAuthFilter (req) {
  return req.method === 'OPTIONS' || req.method === 'GET'
}

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

export function isAllowedWrite (user, service) {
  return service.userId === user.id || user.isAdmin()
}

export function hasServices (req) {
  return req.body.services !== undefined
}
