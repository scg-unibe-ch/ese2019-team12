const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
  }, {});
  Tag.associate = models => {
    Tag.belongsToMany(models.Service, {
      through: {
        model: models.ServiceTag,
        unique: false
      },
      foreignKey: 'tagId',
      constraints: false
    });
  };
  return Tag;
};

export default tag;
