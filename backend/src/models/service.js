// Service model:
//
// title:       string
// description: string
// price:       integer
//
// hasmany:     Tags    through: ServiceTags
//
const service = (sequelize, DataTypes) => {
  const Service = sequelize.define('service', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {});
  Service.associate = models => {
    Service.belongsTo(models.User);
    Service.belongsToMany(models.Tag, { through: 'services_tags' });
    Service.belongsToMany(models.Event, { through: 'services_events' });
  };
  Service.prototype.simplified = function() {
    let tags = [];
    if(this.tags !== undefined) {
      this.tags.forEach(tag => {
        tags.push(tag.dataValues.name);
      });
    }
    result = {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      userId: this.userId,
      tags
    }
    if(this.user) {
      result.username = this.username;
    }
    return result;
  }
  return Service;
};

export default service;
