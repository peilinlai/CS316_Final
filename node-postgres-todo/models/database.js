const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/food';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
	//serial key can help with increasing id every time we create a new row;
 'CREATE TABLE Restaurant(id SERIAL PRIMARY KEY,name VARCHAR(256) NOT NULL,location VARCHAR(256),Origin VARCHAR(32) NOT NULL,rating DECIMAL(3,2))');
 // CREATE TABLE Food((id INTEGER NOT NULL PRIMARY KEY,name VARCHAR(32) NOT NULL UNIQUE); CREATE TABLE Offering(id INTEGER NOT NULL PRIMARY KEY, resturant_id INTEGER NOT NULL REFERENCES Resturant(id),food_id INTEGER NOT NULL REFERENCES Food(id),name VARCHAR(256) NOT NULL,price DECIMAL(5,2),rating DECIMAL(3,2))');

query.on('end', () => { client.end(); });