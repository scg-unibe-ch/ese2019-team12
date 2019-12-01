module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tags');
  }
};
