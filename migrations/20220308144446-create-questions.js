'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      questionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionText: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      questionMark: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      timeAlloted: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      answerOption: {
        allowNull: false,
        type: Sequelize.JSONB
      },
      genreId: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.addConstraint('Questions', {
      type: 'foreign key',
      fields: ['genreId'],
      references: { //Required field
        table: 'Genres',
        field: 'genreId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};