import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { sendNotFoundError, sendInternalError, sendForbiddenError, handleSequelizeErrors } from '../helpers/error.helper';

const router = Router();
const Op = Sequelize.Op;

router.get('/', async (req, res) => { 
  // Nobody can see all events
  res.send({});
});

router.get('/:id', async (req, res) => {
  let Event = getEvent(req);
  let Service = getService(req);
  let Tag = getTag(req);

  Event.findOne(
    { 
      where: {
        [Op.and]: [{ id: req.params.id }, { userId: req.user.sub }]
      },
      include: { model: Service, through: { attributes: [] },
        include: { model: Tag, through: { attributes: [] }}
      }
    }).then(e => {
      
      if(e === null) {
        sendNotFoundError(res);
      } else {
        res.status(200).send(e.simplified());
      }
    }).catch(err => {
      sendInternalError(res, err);
      res.send();
    });
});

router.get('/user/:id', async (req, res) => {
  let Event = getEvent(req);
  let Service = getService(req);
  let Tag = getTag(req);

  Event.findAll(
      {
          where: {
              userId: req.user.sub
          },
          include: {
              model: Service,
              through: {
                    attributes: []
              },
              include: {
                    model: Tag,
                    through: {
                        attributes: []
                    }
                }
            }
      }).then(events => {
    res.send(jsonFromEvents(events));
  }).catch(err => {
    sendInternalError(res, err);
  });
});

router.post('/', async (req, res) => {
  let Event = getEvent(req);
  let eventData = req.body;
  eventData.userId = req.user.sub;

  Event.create(eventData).then((e) => {
    if(hasServices(req)) {
      e.setServices(req.body.services);
    }
    res.status(201).send(e);
  }).catch(err => {
    sendInternalError(res, err);
  });
});

router.put('/:id', async (req, res) => {
  let Event = getEvent(req);
  Event.findByPk(req.params.id).then(e => {
    if (!e) {
      sendNotFoundError(res);
    }

    if(canWrite(req.user.sub, e)) {
      let keys = Object.keys(req.body);
      keys.forEach(key => {
        if(e[key] !== undefined) {
          e[key] = req.body[key];
        }
      });
      if(hasServices(req)) {
        e.setServices(req.body.services);
      }
      e.save().then(() => {
        res.status(202).send(e);
      }).catch(err => {
        sendInternalError(res, err);
      });
    } else {
      sendForbiddenError(res);
    }
  }).catch(err => {
    sendInternalError(res, err);
  });
});

router.delete('/:id', async (req, res) => {
  let Event = getEvent(req);
  let User = getUser(req);
  Event.findByPk(req.params.id).then(e => {
    if(!e) {
      sendNotFoundError(res);
    }
    if(canWrite(req.user.sub, e)) {
      e.destroy().then(() => {
        res.status(204).send();
      }).catch(err => {
        sendInternalError(res, err);
      });
    } else {
      sendForbiddenError(res);
    }
  }).catch(err => {
    sendInternalError(res, err);
  });
});

function canWrite(userId, event) {
  return Number(userId) === event.userId;
}

function getEvent(req) {
  return req.context.models.Event;
}

function getService(req) {
  return req.context.models.Service;
}

function getTag(req) {
  return req.context.models.Tag;
}

function hasServices(req) {
  return req.body.services !== undefined;
}

function jsonFromEvents(events) {
  if (!events) {
    return [];
  }
  let result= [];
  for (let event of events) {
    result.push(event.simplified());
  }
  return result;
}

function getUser(req) {
  return req.context.models.User;
}

export default router;
