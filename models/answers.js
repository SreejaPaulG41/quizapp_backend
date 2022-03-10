'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Answers.init({
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
    givenAnswerDetails: {
      allowNull: false,
      type: DataTypes.JSONB
    }
  }, {
    sequelize,
    modelName: 'Answers',
  });
  return Answers;
};