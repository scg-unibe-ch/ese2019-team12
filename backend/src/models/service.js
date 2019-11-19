const service = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Service.associate = function(models) {
    Service.belongsTo(models.User);
  };
  return Service;
};

export default service;
