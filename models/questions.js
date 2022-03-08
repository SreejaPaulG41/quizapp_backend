'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  questions.init({
    questionId: DataTypes.INTEGER,
    questionText: DataTypes.STRING,
    questionMark: DataTypes.INTEGER,
    timeAlloted: DataTypes.INTEGER,
    answerOptions: DataTypes.JSONB,
    genreId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'questions',
  });
  return questions;
};