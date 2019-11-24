// User model:
//
// username:  string (unique)
// email:     string (unique)
// firstname: string
// lastname:  string
// role:      string
// password:  string | Treated as function by sequelize,
// salt:      string | to prevent those values from showing up in findAll requests etc.

import { generateSalt, encryptPassword, checkPassword } from '../helpers/crypt.helper';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    role: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('salt')
      }
    },
  }, {});
  User.associate = models => {
    User.hasMany(models.Service, { onDelete: 'CASCADE' });
    User.hasMany(models.Event, { onDelete: 'CASCADE' });
  };

  function updatePassword(user) {
    user.salt = generateSalt();
    user.password = encryptPassword(user.password(), user.salt());
  }
  User.beforeCreate((user) => {
    updatePassword(user);
  });
  User.beforeUpdate((user) => {
    if(user.changed('password')) {
      updatePassword(user);
    }
  });


  return User;
};

export default user;
