import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  let Service = getService(req);
  let Tag = getTag(req);
  const services = await Service.findAll({ include: { model: Tag, through: { attributes: [] }} });
  services.forEach((service) => {
    service.dataValues.tags = [];
    service.Tags.forEach((tag) => {
      service.dataValues.tags.push(tag.name);
    });
  });

  // TODO: find a nice way to transmitt tags

  res.send(services);
});
router.get('/:id', async (req, res, next) => {
  let Service = getService(req);
  let Tag = getTag(req);
  await Service.findByPk(req.params.id, { include: { model: Tag, through: { attributes: []}}}).then(service => {
    if(!service) {
      error404(res);
      return;
    }
    service.Tags = compactTags(service);
    res.send(service);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});
router.get('/user/:id', async (req, res) => {
  let Service = getService(req);
  let User = getUser(req);
  let Tag = getTag(req);

  await User.findByPk(req.params.id, { 
    include: { model: Service, include: { model: Tag, through: { attributes: []}}}
  }).then(user => {
    if(!user) {
      error404(res);
      return;
    }
    res.send(user.services);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});
router.post('/', async (req, res) => {
  let Service = getService(req);
  let Tag = getTag(req);

  var serviceData = req.body;
  serviceData.userId = req.user.sub;

  // Tags have to be created prior to usage
  await findOrCreateTags(Tag, serviceData.tags);

  // Service creation
  await Service.create(serviceData, { include: [ Tag ]}).then(async service => {
    service.setTags(serviceData.tags);
    let tags = await service.getTags();
    await service.save();
    await service.reload();

    service.Tags = compactTags(service);

    res.statusCode = 201;
    res.send(service);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});
router.put('/:id', async (req, res) => {
  let Service = getService(req);
  let toUpdate = await Service.findByPk(req.params.id);
  if (!toUpdate) {
    error404(res);
    return;
  }
  let keys = Object.keys(req.body);
  keys.forEach((key) => {
    if(toUpdate.key !== undefined) {
      toUpdate.key = req.body.key;
    }
  });

  await toUpdate.save();
  await toUpdate.reload();

  toUpdate.Tags = compactTags(service);

  res.statusCode = 200;
  res.send(toUpdate);
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
  tags.forEach(tag => {
    model.findOrCreate({
      where: { name: tag }
    });
  });
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
function compactTags(service) {
  var res = [];
  let tags = service.Tags;
  tags.forEach((tag) => {
    res.push(tag.dataValues.name);
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
