var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//route for creating a new restaurant
/*
To add a new restaurant, run - gulp - 
$ curl --data "name=abp&location=firstfloor&origin=american&rating=3.00" http://127.0.0.1:3000/restaurants/create
*/
router.post('/restaurants/create', function(req, res) {
  models.Restaurant.create({
    name: req.body.name,
    location: req.body.location,
    origin: req.body.origin,
    rating: req.body.rating
  }).then(function(restaurant) {
    res.json(restaurant);
  });
});

//get all restaurant
router.get('/restaurants',function(req,res){
	models.Restaurant.findAll({}).then(function(restaurants){
		res.json(restaurants);
	});
});

// get a single restaurant
// router.get('/restaurants/:id', function(req, res) {
//   models.Restaurant.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(restaurant) {
//     res.json(restaurant);
//   });
// });


//add a new offering:
/*
$ curl --data "restaurant_id=1&food_id=1&name=chicken noodle soup&price=4.99&rating=3.57" http://127.0.0.1:3000/offerings
$ curl --data "restaurant_id=1&food_id=2&name=blueberry muffin &price=2.45&rating=3.88" http://127.0.0.1:3000/offerings
*/
router.post('/offerings', function(req,res){
	models.Offering.create({
		RestaurantId: req.body.restaurant_id,
    	FoodId: req.body.food_id,
    	name: req.body.name,
    	price: req.body.price,
    	rating: req.body.rating
	}).then(function(offering){
		res.json(offering);
	});
});

//get all offering
router.get('/offerings', function(req,res){
	models.Offering.findAll({}).then(function(offerings){
		res.json(offerings);
	});
});

// get a single offering
router.get('/offerings/:id', function(req, res) {
  models.Offering.find({
    where: {
      id: req.params.id
    }
  }).then(function(offering) {
    res.json(offering);
  });
});


router.get('/restaurants/:id',function(req,res){
	models.Restaurant.findAll({
		include:[
			{
				model:models.Offering,
				where:{
					RestaurantId:req.params.id
				}
			}
		]
	}).then(function(restaurant){
		var success = "success";
		var error = "none";
		if (restaurant.length <= 0){
			success = "error";
			error = "The restaurant does not exist";
		}
		res.json({
			"status":success,
			"error":error,
			"data": restaurant});
	});
});



module.exports = router;