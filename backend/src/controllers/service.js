import { Router } from 'express';

const router = Router();

export const serviceAuthFilter = ((req) => {
  return req.method === 'OPTIONS' || req.method === 'GET';
});

router.get('/', async (req, res) => {
  let Service = getService(req);
  let Tag = getTag(req);
  Service.findAll({ include: { model: Tag } }).then((services) => {
    res.statusCode = 200;
    if(!services) {
      res.send([]);
    }
    res.send(jsonFromServices(services));
  }).catch((err) => {
    console.log(err)
    res.sendStatus(500);
  });
});

router.get('/:id', async (req, res, next) => {
  let Service = getService(req);
  let Tag = getTag(req);
  await Service.findByPk(req.params.id, { include: { model: Tag }}).then(service => {
    if(!service) {
      error404(res);
      return;
    }
    res.send(service.simplified());
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.get('/user/:id', async (req, res) => {
  let Service = getService(req);
  let Tag = getTag(req);

  const services = await Service.findAll({
    where: {
      UserId: req.params.id
    },
    include: { model: Tag }}).then((services) => {
    if(!services) {
      res.send([]);
    }

    res.send(jsonFromServices(services));
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.post('/', async (req, res) => {
  let Service = getService(req);
  let Tag = getTag(req);

  var serviceData = req.body;
  serviceData.userId = req.user.sub;
  let hasTags = serviceData.tags !== undefined;

  // Tags have to be created prior to usage
  await findOrCreateTags(Tag, serviceData.tags);

  // Service creation
  Service.create(serviceData).then(service => {
    service.setTags(serviceData.tags);
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.put('/:id', async (req, res) => {
  let Service = getService(req);
  let Tag = getTag(req);
  let toUpdate = await Service.findByPk(req.params.id);
  if (!toUpdate) {
    error404(res);
    return;
  }
  let keys = Object.keys(req.body);
  console.log(keys);
  keys.forEach((key) => {
    if(toUpdate[key] !== undefined) {
      toUpdate[key] = req.body[key];
    }
  });
  if(req.body.tags !== undefined) {
    findOrCreateTags(Tag, req.body.tags).then(() => {
      toUpdate.getTags().then((tags) => {
        toUpdate.removeTags(tags);
        toUpdate.setTags(req.body.tags);
        toUpdate.save();
        res.status = 202;
        res.send();
      }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  } else {
    console.log(toUpdate);
    toUpdate.save().then(() => {
      res.sendStatus(202);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  }
});

router.delete('/:id', async (req, res) => {
  let Service = getService(req);
  let toDelete = await Service.findByPk(req.params.id);
  if(!toDelete) {
    error404(res);
    return;
  }
  await toDelete.destroy();
  res.statusCode = 204;
  res.send();
});

async function findOrCreateTags(model, tags){
  if(!tags || tags === undefined) {
    return;
  }
  for (const tag of tags) {
    await model.findOrCreate({ where: { name: tag } });
  }
}

function getService(req) {
  return req.context.models.Service;
}

function getUser(req) {
  return req.context.models.User;
}

function getTag(req) {
  return req.context.models.Tag;
}

function jsonFromServices(services) {
  let res = [];
  services.forEach((service) => {
    res.push(service.simplified());
  });
  return res;
}

function error404(res){
  res.statusCode = 404;
  res.json({
    'message': 'not found'
  });
  return;
}

export default router;
