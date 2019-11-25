const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
    }
  }, {});
  Tag.associate = models => {
    Tag.belongsToMany(models.Service, {
      through: {
        model: models.ServiceTag,
        foreignKey: 'tagId'
      }
    });
  };
  return Tag;
};

export default tag;
