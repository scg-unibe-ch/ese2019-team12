import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import controllers from './controllers';

const app = express();

app.use(cors());
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
app.use('/users', controllers.user);
app.use('/services', controllers.service);
app.use('/session', controllers.session);

var server = app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
}); 
sequelize.sync().then(() => {
  app.emit('ready');
});

module.exports = server;
