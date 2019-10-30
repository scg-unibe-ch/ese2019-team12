import {Router, Request, Response} from 'express';
import { Service } from '../models/service.model';
import { getSessionToken } from '../helpers/crypt.helper';

const router: Router = Router();
router.get('/', async (req: Request, res: Response) => {
  const instances = await Service.findAll();
  let message;
  if(Object.keys(instances).length === 0){
    message = {};
  } else {
    message = instances.map(e => e.toSimplification());
  }
  res.statusCode = 200;
  res.send(message);
});
router.get('/:userId/', async (req: Request, res: Response) => {
  const instances = await Service.findAll({ where: { 'userId': req.params.userId }});
  let message;
  if (instances == null) {
    message = {};
  } else {
    message = instances.map(e => e.toSimplification());
  }
  res.statusCode = 200;
  res.send(message);
});
router.post('/', async (req: Request, res: Response) => {
  const instance = new Service();
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 201;
  res.send(instance.toSimplification());
});
router.get('/:userId/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await Service.findById(id);
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
  const instance = await Service.findById(id);
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
  const instance = await Service.findById(id);
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

export const ServiceController: Router = router;
