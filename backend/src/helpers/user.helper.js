import { sendNotFoundError, sendInternalError } from './error.helper'

export function getUser (req) {
  return req.context.models.User
}

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

export function userAuthFilter (req) {
  return req.method === 'OPTIONS' || req.method === 'POST' ||
    (req.method === 'GET' && req.originalUrl !== '/users/')
}
