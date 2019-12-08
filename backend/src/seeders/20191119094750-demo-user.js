module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                username: 'admin',
                email: 'admin@test.ch',
                firstname: 'Mr.',
                lastname: 'Godlike',
                bio: 'I am right because I have all the rights.',
                role: 'Admin',
                // password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'Jony',
                email: 'jony@test.com',
                firstname: 'John',
                lastname: 'Johnathan',
                bio: 'John does his best, and it\'s mostly enough.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'jane',
                email: 'jane@test.com',
                firstname: 'Janette',
                lastname: 'Doe',
                bio: 'Old food. I mean, old school food.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'gelateriaDiBerna',
                email: 'gelatiera@test.com',
                firstname: 'Sergio',
                lastname: 'Berlusconi',
                bio: 'Beste Glace in der Stadt. Öffnungszeiten verhandelbar.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'domi',
                email: 'domi@test.com',
                firstname: 'Dominik',
                lastname: 'Fischli',
                bio: 'Mediocre shoe-cleaner by day, mediocre DJ by night.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'bluemli',
                email: 'blume@test.com',
                firstname: 'Jasmin',
                lastname: 'Bluemli',
                bio: 'Wieso deiner Mutter Insulin besorgen, wenn es für den selben Preis 1000 Rosen gibt?',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'lino',
                email: 'lino@test.com',
                firstname: 'Lino',
                lastname: 'Hess',
                bio: 'Ob Party\'s organisieren oder Taxi fahren, ich kann beides kaum.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'yael',
                email: 'yael@test.com',
                firstname: 'Yael',
                lastname: 'Van Dok',
                bio: 'World famous DJ.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'losHermanosGuapos',
                email: 'guac@jon.com',
                firstname: 'Antonio',
                lastname: 'Rodriguez',
                bio: 'guac guac guac guac guac guac guac',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'openCinema',
                email: 'cinema@jon.com',
                firstname: 'Franz',
                lastname: 'Weber',
                bio: 'Frische Luft und frische Filme, fast besser als Geld.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'moriarty',
                email: 'moriarty@test.com',
                firstname: 'Luca',
                lastname: 'Bulletti',
                bio: 'Basically Tony Stark but I sell meat.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'pittaLover',
                email: 'pittas@test.com',
                firstname: 'Unregistered',
                lastname: 'Immigrant',
                bio: 'Auge um Auge, Pitta um Pitta.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'rum4all',
                email: 'baccardi@test.com',
                firstname: 'Jack',
                lastname: 'Sparrow',
                bio: 'You look like you need a drink.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            },
            {
                username: 'wingZ',
                email: 'buffallo@test.com',
                firstname: 'Buff',
                lastname: 'Billy',
                bio: 'No better wings to make you fly.',
                role: 'User',
                //password: hello
                password: 'd578ffbc858c13667c19aff5c8064c46eb7025ae6c6d240c457f9b0903ab165f',
                salt: 'xhFsLZbTBSTfnnL+8uxr8A==',
            }
        ]);

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
