'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('services_events', {
      eventId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      serviceId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('services_events')
  }
}
