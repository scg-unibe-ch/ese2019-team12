import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  let Service = getService(req);
  const users = await Service.findAll();
  res.send(users);
});
router.get('/:id', async (req, res, next) => {
  let Service = getService(req);
  await Service.findByPk(req.params.id).then(service => {
    if(!service) {
      error404(res);
      return;
    }
    res.send(service);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});
router.get('/user/:id', async (req, res) => {
  let Service = getService(req);
  let User = getUser(req);

  await User.findByPk(req.params.id).then(user => {
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

  // await Service.create(serviceData, { include: [ Tag ]}).then(service => {
  await Service.create({
    name: "bulletis",
    description: "beste bulleten",
    date: 0,
    tags: serviceData.tags
  }, { include: [ Tag ] }).then(async service => {
    console.log(Object.keys(serviceData.tags));
    await findOrCreateTags(Tag, serviceData.tags); 
    service.setTags(serviceData.tags);

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
function error404(res){
  res.statusCode = 404;
  res.json({
    'message': 'not found'
  });
  return;
}
export default router;
