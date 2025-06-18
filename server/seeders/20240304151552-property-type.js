"use strict";
const { data } = require("../utils/constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PropertyTypes", data.property_types);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PropertyTypes", null, {});
  },
};
