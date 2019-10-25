import {Router, Request, Response} from 'express';
import { getUserDataOrNull } from '../helpers/session.helper';

const router: Router = Router();

const regSessionId = new RegExp('SESSIONID=');

router.post('/', async (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.password;

  await getUserDataOrNull(login, password).then(data => {
    if(data && data['token'] && data['user']){
      res.cookie('SESSIONID', data['token'], { httpOnly: true, /*secure: true*/});
      res.status(200);
      res.send(data['user']);
    } else {
      res.sendStatus(401);
    }
  }).catch(err => {
    console.log(err);
  });
});

export const SessionController: Router = router;
