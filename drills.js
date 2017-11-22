'use strict';

const { DATABASE } = require('./config');
// const knex = require('knex')(DATABASE);

const knex = require('knex')({
  client: 'pg',
  connection: {
      database: 'dev-restaurants-app'
  },
});

// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 
// knex
//   .select()
//   .from('restaurants')
//   .limit(2)
//   .debug(true)
//   .then(results => console.log(results));

// knex 
//   .select()
//   .from('restaurants')
//   .then(results => console.log(results));

// knex  
//   .select()
//   .from('restaurants')
//   .where({cuisine: 'Italian'})
//   .then(results => console.log(results));

// knex  
//   .select()
//   .from('restaurants')
//   .where({cuisine: 'Italian'})
//   .limit(10)
//   .then(results => console.log(results));

// knex 
//   .select()
//   .count()
//   .from('restaurants')
//   .where({cuisine: 'Thai'})
//   .then(results => console.log(results));

// knex 
//   .select()
//   .count()
//   .from('restaurants')
//   .debug(true)
//   .then(results => console.log(results));

// knex 
//   .select()
//   .count()
//   .from('restaurants')
//   .where({cuisine: 'Thai'})
//   .where({address_zipcode: '11372'})
//   .then(results => console.log(results));

// knex 
//   .select('id', 'name')
//   .from('restaurants')
//   .where({cuisine: 'Italian'})
//   .orWhere({address_zipcode: '10012'})
//   .orWhere({address_zipcode: '10013'})
//   .orWhere({address_zipcode: '10013'})
//   .orderBy('name', 'acs')
//   .limit(5)
//   .debug(true)
//   .then(results => console.log(results));

// knex('restaurants')
//   .insert({
//     name: 'Byte Cafe',
//     borough: 'Brooklyn',
//     cuisine: 'coffee',
//     address_building_number: '123',
//     address_street: 'Atlantic Avenue',
//     address_zipcode: '11231'})
//     .then(results => console.log(results));

// knex
//   .select()
//   .from('restaurants')
//   .where({name: 'Byte Cafe'})
//   .then(results => console.log(results));

// knex('restaurants')
//   .returning('name')
//   .insert({
//     name: 'Coding Cafe',
//     borough: 'Brooklyn',
//     cuisine: 'coffee',
//     address_building_number: '345',
//     address_street: 'Keyboard Avenue',
//     address_zipcode: '11231'})
//     .then(results => console.log(results));

// knex('restaurants')
//   .returning(['name', 'id'])
//   .insert([{
//     name: 'Keyboard Cafe',
//     borough: 'Brooklyn',
//     cuisine: 'coffee',
//     address_building_number: '89',
//     address_street: 'CPU Street',
//     address_zipcode: '11231'},
//     {
//       name: 'JS Cafe',
//       borough: 'Brooklyn',
//       cuisine: 'coffee',
//       address_building_number: '345',
//       address_street: 'DOM Road',
//       address_zipcode: '11231'},
//       {
//         name: 'FullStack Frites',
//         borough: 'Brooklyn',
//         cuisine: 'American',
//         address_building_number: '124',
//         address_street: 'Modular Road',
//         address_zipcode: '11231'}])
//     .then(results => console.log(results));
 
// knex
//   .select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
//   .from('restaurants')
//   .where('restaurants.id', 1)
//   .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//   .orderBy('date', 'desc')
//   .limit(1)
//   .then(results => console.log(results));

 (function(){
  knex 
    .select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
    .from('restaurants')
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
    .orderBy('date', 'desc')
    .limit(10)
    .then(results => {

      const hydrated = {};
      results.forEach(row => {
        if(!(row.id in hydrated)){
          hydrated[row.id] = {
            name: row.name,
            cuisine: row.cuisine,
            borough: row.borough,
            grades: []
          }
        }
        hydrated[row.id].grades.push({
          gradeId: row.gradeId,
          grade: row.grade,
          score: row.score
        });
      });
      console.log(JSON.stringify(hydrated, null, 2));
    });
 })()   



// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});