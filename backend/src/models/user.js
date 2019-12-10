import { generateSalt, encryptPassword } from '../helpers/crypt.helper'

/**
 * User model to be imported by sequelize
 *
 * @param {object} sequelize - Sequelize instance
 * @param {object} DataTypes - Sequelize Datatypes
 *
 * User has many Services.
 * User has many Events.
 *
 * Before each password save / update, the password is salted and hashed.
 *
 * @typedef {Object} User
 * @property {string} username  - has to be unique
 * @property {string} email     - has to be unique, has to be a valid email address
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} bio       - short description of the user
 * @property {string} role      - role, can be 'Admin' or 'User'
 * @property {string} password  - password, salted and hashed
 * @property {string} salt      - salt of the password
 * @property {string} image     - filename of the saved image
 */
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    bio: DataTypes.STRING,
    role: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      get () {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: DataTypes.STRING,
      get () {
        return () => this.getDataValue('salt')
      }
    },
    image: DataTypes.STRING
  }, {})
  User.associate = models => {
    User.hasMany(models.Service, { onDelete: 'CASCADE' })
    User.hasMany(models.Event, { onDelete: 'CASCADE' })
  }

  function updatePassword (user) {
    user.salt = generateSalt()
    user.password = encryptPassword(user.password(), user.salt())
  }
  User.beforeCreate((user) => {
    updatePassword(user)
  })
  User.beforeUpdate((user) => {
    if (user.changed('password')) {
      updatePassword(user)
    }
  })

  /**
   * Is this user a admin?
   *
   * @returns whether or not the user is an admin
   */
  User.prototype.isAdmin = function () {
    return this.role === 'Admin'
  }

  return User
}

export default user
