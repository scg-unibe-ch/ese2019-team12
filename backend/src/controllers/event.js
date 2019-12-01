import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  let Event = getEvent(req);
  let Service = getService(req);
  let Tag = getTag(req);

  // Include service model and include the tags but exclude the model which links tags and services
  Event.findAll({ include: { model: Service, through: { attributes: [] }, 
                    include: { model: Tag, through: { attributes: [] }}}}).then(events => {
    res.send(jsonFromEvents(events));
  }).catch(err => {
    console.log(err);
    res.status = 500;
    res.send();
  });
});

router.get('/:id', async (req, res) => {
  let Event = getEvent(req);
  let Service = getService(req);
  let Tag = getTag(req);

  Event.findByPk(req.params.id, { 
    include: { model: Service, through: { attributes: [] }, 
        include: { model: Tag, through: { attributes: [] }}}}).then(e => {
    if(!e) {
      error404(res);
      return;
    }
    res.status = 200;
    res.send(e.simplified());
  }).catch(err => {
    console.log(err);
    res.status = 500;
    res.send();
  });
});

router.get('/user/:id', async (req, res) => {
  let Event = getEvent(req);
  let Service = getService(req);
  let Tag = getTag(req);

  Event.findAll({ where: { userId: req.params.id }, 
    include: { model: Service, through: { attributes: [] }, 
        include: { model: Tag, through: { attributes: [] }}}}).then(events => {
    res.send(jsonFromEvents(events));
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
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
    res.status = 201;
    res.send();
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.put('/:id', async (req, res) => {
  let Event = getEvent(req);
  Event.findByPk(req.params.id).then(e => {
    if (!e) {
      error404(res);
      return
    }
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
      res.send();
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  });
});
router.delete('/:id', async (req, res) => {
  let Event = getEvent(req);
  let toDelete = await Event.findByPk(req.params.id);
  if(!toDelete) {
    error404(res);
    return;
  }
  await toDelete.destroy();
  res.statusCode = 204;
  res.send();
});

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
function error404(res){
  res.statusCode = 404;
  res.json({
    'message': 'not found'
  });
}
export default router;
