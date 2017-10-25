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
need to specify the current user and database we are looking at by running: 
psql -U Username DatabaseName 
in my case its: psql -U wenqinwang food
*/

//to create some restaurant first..
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

//too test the query above:
//$curl --data "name=abp&location=floor0west&origin=american$rating=3.00" http://127.0.0.1:3000/api/restaurants/create

router.get('/api/restaurants/?name = xxx', (req, res, next) => {
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




