module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('services_tags', {
      tagName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      serviceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('services_tags');
  }
};
