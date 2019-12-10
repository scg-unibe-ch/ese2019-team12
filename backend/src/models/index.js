import Sequelize from 'sequelize'

/**
 * Sets up the sequelize database connection
 * @module index/sequelize
 * @requires sequelize
 */

/**
 * Use the environment variable to determine, whether or not to use logging.
 * @memberof module: index/sequelizeIndex
 * @const
 */
const logging = (process.env.DB_LOG === 'None' ? function () {} : console.log)

/**
 * Create a new sequelize instance
 * @memberof module: index/sequelizeIndex
 * @const
 */
const sequelize = new Sequelize(
  {
    transactionType: 'IMMEDIATE',
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    storage: process.env.DB_STORAGE,
    logging,
    define: { timestamps: false }
  }
)

/**
 * Load the models and make them available
 * @memberof module: index/sequelizeIndex
 * @const
 */
const models = {
  User: sequelize.import('./user'),
  Service: sequelize.import('./service'),
  Event: sequelize.import('./event'),
  Tag: sequelize.import('./tag')
}

/**
 * associate all the models
 */
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models
