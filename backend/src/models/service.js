const service = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Service.associate = models => {
    Service.belongsTo(models.User);
    Service.belongsToMany(models.Tag, { through: 'ServiceTags' });
  };
  Service.prototype.simplified = function() {
    let tags = [];
    this.Tags.forEach(tag => {
      tags.push(tag.dataValues.name);
    });
    return {
      title: this.title,
      description: this.description,
      price: this.price,
      userId: this.UserId,
      tags
    }
  }
  return Service;
};

export default service;
