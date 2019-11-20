import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  let Service = getService(req);
  const users = await Service.findAll();
  res.send(users);
});
router.get('/:id', async (req, res) => {
  let Service = getService(req);
  const user = await Service.findByPk(
    req.params.id,
  );
  if (!user) {
    error404(res);
    return;
  }
  res.send(user);
});
router.post('/', async (req, res) => {
  let Service = getService(req);
  let created = await Service.create({
    name: req.body.name,
    userId: req.body.userId
  });
  res.statusCode = 201;
  res.send(created);
});
router.put('/:id', async (req, res) => {
  let Service = getService(req);
  let toUpdate = await Service.findByPk(req.params.id);
  if (!toUpdate) {
    error404(res);
    return;
  }
  toUpdate.name = req.body['name'];
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
function error404(res){
  res.statusCode = 404;
  res.json({
    'message': 'not found'
  });
  return;
}
export default router;
