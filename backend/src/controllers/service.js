import { Router } from 'express'
import { upload } from '../helpers/upload.helper'
import 'dotenv/config'
import { sendNotFoundError, sendInternalError, sendForbiddenError } from '../helpers/error.helper'
import { getUser } from '../helpers/user.helper'
import { getService, updateService, jsonFromServices, isAllowedWrite } from '../helpers/service.helper'
import { getTag, findOrCreateTags } from '../helpers/tag.helper'
import * as path from 'path'

/**
 * Express controller providing user related routes
 * 
 * @module controllers/service
 * @requires express
 * @requires sequelize
 */

/**
 * Express controller
 *
 * @type {object}
 * @const
 * @namespace serviceController
 */
const router = Router()

/**
 * Route serving all events
 *
 * @name get/
 * @function
 * @memberof module:controllers/service~serviceController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', async (req, res) => {
  const Service = getService(req)
  const Tag = getTag(req)
  const User = getUser(req)
  Service.findAll(
    {
      include: [
        { model: Tag, through: { attributes: [] } },
        { model: User }
      ]
    }).then((services) => {
    if (!services) {
      res.send([])
    }

    res.statusCode = 200
    res.send(jsonFromServices(services))
  }).catch((err) => {
    sendInternalError(res, err)
  })
})

/**
 * Route serving a specific event
 *
 * @name get/:id
 * @function
 * @memberof module:controllers/service~serviceController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', async (req, res, next) => {
  const Service = getService(req)
  const Tag = getTag(req)
  const User = getUser(req)
  await Service.findByPk(req.params.id,
    {
      include: [
        { model: Tag, through: { attributes: [] } },
        { model: User }
      ]
    }).then(service => {
    if (!service) {
      sendNotFoundError(res)
    } else {
      res.send(service.simplified())
    }
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route serving all events of a specific user
 *
 * @name get/user/:id
 * @function
 * @memberof module:controllers/service~serviceController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/user/:id', async (req, res) => {
  const Service = getService(req)
  const Tag = getTag(req)
  const User = getUser(req)

  await Service.findAll({
    where: {
      userId: req.params.id
    },
    include: [
      { model: Tag, through: { attributes: [] } },
      { model: User }
    ]
  }).then((services) => {
    if (!services) {
      res.send()
    }

    res.send(jsonFromServices(services))
  }).catch((err) => {
    sendInternalError(res, err)
  })
})

/**
 * Route updating existing services
 *
 * @name post/
 * @function
 * @memberof module:controllers/service~serviceController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', async (req, res) => {
  const Service = getService(req)

  var serviceData = req.body
  serviceData.userId = req.user.sub
  const hasTags = serviceData.tags !== undefined

  // Tags have to be created prior to usage
  await findOrCreateTags(req, serviceData.tags)

  // Service creation
  Service.create(serviceData).then(service => {
    if (hasTags) {
      service.setTags(serviceData.tags)
    }
    const result = service.simplified()
    result.tags = serviceData.tags
    res.status(201).send(result)
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route getting the image associate with a service
 * Send a file to the client
 *
 * @name get/:id/image
 * @function
 * @memberof module:controllers/service~serviceController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id/image', async (req, res) => {
  const Service = getService(req)
  const imageRoot = path.join(__dirname, process.env.IMAGE_DIR)
  var options = {
    root: imageRoot,
    dotfiles: 'deny'
  }
  Service.findByPk(req.params.id).then(service => {
    if (service.image) {
      res.sendFile(service.image, options)
    } else {
      res.send()
    }
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route controlling the image upload
 *
 * @name post/:id/image
 * @function
 * @memberof module:controllers/service~serviceController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/:id/image', upload.single('service_image'), async (req, res) => {
  const Service = getService(req)
  Service.findByPk(req.params.id).then((service) => {
    service.image = req.file.filename
    service.save().then(() => {
      res.send()
    }).catch(err => {
      console.log('Couldn\'t save new image: ', err)
      res.status = 500
      res.send()
    })
  }).catch(err => {
    console.log(err)
    res.status = 500
    res.send()
  })
})

/**
 * Route updating a specific event
 *
 * @name put/:id
 * @function
 * @memberof module:controllers/service~serviceController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/:id', async (req, res) => {
  const Service = getService(req)
  const User = getUser(req)
  const Tag = getTag(req)

  Promise.all([
    Service.findByPk(req.params.id, { include: { model: Tag } }),
    User.findByPk(req.user.sub)
  ]).then(values => {
    const service = values[0]
    const user = values[1]

    if (service == null) {
      sendNotFoundError(res)
    }
    if (isAllowedWrite(user, service)) {
      updateService(service, req.body, req, res)
    } else {
      sendForbiddenError(res)
    }
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route deleting a specific event
 *
 * @name delete/:id
 * @function
 * @memberof module:controllers/service~serviceController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete('/:id', async (req, res) => {
  const Service = getService(req)
  const User = getUser(req)

  Promise.all([
    Service.findByPk(req.params.id),
    User.findByPk(req.user.sub)
  ]).then(values => {
    const service = values[0]
    const user = values[1]

    if (isAllowedWrite(user, service)) {
      service.destroy()
      res.status(204).send()
    } else {
      sendForbiddenError(res)
    }
  }).catch(err => {
    sendInternalError(res, err)
  })
})

export default router
