/**
 *  The server file.
 *
 *  Web-Framework:  Express
 *  ORM:            Sequelize
 *  DB:             sqlite3
 *
 *  Controllers: User, Service, Event, Session
 */
import 'dotenv/config'
import express from 'express'

import models, { sequelize } from './models'
import controllers from './controllers'
import { userAuthFilter } from './helpers/user.helper'
import { serviceAuthFilter } from './helpers/service.helper'
import { checkIfAuthenticated, handleAuthError } from './helpers/session.helper'

const app = express()

/**
 * Express middleware: set CORS
 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

/**
 * Express middleware: use json bodyparser
 */
app.use(express.json())

/**
 * Express middleware: send models to controller via req.context
 */
app.use(async (req, res, next) => {
  req.context = { models }
  next()
})

/**
 * Express middlewares: controllers
 */
app.use('/users', checkIfAuthenticated.unless(userAuthFilter), controllers.user)
app.use('/services', checkIfAuthenticated.unless(serviceAuthFilter), controllers.service)
app.use('/events', checkIfAuthenticated, controllers.e)
app.use('/session', controllers.session)

/**
 * Express middleware: catch unauthenticated Error
 */
app.use(handleAuthError)

/**
 * Start the server on port defined in .env
 */
var server = app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`)
})

/**
 * Start ORM, connect to DB and emit event when done (used in order to run tests correctly)
 */
sequelize.sync().then(() => {
  app.emit('ready')
})

module.exports = server
