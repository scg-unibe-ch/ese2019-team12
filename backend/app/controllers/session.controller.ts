import {Router, Request, Response} from 'express';
import { getTokenOrNull } from '../helpers/session.helper';

const router: Router = Router();

const regSessionId = new RegExp('SESSIONID=');

console.log(regSessionId.test("SESSIONID=21324"));

router.get('/create', async (req: Request, res: Response) => {
  const login = req.params.login;
  const password = req.params.password;

  const token = await getTokenOrNull(login, password);

  if(token){
    res.cookie('SESSIONID', token, { httpOnly: true, /*secure: true*/});
  } else {
    res.sendStatus(401);
  }
  res.status(200);
});

export const SessionController: Router = router;
