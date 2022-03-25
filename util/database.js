require('dotenv').config();

const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres@localhost:5432/quizapp');
//postgres://username:password@host:portNo/dbName
const sequelize = new Sequelize(process.env.DATABASE_URL);
module.exports = sequelize;