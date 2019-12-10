import { Router } from 'express'
import { upload } from '../helpers/upload.helper'
import 'dotenv/config'
import { sendNotFoundError, sendInternalError, sendForbiddenError } from '../helpers/error.helper'
var path = require('path')

const router = Router()

export const serviceAuthFilter = (req) => {
  return req.method === 'OPTIONS' || req.method === 'GET'
}

router.get('/', async (req, res) => {
  const Service = getService(req)
  const Tag = getTag(req)
  const User = getUser(req)
  Service.findAll({ include: [{ model: Tag }, { model: User }] }).then((services) => {
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
  await Service.findByPk(req.params.id, { include: [{ model: Tag }, { model: User }] }).then(service => {
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
    include: [{
      model: Tag
    }, {
      model: User
    }]
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
  const Tag = getTag(req)

  var serviceData = req.body
  serviceData.userId = req.user.sub
  const hasTags = serviceData.tags !== undefined

  // Tags have to be created prior to usage
  await findOrCreateTags(Tag, serviceData.tags)

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
    if (canUpdate(user, service)) {
      update(service, req.body, res, Tag)
    } else {
      sendForbiddenError(res)
    }
  }).catch(err => {
    sendInternalError(res, err)
  })
})

function update (service, data, res, Tag) {
  const keys = Object.keys(data)
  keys.forEach(key => {
    if (service[key] !== undefined && key !== 'tags' &&
      key !== 'id' && key !== 'userId') {
      service[key] = data[key]
    }
  })
  if (data.tags !== undefined) {
    updateTags(service, data.tags, res, Tag)
  } else {
    service.save().then((s) => {
      res.status(202).send(s)
    }).catch(err => {
      sendInternalError(res, err)
    })
  }
}

function updateTags (service, tags, res, Tag) {
  findOrCreateTags(Tag, tags).then(() => {
    service.getTags().then(t => {
      service.removeTags(t)
      service.setTags(tags)
      service.save().then((s) => {
        res.status(202).send(s)
      }).catch(err => {
        sendInternalError(res, err)
      })
    }).catch(err => {
      sendInternalError(res, err)
    })
  }).catch(err => {
    sendInternalError(res, err)
  })
}

function canUpdate (user, service) {
  return service.userId === user.id || user.isAdmin()
}

router.delete('/:id', async (req, res) => {
  const Service = getService(req)
  const User = getUser(req)
  const serviceId = req.params.id
  const userId = req.user.sub

  Service.findByPk(serviceId).then(service => {
    User.findByPk(userId).then(user => {
      if (isAllowedToDelete(user, service)) {
        service.destroy()
        res.statusCode = 204
        res.send()
      } else {
        sendForbiddenError(res)
      }
    }).catch(err => {
      sendInternalError(res, err)
    })
  }).catch(err => {
    sendInternalError(res, err)
  })
})

function isAllowedToDelete (user, service) {
  return service.userId === user.id || user.isAdmin()
}

async function findOrCreateTags (model, tags) {
  if (!tags || tags === undefined) {
    return
  }
  for (const tag of tags) {
    await model.findOrCreate({ where: { name: tag } })
  }
}

function getService (req) {
  return req.context.models.Service
}

function getUser (req) {
  return req.context.models.User
}

function getTag (req) {
  return req.context.models.Tag
}

function jsonFromServices (services) {
  const res = []
  services.forEach((service) => {
    res.push(service.simplified())
  })
  return res
}

export default router
