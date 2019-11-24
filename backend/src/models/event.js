const e = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.STRING
  }, {});
  Event.associate = models => {
    Event.belongsTo(models.User);
  };
  return Event;
};

export default e;
