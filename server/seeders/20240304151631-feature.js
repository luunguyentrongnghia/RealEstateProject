"use strict";
const { data } = require("../utils/constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("features", data.features);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("features", null, {});
  },
};
