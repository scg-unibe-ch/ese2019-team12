'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services_tags', [
        {
            tagName: "food",
            serviceId: 1
        },
        {
            tagName: "yum",
            serviceId: 1
        },
        {
            tagName: "oldschool",
            serviceId: 2
        },
        {
            tagName: "dinner",
            serviceId: 2
        },
        {
            tagName: "food",
            serviceId: 2
        },
        {
            tagName: "ice cream",
            serviceId: 3
        },
        {
            tagName: "tasty",
            serviceId: 3
        },
        {
            tagName: "calories",
            serviceId: 3
        },
        {
            tagName: "funky",
            serviceId: 4
        },
        {
            tagName: "DJ",
            serviceId: 4
        },
        {
            tagName: "party",
            serviceId: 4
        },
        {
            tagName: "music",
            serviceId: 4
        },
        {
            tagName: "clean",
            serviceId: 5
        },
        {
            tagName: "murder",
            serviceId: 5
        },
        {
            tagName: "clean",
            serviceId: 6
        },
        {
            tagName: "shoes",
            serviceId: 6
        },
        {
            tagName: "flowers",
            serviceId: 7
        },
        {
            tagName: "colorful",
            serviceId: 7
        },
        {
            tagName: "pretty",
            serviceId: 7
        },
        {
            tagName: "safe",
            serviceId: 8
        },
        {
            tagName: "home",
            serviceId: 8
        },
        {
            tagName: "taxi",
            serviceId: 8
        },
        {
            tagName: "party",
            serviceId: 9
        },
        {
            tagName: "disco",
            serviceId: 9
        },
        {
            tagName: "mad",
            serviceId: 9
        },
        {
            tagName: "DJ",
            serviceId: 9
        },
        {
            tagName: "guacamole",
            serviceId: 10
        },
        {
            tagName: "food",
            serviceId: 10
        },
        {
            tagName: "club",
            serviceId: 11
        },
        {
            tagName: "party",
            serviceId: 11
        },
        {
            tagName: "shoes",
            serviceId: 11
        },
        {
            tagName: "cinema",
            serviceId: 12
        },
        {
            tagName: "open air",
            serviceId: 12
        },
        {
            tagName: "LOTR",
            serviceId: 12
        },
        {
            tagName: "meatballs",
            serviceId: 13
        },
        {
            tagName: "tasty",
            serviceId: 13
        },
        {
            tagName: "food",
            serviceId: 13
        },
        {
            tagName: "pitta",
            serviceId: 14
        },
        {
            tagName: "bar",
            serviceId: 15
        },
        {
            tagName: "beer",
            serviceId: 15
        },
        {
            tagName: "fun",
            serviceId: 15
        },
        {
            tagName: "wings",
            serviceId: 16
        },
        {
            tagName: "spicy",
            serviceId: 16
        },
        {
            tagName: "food",
            serviceId: 16
        },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
