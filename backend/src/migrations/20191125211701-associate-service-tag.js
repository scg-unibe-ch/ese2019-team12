module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ServiceTags', {
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
    return queryInterface.dropTable('ServiceTags');
  }
};
