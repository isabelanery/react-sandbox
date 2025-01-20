'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "kungfu@panda.com",
        password: await bcrypt.hash("password", 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("Users", { email: "kungfu@panda.com" }, {});
  }
};
