import { Router } from 'express'
import { Sequelize } from 'sequelize'
import { upload } from '../helpers/upload.helper'
import 'dotenv/config'
import { sendNotFoundError, sendInternalError, sendForbiddenError, handleSequelizeErrors } from '../helpers/error.helper'
import { getUser, deleteUser, updateUser } from '../helpers/user.helper'
import * as path from 'path'

const Op = Sequelize.Op

const router = Router()

// Only allow admins to call /users/
// Allow not authenticated Users to create an account and to view profile pages

router.get('/', async (req, res) => {
  const User = getUser(req)
  const users = await User.findAll()
  res.send(users)
})

router.get('/:userId', async (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    const User = getUser(req)
    await User.findByPk(req.params.userId).then(user => {
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
