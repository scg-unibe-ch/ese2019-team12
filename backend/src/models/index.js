import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  {
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite',
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
