import { Router } from 'express'
import { Sequelize } from 'sequelize'
import { upload } from '../helpers/upload.helper'
import 'dotenv/config'
import { sendNotFoundError, sendInternalError, sendForbiddenError, handleSequelizeErrors } from '../helpers/error.helper'
import { getUser, deleteUser, updateUser } from '../helpers/user.helper'
import * as path from 'path'

/**
 * Express controller providing user related routes
 * @module controllers/user
 * @requires express
 * @requires sequelize
 */

/**
 * Express controller
 * @type {object}
 * @const
 * @namespace userController
 */
const router = Router()

/**
 * Sequelize Operation Tag used to perform amongst other things 'and' and 'or' queries.
 * @type {object}
 * @const
 */
const Op = Sequelize.Op

/**
 * Route serving all users.
 * @name get/
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', async (req, res) => {
  const User = getUser(req)
  const users = await User.findAll()
  res.send(users)
})

/**
 * Route serving a specifi user.
 * @name get/:id
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', async (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    const User = getUser(req)
    await User.findByPk(req.params.id).then(user => {
      if (!user) {
        sendNotFoundError(res)
      } else {
        res.send(user)
      }
    }).catch(err => {
      sendInternalError(res, err)
    })
  }
  next()
})

/**
 * Route creating an user.
 * @name post/
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', async (req, res) => {
  const User = getUser(req)
  var userData = req.body

  // Every User will at first be a normal User
  // - only Admins will be able to assign new admins
  userData.role = 'User'

  await User.create(userData).then(user => {
    res.statusCode = 201
    res.send(user)
  }).catch(err => {
    res.send(handleSequelizeErrors(res, err))
  })
})

/**
 * Route serving the profile picture.
 * @name get/:id/image
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id/image', async (req, res) => {
  const User = getUser(req)
  const imageRoot = path.join(__dirname, process.env.IMAGE_DIR)
  var options = {
    root: imageRoot,
    dotfiles: 'deny'
  }
  User.findByPk(req.params.id).then(user => {
    if (user.image) {
      res.sendFile(user.image, options)
    } else {
      res.send()
    }
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route setting the profile picture.
 * @name get/:id/image
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/:id/image', upload.single('user_image'), async (req, res) => {
  const User = getUser(req)
  User.findByPk(req.params.id).then((user) => {
    user.image = req.file.filename
    user.save().then(() => {
      res.send()
    }).catch(err => {
      sendInternalError(res, err)
    })
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route updating the user.
 * @name put/:id
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/:id', async (req, res) => {
  const User = getUser(req)
  if (req.user.sub !== req.params.id) {
    User.findByPk(req.user.sub).then(currentUser => {
      if (currentUser.isAdmin()) {
        updateUser(req, res)
      } else {
        sendForbiddenError(res)
      }
    }).catch(err => {
      sendInternalError(res, err)
    })
  } else {
    updateUser(req, res)
  }
})

/**
 * Route deleting the user.
 * @name delete/:id
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete('/:id', async (req, res) => {
  const User = getUser(req)
  if (req.user.sub !== req.params.id) {
    await User.findByPk(req.user.sub).then(user => {
      if (user.isAdmin()) {
        deleteUser(req, res)
      } else {
        sendForbiddenError(res)
      }
    }).catch(err => {
      sendInternalError(res, err)
    })
  } else {
    deleteUser(req, res)
  }
})

/**
 * Route searching for a user by login (username and email).
 * @name get/search
 * @function
 * @memberof module:controllers/user~userController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/search', async (req, res) => {
  const User = getUser(req)
  let criteria = ''
  if (req.query.username !== undefined) {
    criteria = req.query.username
  } else if (req.query.email !== undefined) {
    criteria = req.query.email
  } else {
    res.send('Please submit a proper search')
  }
  await User.findOne({
    where: {
      [Op.or]: [{ username: criteria }, { email: criteria }]
    }
  }).then((user) => {
    res.statusCode = 200
    if (user !== null) {
      res.send({ isUsed: true })
    } else {
      res.send({ isUsed: false })
    }
  }).catch((err) => {
    console.log(err)
  })
})

export default router
