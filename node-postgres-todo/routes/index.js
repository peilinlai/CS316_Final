var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/food';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/*side note: 
before running in terminal, 
need to specify the current user and database we are looking at:  
$psql -U Username DatabaseName 
in my case its: psql -U wenqinwang food
*/

/*too test the post method / to create a food:
* $curl --data "name=abp&location=floor0west&origin=american&rating=3.00" http://127.0.0.1:3000/api/restaurants/create
* $curl --data "name=gingerSoy&location=floor1North&origin=Chinese&rating=4.15" http://127.0.0.1:3000/api/restaurants/create
* $curl --data "name=farmstead&location=floor1central&origin=american&rating=4.30" http://127.0.0.1:3000/api/restaurants/create
* It should return back the query result in terminal. 
*/

router.post('/api/restaurants/create', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {name: req.body.name, location: req.body.location, origin: req.body.origin, rating: req.body.rating};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO Restaurant(name, location, origin, rating) VALUES($1, $2, $3, $4)',
    [data.name, data.location, data.origin, data.rating]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM Restaurant ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


/* GET all restaurant 
* To Test: end point in web page: 
localhost:3000/api/restaurants
*/
router.get('/api/restaurants', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {name: req.body.name, location: req.body.location, origin: req.body.origin, rating: req.body.rating};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM Restaurant Order by id asc');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/* GET  restaurant by restaurant id
* To Test: end point in web page: 
localhost:3000/api/restaurants/4
*/

router.get('/api/restaurants/:restaurant_id', (req, res, next) => {
  const results = [];
  //Grab data from the URL parameters
  const id = req.params.restaurant_id;
  // Grab data from http request
  const data = {name: req.body.name, location: req.body.location, origin: req.body.origin, rating: req.body.rating};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM Restaurant where id = ($1)', [id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


/*
Delete a Restaurant by its id: 
$ curl -X DELETE http://127.0.0.1:3000/api/restaurants/2
*/

router.delete('/api/restaurants/:restaurant_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.restaurant_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM Restaurant WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM Restaurant ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


