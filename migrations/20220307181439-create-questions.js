'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      questionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      questionText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      questionMark: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timeAlloted: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      answerOptions: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      genreId: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.addConstraint('questions', {
      type: 'foreign key',
      fields: ['genreId'],
      references: { //Required field
        table: 'genres',
        field: 'genreId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  }
};