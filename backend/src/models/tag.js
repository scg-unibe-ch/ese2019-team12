const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {});
  Tag.associate = models => {
    Tag.belongsToMany(models.Service, { through:  'services_tags' });
  };
  return Tag;
};

export default tag;
