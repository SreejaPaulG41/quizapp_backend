'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questions.belongsTo(models.Genres);
    }
  }
  Questions.init({
    questionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    questionText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionMark: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeAlloted: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answerOptions: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    genreId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};