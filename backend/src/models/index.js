import 'dotenv/config';
import Sequelize from 'sequelize';
import fs from 'fs';

const conf = JSON.parse(fs.readFileSync('config/config.json'));

const sequelize = new Sequelize(
  {
    transactionType: 'IMMEDIATE',
    dialect: process.env.DB_DIALECT, 
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    storage: process.env.DB_STORAGE,
    define: { timestamps: false }
  },
);

const models = {
  User: sequelize.import('./user'),
  Service: sequelize.import('./service'),
  Event: sequelize.import('./event'),
  Tag: sequelize.import('./tag'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
