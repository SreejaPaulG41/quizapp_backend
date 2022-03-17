'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leaderboards', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      genreId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      fullMarks: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userScore: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      quizGivenTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leaderboards');
  }
};