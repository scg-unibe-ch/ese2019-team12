const service = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Service.associate = models => {
    Service.belongsTo(models.User);
    Service.belongsToMany(models.Tag, {
      through: {
        model: models.ServiceTag,
        unique: false
      },
      foreignKey: 'tagId',
      constraints: false
    });
  };
  return Service;
};

export default service;
