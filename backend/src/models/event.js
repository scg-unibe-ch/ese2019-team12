// Event model:
//
// name:          string
// description:   string
// date:          string
//
const e = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE           // DATETIME for sqlite
  }, {});
  Event.associate = models => {
    Event.belongsTo(models.User);
    Event.belongsToMany(models.Service, { through: 'services_events' });
  };
  Event.prototype.simplified = function() {
    let res = [];
    this.services.forEach((service) => {
      res.push(service.simplified());
    });

    return {
      id:           this.id,
      name:         this.name,
      description:  this.description,
      date:         this.date,
      userId:       this.userId,
      services:     res
    };
  }
  return Event;
};

export default e;
