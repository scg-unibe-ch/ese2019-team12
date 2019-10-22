import {Router, Request, Response} from 'express';
import { getUserDataOrNull } from '../helpers/session.helper';

const router: Router = Router();

const regSessionId = new RegExp('SESSIONID=');

console.log(regSessionId.test("SESSIONID=21324"));

router.put('/create', async (req: Request, res: Response) => {
  const login = req.params.login;
  const password = req.params.password;

  const data = await getUserDataOrNull(login, password);

  if(data && data['token'] && data['user']){
    res.cookie('SESSIONID', data['token'], { httpOnly: true, /*secure: true*/});
    res.send(data['user']);
  } else {
    res.sendStatus(401);
  }
});

export const SessionController: Router = router;
