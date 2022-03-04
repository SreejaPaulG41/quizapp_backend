const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Questions = sequelize.define('questions', {
    // Model attributes are defined here
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
    timeAlloted:  {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    answerOptions:{
        type: DataTypes.JSONB,
        allowNull: false,
    },

});

module.exports = Questions;