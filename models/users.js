const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Users = sequelize.define('users', {
  // Model attributes are defined here
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false    
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false    
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false    
  }
});

module.exports = Users;