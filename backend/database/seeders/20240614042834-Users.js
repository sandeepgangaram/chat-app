"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        password: bcrypt.hashSync("1233pass", 10),
        gender: "male",
      },
      {
        firstName: "Bonnie",
        lastName: "Grace",
        email: "bonnie@gmail.com",
        password: "1233pass",
        gender: "female",
      },
      {
        firstName: "Christian",
        lastName: "Grey",
        email: "christian@gmail.com",
        password: "1233pass",
        gender: "male",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
