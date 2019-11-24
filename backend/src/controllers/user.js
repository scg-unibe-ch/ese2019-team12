import { Router } from 'express';
import { Sequelize } from 'sequelize';

const Op = Sequelize.Op;

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

router.get('/:userId', async (req, res, next) => {
  if(Object.keys(req.query).length === 0){
    let User = getUser(req);
    const user = await User.findByPk(
      req.params.userId,
    );
    if (!user) {
      error404(res);
      return;
    }
    res.send(user);
  }
  next();
});

router.post('/', async (req, res) => {
  let User = getUser(req);
  var userData = req.body;

  // Every User will at first be a normal User 
  // - only Admins will be able to assign new admins
  userData.role = "User";

  await User.create(userData).then(user => {
    res.statusCode = 201;
    res.send(user);
  }).catch( err => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.put('/:id', async (req, res) => {
  let User = getUser(req);
  let toUpdate = await User.findByPk(req.params.id);
  if (!toUpdate) {
    error404(res);
    return;
  }
  let keys = Object.keys(req.body); // Find all transmitted attributes
  keys.forEach((key) => {           // For each attribute name,
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

router.get('/search', async (req, res) => {
  let User = getUser(req);
  let criteria = '';
  if(req.query.username !== undefined) {
    criteria = req.query.username;
  } else if (req.query.email !== undefined) {
    criteria = req.query.email;
  } else {
    res.send('Please submit a proper search');
  }
  await User.findOne({ where: {
      [Op.or]: [{'username': criteria }, {'email': criteria}]
    }
  }).then((user) => {
    res.statusCode = 200;
    if(user !== null) {
      res.send({ 'isUsed': true });
    } else {
      res.send({ 'isUsed': false });
    }
  }).catch((err) => {
    console.log(err);
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
