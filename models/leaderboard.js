'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leaderboard.init({
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    genreId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    fullMarks: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userScore: {
      allowNull: false,
      type: DataTypes.DECIMAL(10,2)
    },
    quizGivenTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Leaderboard',
  });
  return Leaderboard;
};