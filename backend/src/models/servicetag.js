module.exports = (sequelize, DataTypes) => {
  const ServiceTag = sequelize.define('ServiceTag', {
    tagId: DataTypes.INTEGER,
    taggable: {
      type: DataTypes.STRING,
      unique: 'service_tag_taggable'
    },
    taggableId: {
      type: DataTypes.INTEGER,
      unique: 'service_tag_taggable',
      references: null
    }
  }, {});
  ServiceTag.associate = models => {
  };
  return ServiceTag;
};
