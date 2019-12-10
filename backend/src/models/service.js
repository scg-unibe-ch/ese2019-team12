/**
 * Service model to be imported by sequelize
 * @module models/service
 * @param {object} sequelize - Sequelize instance
 * @param {object} DataTypes - Sequelize Datatypes
 */

/**
 * Service model
 *
 * memberof module:models/service
 * @namespace Service
 * @property {string} title         -   title of the service
 * @property {string} description   -   description of the service
 * @property {number} price         -   price set by the user
 * @property {string} image         -   filename of the saved image
 * */
const service = (sequelize, DataTypes) => {
  const Service = sequelize.define('service', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {})
  Service.associate = models => {
    Service.belongsTo(models.User)
    Service.belongsToMany(models.Tag, { through: 'services_tags' })
    Service.belongsToMany(models.Event, { through: 'services_events' })
  }
  /**
   * Gives back a json with tags and the associated users username.
   * In order for this to work, the Service has to be loaded with includes for Tag and User.
   *
   * @function
   * @returns {object} json - json with service data, tags, username
   */
  Service.prototype.simplified = function () {
    const tags = []
    if (this.tags !== undefined) {
      this.tags.forEach(tag => {
        tags.push(tag.dataValues.name)
      })
    }
    const result = {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      userId: this.userId,
      tags
    }
    if (this.user) {
      result.username = this.user.username
    }
    return result
  }
  return Service
}

export default service
