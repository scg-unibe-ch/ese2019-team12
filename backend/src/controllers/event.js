import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  let Event = getEvent(req);

  Event.findAll().then(events => {
    res.status = 200;
    if(!events) {
      res.send([]);
    }
    let toSend = [];
    events.forEach(e => {
      toSend.push(e.simplified());
    });
    res.send(toSend);
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
  });
});

router.get('/:id', async (req, res) => {
  let Event = getEvent(req);

  Event.findByPk(req.params.id).then(e => {
    if(!e) {
      error404(res);
      return;
    }
    res.status = 200;
    res.send(e.simplified());
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.get('/user/:id', async (req, res) => {
  let Event = getEvent(req);
  Event.findAll({ where: { userId: req.params.id } }).then(events => {
    if(!events) {
      res.send([]);
    }
    res.send(events);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.post('/', async (req, res) => {
  let Event = getEvent(req);
  let eventData = req.body;
  eventData.userId = req.user.sub;

  Event.create(req.body).then(() => {
    res.sendStatus(201);
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
    e.save().then(() => {
      res.sendStatus(202);
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
function error404(res){
  res.statusCode = 404;
  res.json({
    'message': 'not found'
  });
}
export default router;
