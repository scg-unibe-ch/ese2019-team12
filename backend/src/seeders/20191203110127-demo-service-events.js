'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services_events', [
      {
        eventId: 1,
        serviceId: 1
      },
      {
        eventId: 1,
        serviceId: 2
      },
      {
        eventId: 1,
        serviceId: 3
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services_events', null, {})
  }
}
