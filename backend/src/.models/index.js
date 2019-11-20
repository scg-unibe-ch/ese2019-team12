import 'dotenv/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  {
    database: process.env.DB,
    dialect: process.env.DB_DIALECT, 
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    storage: process.env.DB_STORAGE,
    define: { timestamps: false }
  },
);

const models = {
  User: sequelize.import('./user.model'),
  Service: sequelize.import('./service.model'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
