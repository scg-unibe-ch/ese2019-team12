export default function createMockUsers (User) {
  return User.bulkCreate([
    {
      id: 1,
      username: 'admin',
      email: 'admin@test.ch',
      firstname: 'Admin',
      lastname: 'Johnson',
      bio: 'Born to administrate',
      role: 'Admin',
      // password: hello
      password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
      salt: 'xhFsLZbTBSTfnnL+8uxr8A=='
    },
    {
      id: 2,
      username: 'user',
      email: 'user@test.com',
      firstname: 'User',
      lastname: 'Regular',
      bio: 'A regular stupid user',
      role: 'User',
      // password: hello
      password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
      salt: 'xhFsLZbTBSTfnnL+8uxr8A=='
    },
    {
      id: 3,
      username: 'temp_user',
      email: 'dead1@test.com',
      firstname: 'Dead',
      lastname: 'User',
      bio: 'A user who gets deleted',
      role: 'User',
      // password: hello
      password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
      salt: 'xhFsLZbTBSTfnnL+8uxr8A=='
    },
    {
      id: 4,
      username: 'temp_user_2',
      email: 'dead2@test.com',
      firstname: 'Dead',
      lastname: 'User',
      bio: 'A user who deletes himself',
      role: 'User',
      // password: hello
      password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
      salt: 'xhFsLZbTBSTfnnL+8uxr8A=='
    },
    {
      id: 5,
      username: 'bob',
      email: 'bob@test.com',
      firstname: 'Bob',
      lastname: 'Billy',
      bio: 'Suffers eternal torture by MITM attacks',
      role: 'User',
      // password: hello
      password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
      salt: 'xhFsLZbTBSTfnnL+8uxr8A=='
    },
    {
      id: 6,
      username: 'temp_admin',
      email: 'dead3@test.com',
      firstname: 'Dead',
      lastname: 'Admin',
      bio: 'A admin who gets deleted',
      role: 'admin',
      // password: hello
      password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
      salt: 'xhFsLZbTBSTfnnL+8uxr8A=='
    }
  ])
}
