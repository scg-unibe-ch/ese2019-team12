import 'dotenv/config';
import express from 'express';

import models, { sequelize } from './models';
import controllers from './controllers';
import { userAuthFilter } from './controllers/user';
import { serviceAuthFilter } from './controllers/service';
import { checkIfAuthenticated } from './helpers/session.helper';

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());
app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.get('/', (req, res) => {
  return res.send('Received GET HTTP method');
});
app.use('/users', checkIfAuthenticated.unless(userAuthFilter),controllers.user);
app.use('/services', checkIfAuthenticated.unless(serviceAuthFilter), controllers.service);
app.use('/session', controllers.session);

var server = app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
sequelize.sync().then(() => {
  app.emit('ready');
});

module.exports = server;
