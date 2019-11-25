module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ServiceTags', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tagId: {
        type: Sequelize.INTEGER,
      },
      serviceId: {
        type: Sequelize.INTEGER,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ServiceTags');
  }
};
