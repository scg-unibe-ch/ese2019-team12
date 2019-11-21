import { Router } from 'express';

const router = Router();

// Only allow admins to call /users/
// Allow not authenticated Users to create an account and to view profile pages
export const authFilter = ((req) => {
  return req.method === 'OPTIONS' || req.method === 'POST' ||
    (req.method === 'GET' && req.originalUrl != '/users/');
});

router.get('/', async (req, res) => {
  let User = getUser(req);
  const users = await User.findAll();
  res.send(users);
});

router.get('/:userId', async (req, res) => {
  let User = getUser(req);
  const user = await User.findByPk(
    req.params.userId,
  );
  if (!user) {
    error404(res);
    return;
  }
  res.send(user);
});

router.post('/', async (req, res) => {
  let User = getUser(req);
  var userData = req.body;
  userData.username = "" + Math.random();
  userData.role = "User";
  await User.create(userData).then(user => {
    res.statusCode = 201;
    res.send(user);
  }).catch( err => {
    console.log(err);
    res.statusCode = 500;
    res.send();
  });
});

router.put('/:id', async (req, res) => {
  let User = getUser(req);
  let toUpdate = await User.findByPk(req.params.id);
  if (!toUpdate) {
    error404(res);
    return;
  }
  let keys = Object.keys(req.body);
  console.log(keys);
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
