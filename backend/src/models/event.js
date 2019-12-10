/**
 * Event model to be imported by sequelize
 *
 * @param {object} sequelize - Sequelize instance
 * @param {object} DataTypes - Sequelize Datatypes
 *
 * Event belongs to a User
 * Event belongs to many Services
 *
 * @typedef {Object} Event
 * @property {string} name          -   name of the event
 * @property {string} description   -   description of the event
 * @property {date} date            -   date of the event
 */
const e = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE // DATETIME for sqlite
  }, {})
  Event.associate = models => {
    Event.belongsTo(models.User)
    Event.belongsToMany(models.Service, { through: 'services_events' })
  }
  Event.prototype.simplified = function () {
    const res = []
    this.services.forEach((service) => {
      res.push(service.simplified())
    })

    return {
      id: this.id,
      name: this.name,
      description: this.description,
      date: this.date,
      userId: this.userId,
      services: res
    }
  }
  return Event
}

export default e
