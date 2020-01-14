var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (request, response) => {
  var age = request.query.age
  if (age === 'youngest'){
    database('olympians')
      .min('age')
      .first()
      .then(minAge => {
        database('olympians')
          .where('age', minAge.min)
          .select('name', 'team', 'age', 'sport')
          .groupBy('name', 'team', 'age', 'sport')
          .count('medal as total_medals_won')
          .then(youngestOlympian => {
            response.status(200).send({youngestOlympian})
          })
      })
  } else if (age === 'oldest') {
    database('olympians')
      .max('age')
      .first()
      .then(maxAge => {
        database('olympians')
          .where('age', maxAge.max)
          .select('name', 'team', 'age', 'sport')
          .groupBy('name', 'team', 'age', 'sport')
          .count('medal as total_medals_won')
          .then(oldestOlympian => {
            response.status(200).send({oldestOlympian})
          })
      })
  } else {
    database('olympians')
      .select('name', 'team', 'age', 'sport')
      .groupBy('name', 'team', 'age', 'sport')
      .count('medal as total_medals_won')
      .then(allOlympians => {
        var data = {olympians: allOlympians}
        response.status(200).send(data)
    })
  }
})

module.exports = router;
