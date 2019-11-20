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
      let message = getSessionToken(user.id.toString());
      message.user = user;
      res.statusCode = 200;
      res.send(message);
    } else {
      res.statusCode = 401;
      res.send("login failed");
    }
  });
});

export default router;
