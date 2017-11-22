'use strict';

const express = require('express');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();

// app.get('/restaurants', (req, res) => {
//   knex.select('id', 'name', 'cuisine', 'borough')
//     .from('restaurants')
//     .limit(10)
//     .then(results => res.json(results));
// });



// ADD ANSWERS HERE

// app.get('/restaurants/:id', (req, res) => {
//   knex
//     .select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
//     .from('restaurants')
//     .where('restaurants.id', req.params.id)
//     .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//     .orderBy('date', 'desc')
//     .limit(1)
//     .then(results => res.json(results));
// }); 

// app.get('/restaurants', (req, res) => {
//   knex
//     .select('id', 'name', 'cuisine', 'borough')
//     .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode) as address"))
//     .from('restaurants')
//     .limit(10)
//     .then(results => res.json(results));
// });

app.get('/restaurants/:id', (req, res) => {
  knex.first('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
    .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode ) as address"))
    .from('restaurants')
    .where('restaurants.id', req.params.id)
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')    
    .orderBy('date', 'desc')
    .limit(5)
    .then(results => res.json(results));
});



app.listen(PORT);
