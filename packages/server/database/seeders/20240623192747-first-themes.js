'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('site_theme', [
      { theme: "dark", description: "Dark theme" },
      { theme: "light", description: "Light theme" }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('site_theme', null, {});
  }
};
