import 'dotenv/config'
import express from 'express'

import models, { sequelize } from './models'
import controllers from './controllers'
import { userAuthFilter } from './helpers/user.helper'
import { serviceAuthFilter } from './helpers/service.helper'
import { checkIfAuthenticated, handleAuthError } from './helpers/session.helper'

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
app.use(express.json())
app.use(async (req, res, next) => {
  req.context = {
    models
  }
  next()
})

app.use('/users', checkIfAuthenticated.unless(userAuthFilter), controllers.user)
app.use('/services', checkIfAuthenticated.unless(serviceAuthFilter), controllers.service)
app.use('/events', checkIfAuthenticated, controllers.e)
app.use('/session', controllers.session)
app.use(handleAuthError)

var server = app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`)
})
sequelize.sync().then(() => {
  app.emit('ready')
})

module.exports = server
