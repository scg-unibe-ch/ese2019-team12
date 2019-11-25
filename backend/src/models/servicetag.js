module.exports = (sequelize, DataTypes) => {
  const ServiceTag = sequelize.define('ServiceTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tagId: {
      type: DataTypes.INTEGER,
      unique: 'service_tag_taggable'
    },
    serviceId: {
      type: DataTypes.INTEGER,
      unique: 'service_tag_taggable',
    }
  }, {});
  ServiceTag.associate = models => {
  };
  return ServiceTag;
};
