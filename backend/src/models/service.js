const service = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Service.associate = models => {
    Service.belongsTo(models.User);
    Service.belongsToMany(models.Tag, { through: 'ServiceTags' });
  };
  return Service;
};

export default service;
