var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
	res.sendFile('Front-End/public/index.html', { root: "/Users/wenqinwang/Desktop/CS316/project" });
  //res.render('index', { title: 'Home Page' });
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

//add a new offering:
/*
$ curl --data "restaurant_id=1&offering_name=chicken noodle soup&offering_price=4.99&offering_rating=3.57" http://127.0.0.1:3000/offerings
$ curl --data "restaurant_id=1&&offering_name=blueberry muffin &offering_price=2.45&offering_rating=3.88" http://127.0.0.1:3000/offerings
*/
router.post('/offerings', function(req,res){
	models.Offering.create({
		RestaurantId: req.body.restaurant_id,
    	offering_name: req.body.offering_name,
    	offering_price: req.body.offering_price,
    	offering_rating: req.body.offering_rating
	}).then(function(offering){
		res.json(offering);
	});
});


// update single offering
/* example: to update the blueberry muffin price: 
$ curl -X PUT --data "offering_price=2.80" http://127.0.0.1:3000/offerings/2
*/
router.put('/offerings/:id', function(req, res) {
  models.Offering.find({
    where: {
      id: req.params.id
    }
  }).then(function(offering) {
    if(offering){
      offering.updateAttributes({
        RestaurantId: req.body.restaurant_id,
        offering_name: req.body.offering_name,
        offering_price: req.body.offering_price,
        offering_rating: req.body.offering_rating
      }).then(function(todo) {
        res.send(todo);
      });
    }
  });
});

// delete a single offering
/*
$ curl -X DELETE http://127.0.0.1:3000/offerings/1
*/
router.delete('/offerings/:id', function(req, res) {
  models.Offering.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(offering) {
    res.json(offering);
  });
});

//get all restaurant
router.get('/restaurants',function(req,res){
	models.Restaurant.findAll({}).then(function(restaurants){
		res.json(restaurants);
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

//get a single restaurant with all its offerings
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