'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tags', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tags');
  }
};
