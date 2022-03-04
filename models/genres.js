const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Genres = sequelize.define('genres', {
  // Model attributes are defined here
    genreId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    genreName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  
});

module.exports = Genres;