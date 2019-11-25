module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Jony',
      email: 'jony@jon.com',
      firstname: 'Joe',
      lastname: 'Doe',
      bio: 'Ohne Joe keine Doe',
      role: 'User',
      //password: hello
      password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
      salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
    },
    {
      username: 'admin',
      email: 'test@gmail.ch',
      firstname: 'Dummy',
      lastname: 'Hummy',
      bio: 'dummy the hummy humt the dummy',
      role: 'Admin',
      // password: hello
      password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
      salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
