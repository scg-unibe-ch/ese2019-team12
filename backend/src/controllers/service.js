import { Router } from 'express'
import { upload } from '../helpers/upload.helper'
import 'dotenv/config'
import { sendNotFoundError, sendInternalError, sendForbiddenError } from '../helpers/error.helper'
import { getUser } from '../helpers/user.helper'
import { getService, updateService, jsonFromServices, isAllowedWrite } from '../helpers/service.helper'
import { getTag, findOrCreateTags } from '../helpers/tag.helper'
import * as path from 'path'

const router = Router()

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
