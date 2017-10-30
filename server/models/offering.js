'use strict';
module.exports = function(sequelize, DataTypes) {
  var Offering = sequelize.define('Offering', {
    RestaurantId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    rating: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        Offering.belongsTo(models.Restaurant);
        // associations can be defined here
      }
    }
  });
  return Offering;
};