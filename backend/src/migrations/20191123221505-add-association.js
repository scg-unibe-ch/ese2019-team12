module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'services', // name of the Source model (table name)
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Target model
          key: 'id' // key in target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'services', // Source model (table name)
      'userId' // Key to remove
    )
  }
}
