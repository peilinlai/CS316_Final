'use strict';
module.exports = function(sequelize, DataTypes) {
  var Offering = sequelize.define('Offering', {
    RestaurantId: DataTypes.INTEGER,
    offering_name: DataTypes.STRING,
    offering_price: DataTypes.FLOAT,
    offering_rating: DataTypes.FLOAT
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