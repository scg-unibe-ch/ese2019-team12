'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [
      {
        name: 'My Birthday Party',
        description: 'I am planning my birthday party',
        date: '2020.03.01',
        userId: 11
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {})
  }
}
