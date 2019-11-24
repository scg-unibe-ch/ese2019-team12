import { Router } from 'express';
import { Tag } from 'tag';

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
  ).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});
router.post('/', async (req, res) => {
  let Service = getService(req);
  var serviceData = req.body;

  // Sequelize expects the tags in the form [{ name: 'tag1' }, { name: 'tag2'},.. ]
  //
  // As we receive them in the form [ 'tag1', 'tag2',...], 
  // they have to be rewritten here
  serviceData.tags.forEach((element, index) => {
    serviceData.tags[index] = { name: element };
  });

  await Service.create(serviceData).then(service => {
    res.statusCode = 201;
    res.send(created);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  };
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

function getService(req) {
  return req.context.models.Service;
}
function getUser(req) {
  return req.context.models.User;
}
function error404(res){
  res.statusCode = 404;
  res.json({
    'message': 'not found'
  });
  return;
}
export default router;
