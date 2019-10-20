import {Router, Request, Response} from 'express';
import { getTokenOrNull } from '../helpers/session.helper';

const router: Router = Router();

router.get('/authenticate', async (req: Request, res: Response) => {
  const login = req.params.login;
  const password = req.params.password;

  const token = getTokenOrNull(login, password);

  if(token){
    res.cookie('SESSIONID', token, /*{ httpOnly: true, secure: true}*/);
  } else {
    res.sendStatus(401);
  }
});

export const SessionController: Router = router;
