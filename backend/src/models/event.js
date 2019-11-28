// Event model:
//
// name:          string
// description:   string
// date:          string
//
const e = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE           // DATETIME for sqlite
  }, {});
  Event.associate = models => {
    Event.belongsTo(models.User);
  };
  Event.prototype.simplified = function() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      date: this.date,
      userId: this.UserId
    }
  }
  return Event;
};

export default e;
