import { Router } from 'express'
import { Sequelize } from 'sequelize'
import { sendNotFoundError, sendInternalError, sendForbiddenError } from '../helpers/error.helper'
import { getEvent, isAllowedToWrite, jsonFromEvents } from '../helpers/event.helper'
import { getService, hasServices } from '../helpers/service.helper'
import { getUser } from '../helpers/user.helper'
import { getTag } from '../helpers/tag.helper'

/**
 * Express controller providing user related routes
 * 
 * @module controllers/event
 * @requires express
 * @requires sequelize
 */

/**
 * Express controller
 *
 * @type {object}
 * @const
 * @namespace eventController
 */
const router = Router()

/**
 * Sequelize Operation Tag used to perform amongst other things 'and' and 'or' queries.
 *
 * @type {object}
 * @const
 */
const Op = Sequelize.Op

/**
 * Route serving nothing, as nobody can see all events.
 *
 * @name get/
 * @function
 * @memberof module:controllers/event~eventController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', async (req, res) => {
  // Nobody can see all events
  res.send({})
})

/**
 * Route serving a specifig event.
 *
 * @name get/:id
 * @function
 * @memberof module:controllers/event~eventController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', async (req, res) => {
  const Event = getEvent(req)
  const Service = getService(req)
  const Tag = getTag(req)
  const User = getUser(req)

  Event.findOne(
    {
      where: {
        [Op.and]: [{ id: req.params.id }, { userId: req.user.sub }]
      },
      include: {
        model: Service,
        through: { attributes: [] },
        include: [
          { model: Tag, through: { attributes: [] } },
          { model: User }
        ]
      }

    }).then(e => {
    if (e === null) {
      sendNotFoundError(res)
    } else {
      res.status(200).send(e.simplified())
    }
  }).catch(err => {
    sendInternalError(res, err)
    res.send()
  })
})

/**
 * Route serving all events of a specific user.
 *
 * The logic does not actually follow the id sent but rather the id of the current user.
 * This is because no user can currently see another users events.
 *
 * @name get/user/:id
 * @function
 * @memberof module:controllers/event~eventController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/user/:id', async (req, res) => {
  const Event = getEvent(req)
  const Service = getService(req)
  const Tag = getTag(req)
  const User = getUser(req)

  Event.findAll(
    {
      where: {
        userId: req.user.sub
      },
      include:
      {
        model: Service,
        through: { attributes: [] },
        include: [
          { model: Tag, through: { attributes: [] } },
          { model: User }
        ]
      }
    }).then(events => {
    res.send(jsonFromEvents(events))
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route creating new events, accepts event data 
 *
 * @name post/
 * @function
 * @memberof module:controllers/event~eventController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', async (req, res) => {
  const Event = getEvent(req)
  const eventData = req.body
  eventData.userId = req.user.sub

  Event.create(eventData).then((e) => {
    if (hasServices(req)) {
      e.setServices(req.body.services)
    }
    res.status(201).send(e)
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route updating events, accepts event data
 *
 * @name put/:id
 * @function
 * @memberof module:controllers/event~eventController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/:id', async (req, res) => {
  const Event = getEvent(req)
  Event.findByPk(req.params.id).then(e => {
    if (!e) {
      sendNotFoundError(res)
    }

    if (isAllowedToWrite(req.user.sub, e)) {
      const keys = Object.keys(req.body)
      keys.forEach(key => {
        if (e[key] !== undefined) {
          e[key] = req.body[key]
        }
      })
      if (hasServices(req)) {
        e.setServices(req.body.services)
      }
      e.save().then(() => {
        res.status(202).send(e)
      }).catch(err => {
        sendInternalError(res, err)
      })
    } else {
      sendForbiddenError(res)
    }
  }).catch(err => {
    sendInternalError(res, err)
  })
})

/**
 * Route deleting events
 *
 * @name /delete:id
 * @function
 * @memberof module:controllers/event~eventController
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete('/:id', async (req, res) => {
  const Event = getEvent(req)

  Event.findByPk(req.params.id).then(e => {
    if (!e) {
      sendNotFoundError(res)
    } else if (isAllowedToWrite(req.user.sub, e)) {
      e.destroy().then(() => {
        res.status(204).send()
      }).catch(err => {
        sendInternalError(res, err)
      })
    } else {
      sendForbiddenError(res)
    }
  }).catch(err => {
    sendInternalError(res, err)
  })
})

export default router
