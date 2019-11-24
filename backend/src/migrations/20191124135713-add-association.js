'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Events',  // name of the Source model (table name)
      'UserId',   // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Target model
          key: 'id',    // key in target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Events',  // Source model (table name)
      'UserId'    // Key to remove
    );
  }
};
