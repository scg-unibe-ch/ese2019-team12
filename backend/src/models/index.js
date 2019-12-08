import 'dotenv/config';
import Sequelize from 'sequelize';
import fs from 'fs';

const logging = (process.env.DB_LOG === 'None' ? function(){} : console.log); // Have the possibility to disable logging (for testing)
const sequelize = new Sequelize(
  {
    transactionType: 'IMMEDIATE',
    dialect: process.env.DB_DIALECT, 
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    storage: process.env.DB_STORAGE,
    logging,
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
