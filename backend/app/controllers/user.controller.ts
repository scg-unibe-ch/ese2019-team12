import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import { getSessionToken } from '../helpers/crypt.helper';

const router: Router = Router();
router.get('/', async (req: Request, res: Response) => {
  const instances = await User.findAll();
  let message;
  if(Object.keys(instances).length === 0){
    message = {}
  } else {
    message = instances.map(e => e.toSimplification());
  }
  res.statusCode = 200;
  res.send(message);
});
router.post('/', async (req: Request, res: Response) => {
  const instance = new User();
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 201;
  res.send(instance.toSimplification());
});
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(instance.toSimplification());
});
router.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 200;
  res.send(instance.toSimplification());
});
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.destroy();
  res.statusCode = 204;
  res.send();
});
router.put('/authenticate', async (req: Request, res: Response) => {
  const login = req.params.login;
  const password = req.params.password;

  // Allow either email or username as login
  const instance = await User.findOne({
    where: {
//      [Op.or]: [
//        {'username': login},
        'email': login
//     ]
    }
  });
  if(instance != null){
    const user = instance.toSimplification();
    if(user.password === password){
      const token = getSessionToken(String(user.id));
      res.cookie('SESSIONID', token, {httpOnly: true, secure: true});
    } else {
      res.sendStatus(401);
    }
  }
});

export const UserController: Router = router;
