'use strict';
module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    origin: DataTypes.STRING,
    rating: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        Restaurant.hasMany(models.Offering);
        // associations can be defined here
      }
    }
  });
  return Restaurant;
};