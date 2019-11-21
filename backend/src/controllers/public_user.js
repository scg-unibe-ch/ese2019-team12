import { Router } from 'express';

const router = Router();

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
  let createdUser = await User.create({
    username: "" + Math.random(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    role: "User",
    email: req.body.email,
  }).then(user => {
    res.statusCode = 201;
    res.send(createdUser);
  }).catch( err => {
    console.log(err);
    res.statusCode = 500;
    res.send();
  });
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
