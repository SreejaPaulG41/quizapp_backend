const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/quizapp');
//postgres://username:password@host:portNo/dbName
module.exports = sequelize;