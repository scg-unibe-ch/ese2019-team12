import { Router } from 'express';
import { getSessionToken } from '../helpers/session.helper';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op

const router = Router();

router.post('/login', async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const User = req.context.models.User;

  await User.findOne({
    where: { 
     [Op.or]: [{'username': login}, {'email': login}]
    }
  }).then(user => {
    console.log(user);
    if(user && user.id){
      const token = getSessionToken(user.id.toString());
      res.cookie('SESSIONID', token, { httpOnly: true});
      res.statusCode = 200;
      res.send(token);
    } else {
      res.sendStatus(401);
    }
  });
});

export default router;
