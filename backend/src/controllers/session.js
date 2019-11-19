import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { checkPassword } from '../helpers/crypt.helper';
import { getSessionToken } from '../helpers/session.helper';
const Op = Sequelize.Op

const router = Router();

// Provides the JWT and it's expiration date in ms (counting from 01.01.1970 00:00:00)
// to the legitimate User
router.post('/login', async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const User = req.context.models.User;

  await User.findOne({
    where: { 
     [Op.or]: [{'username': login}, {'email': login}]
    }
  }).then(user => {
    if(user && user.id && checkPassword(password, user.password(), user.salt())){
      res.statusCode = 200;
      res.send(getSessionToken(user.id.toString()));
    } else {
      res.sendStatus(401);
    }
  });
});

export default router;
