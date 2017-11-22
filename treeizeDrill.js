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

const Treeize   = require('treeize');
const restaurants    = new Treeize();

(function(){
    knex 
        .select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
        .from('restaurants')
        .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
        .orderBy('date', 'desc')
        .limit(10)
        .then(results => {
            restaurants.grow(results);
            console.log(JSON.stringify(restaurants, null, 2));
    });
})()

knex.destroy().then(() => {
    console.log('database connection closed');
  });