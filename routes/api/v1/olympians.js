var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (request, response) => {
  database('olympians')
    .select('name', 'team', 'age', 'sport')
    .groupBy('name', 'team', 'age', 'sport')
    .count('medal as total_medals_won')
    .then(allOlympians => {
      var data = {olympians: allOlympians}
      response.status(200).send(data)
    })
})

module.exports = router;
