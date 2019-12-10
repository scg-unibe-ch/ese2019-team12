import { Router } from 'express'
import { Sequelize } from 'sequelize'
import { checkPassword } from '../helpers/crypt.helper'
import { getSessionToken } from '../helpers/session.helper'
import * as path from 'path'

/**
 * Express controller user authentication service
 * @module controllers/session
 * @requires express
 * @requires sequelize
 */

/**
 * Express controller
 * @type {object}
 * @const
 * @namespace sessionController
 */
const router = Router()

/*
 * Sequelize Operation Tag used to perform amongst other things 'and' and 'or' queries.
 * @type {object}
 * @memberof module:controllers/service
 * @const
 */
const Op = Sequelize.Op

/**
 * Route which handles the login and provides the JWT to legitimate users
 * @name login/
 * @function
 * @memberof module:controllers/session~sessionController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/login', async (req, res) => {
  const login = req.body.login
  const password = req.body.password
  const User = req.context.models.User

  await User.findOne({
    where: {
      [Op.or]: [{ username: login }, { email: login }]
    }
  }).then(user => {
    if (user && user.id && checkPassword(password, user.password(), user.salt())) {
      const message = getSessionToken(user.id.toString())
      message.user = user
      res.statusCode = 200
      res.send(message)
    } else {
      res.statusCode = 401
      res.send('login failed')
    }
  })
})

export default router
