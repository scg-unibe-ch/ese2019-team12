import { Router } from 'express'
import { Sequelize } from 'sequelize'
import { upload } from '../helpers/upload.helper'
import 'dotenv/config'
import { sendNotFoundError, sendInternalError, sendForbiddenError, handleSequelizeErrors } from '../helpers/error.helper'
var path = require('path')

const Op = Sequelize.Op

const router = Router()

// Only allow admins to call /users/
// Allow not authenticated Users to create an account and to view profile pages
export const userAuthFilter = (req) => {
  return req.method === 'OPTIONS' || req.method === 'POST' ||
    (req.method === 'GET' && req.originalUrl != '/users/')
}

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
  const image_root = path.join(__dirname, process.env.IMAGE_DIR)
  var options = {
    root: image_root,
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
        updateUser(User, req, res)
      } else {
        sendForbiddenError(res)
      }
    }).catch(err => {
      sendInternalError(res, err)
    })
  } else {
    updateUser(User, req, res)
  }
})

router.delete('/:id', async (req, res) => {
  const User = getUser(req)
  if (req.user.sub !== req.params.id) {
    await User.findByPk(req.user.sub).then(user => {
      if (user.isAdmin()) {
        deleteUser(req.params.id, User, res)
      } else {
        sendForbiddenError(res)
      }
    }).catch(err => {
      sendInternalError(res, err)
    })
  } else {
    deleteUser(req.params.id, User, res)
  }
})

function updateUser (User, req, res) {
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
function deleteUser (id, User, res) {
  User.findByPk(id).then(user => {
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

function getUser (req) {
  return req.context.models.User
}

export default router
