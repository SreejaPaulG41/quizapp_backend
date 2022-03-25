const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres@localhost:5432/quizapp');
//postgres://username:password@host:portNo/dbName
const sequelize = new Sequelize('postgres://pgtbwuddnkvirh:f3be2babf8938cd374d38f2c130ce9eb478ecc67dd2d159516351c13e1334334@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d3oua6a8bm6ejo');
module.exports = sequelize;