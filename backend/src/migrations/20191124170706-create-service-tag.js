module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ServiceTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagId: {
        type: Sequelize.INTEGER
      },
      taggable: {
        type: Sequelize.STRING
      },
      taggableId: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ServiceTags');
  }
};
