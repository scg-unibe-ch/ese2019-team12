const service = (sequelize, DataTypes) => {
  const Service = sequelize.define('service', {
    name: { 
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },

  });

  Service.associate = models => {
    Service.belongsTo(models.User);
  };

  return Service
};

export default service;
