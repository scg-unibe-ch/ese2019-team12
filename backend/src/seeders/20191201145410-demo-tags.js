'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [
        {
            name: "party"
        },
        {
            name: "food"
        },
        {
            name: "rave"
        },
        {
            name: "yum"
        },
        {
            name: "oldschool"
        },
        {
            name: "dinner"
        },
        {
            name: "ice cream"
        },
        {
            name: "tasty"
        },
        {
            name: "calories"
        },
        {
            name: "funky"
        },
        {
            name: "DJ"
        },
        {
            name: "music"
        },
        {
            name: "clean"
        },
        {
            name: "murder"
        },
        {
            name: "shoes"
        },
        {
            name: "flowers"
        },
        {
            name: "colorful"
        },
        {
            name: "pretty"
        },
        {
            name: "safe"
        },
        {
            name: "home"
        },
        {
            name: "taxi"
        },
        {
            name: "disco"
        },
        {
            name: "mad"
        },
        {
            name: "guacamole"
        },
        {
            name: "club"
        },
        {
            name: "cinema"
        },
        {
            name: "open air"
        },
        {
            name: "LOTR"
        },
        {
            name: "meatballs"
        },
        {
            name: "pitta"
        },
        {
            name: "bar"
        },
        {
            name: "beer"
        },
        {
            name: "fun"
        },
        {
            name: "wings"
        },
        {
            name: "spicy"
        },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
