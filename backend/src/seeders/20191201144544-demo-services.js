'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services', [
        {
            userId: 2,
            title: 'John\'s failing business',
            description: 'Catering Service by John himself. All homecooked, but not that well.',
            price: 50
        },
        {
            userId: 3,
            title: 'Jane\'s trashy food',
            description: 'Some pretty darn fine food made by Jane herself. Anyone who says something else on tripadvisor is lying.',
            price: 30
        },
        {
            userId: 4,
            title: 'Gelateria di Berna',
            description: 'Gelateria di Berna kommt bei dir vorbei. Geniesse alle unsere Sorten bequem von deiner Veranda aus.',
            price: 10
        },
        {
            userId: 5,
            title: 'DJ Domi und die Funky Five',
            description: 'DJ Domi und die Funky Five treten bei euch zu Hause auf. Funky beats von DJ Domi mit harmonischen sounds der Funky Five.',
            price: 150
        },
        {
            userId: 2,
            title: 'Jim\'s clean up crew',
            description: 'Cleaning for your "Party". If you need any "cleaning", call Jim.',
            price: 1000
        },
        {
            userId: 5,
            title: 'Domi\'s Shoecleaners',
            description: 'Cleaning shoes is what I do.',
            price: 2
        },
        {
            userId: 6,
            title: 'Blossoming Flowers',
            description: 'Der Blumenlieferant für Grossanlässe, Schweizweit.',
            price: 20
        },
        {
            userId: 7,
            title: 'Lino\'s Taxi Service',
            description: 'Zu lange getanzt? Zu viel getrunken? Lass dich entspannt und gemütlich nach Hause chaufieren von Lino\'s Chauffeuren.',
            price: 45
        },
        {
            userId: 8,
            title: 'Yael\'s mad DJ-Set',
            description: 'DJ Yael an den Turntables. Beste DJ-Sets direkt hier.',
            price: 500
        },
        {
            userId: 9,
            title: 'Guacamole Guapos',
            description: 'Ven a buscar la mejor guacamole en la ciudad. Guacamole por todo el mundo.',
            price: 15
        },
        {
            userId: 7,
            title: 'Lino\'s Club',
            description: 'Coolest venue in town. We even have a shoecleaner.',
            price: 1500
        },
        {
            userId: 10,
            title: 'OpenCinemaCrew',
            description: 'Ihr privates Kino Erlebnis. Egal ob für Kindergeburtstage oder Firmenanlässe, wir zeigen Herr der Ringe überall',
            price: 35
        },
        {
            userId: 11,
            title: 'Bulletti\'s Bulletten',
            description: 'Die besten Bulletten in der Stadt. Kommt und probiert Lucas\' saftige Bulletten.',
            price: 7
        },
        {
            userId: 12,
            title: 'Pitteria',
            description: 'Leckere Pittas in Bern',
            price: 22
        },
        {
            userId: 13,
            title: 'Baccardi Bar Services',
            description: 'Verschiedenste Barkeeper werden entzücken mit Mixkünsten der Extraklasse.',
            price: 350
        },
        {
            userId: 14,
            title: 'Buffallow Wings',
            description: 'Get the spiciest Chicken-Wings at your party.',
            price: 17
        },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Services', null, {});
  }
};
