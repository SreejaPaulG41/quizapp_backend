'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('genres', [
      {
        genreName: 'General Knowledge',
        genreId: 'GK01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        genreName: 'JavaScript',
        genreId: 'JS02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        genreName: 'React JS',
        genreId: 'RJS03',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        genreName: 'Science',
        genreId: 'SC04',
        createdAt: new Date(),
        updatedAt: new Date()
      },]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('genres', null, {});
  }
};
