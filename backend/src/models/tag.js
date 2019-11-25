const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {});
  Tag.associate = models => {
    Tag.belongsToMany(models.Service, { through:  'ServiceTags' });
  };
  return Tag;
};

export default tag;
