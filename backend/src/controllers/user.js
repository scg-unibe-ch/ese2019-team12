import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  let User = getUser(req);
  const users = await User.findAll();
  res.send(users);
});

router.put('/:id', async (req, res) => {
  let User = getUser(req);
  let toUpdate = await User.findByPk(req.params.id);
  if (!toUpdate) {
    error404(res);
    return;
  }
  toUpdate.username = req.body['username'];
  await toUpdate.save();
  res.statusCode = 200;
  res.send(toUpdate);
});

router.delete('/:id', async (req, res) => {
  let User = getUser(req);
  let toDelete = await User.findByPk(req.params.id);
  if(!toDelete) {
    error404(res);
    return;
  }
  await toDelete.destroy();
  res.statusCode = 204;
  res.send();
});

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
