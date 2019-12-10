/**
 * Tag model to be imported by sequelize
 * @module models/service
 * @param {object} sequelize - Sequelize instance
 * @param {object} DataTypes - Sequelize Datatypes
 */

/**
 * Tag model
 *
 * memberof module:models/tag
 * @namespace Tag
 * @property {string} name  -   has to be unique, is primary key
 */
const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {})
  Tag.associate = models => {
    Tag.belongsToMany(models.Service, { through: 'services_tags' })
  }
  return Tag
}

export default tag
