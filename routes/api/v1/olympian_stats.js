var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

async function findTotalOlympians() {
  try {
    let response = await database('olympians').countDistinct('name as total_competing_olympians')
    return response;
  } catch (error) {
    return error;
  }
}

async function avgWeightMale(){
  try {
    let response = await database('olympians')
                          // .select(database.raw('DISTINCT (name)'))
                          .where({'sex': 'M'})
                          // .select(database.raw('DISTINCT name ROUND(AVG(weight))'))
                          .select(database.raw('ROUND(AVG(weight)) as male_olympians'))
    return response;
  } catch (error) {
    return error;
  }
}

async function avgWeightFemale(){
  try {
    let response = await database('olympians')
                          .where({'sex': 'F'})
                          // .select(database.raw('DISTINCT name team'))
                          // .select(database.raw('DISTINCT name ROUND(AVG(weight))'))
                          .select(database.raw('ROUND(AVG(weight)) as female_olympians'))
    return response;
  } catch (error) {
    return error;
  }
}

async function avgAge(){
  try {
    let response = await database('olympians').select(database.raw('ROUND(AVG(age), 1) as average_age'))
    return response;
  } catch (error) {
    return error;
  }
}

router.get('/', async function (request, response) {
  let totalOlympians = await findTotalOlympians()
  let male_olympians = await avgWeightMale()
  let female_olympians = await avgWeightFemale()
  let avg_age = await avgAge()
    var data = {total_competing_olympians: totalOlympians[0].total_competing_olympians, average_male_weight_in_kgs: male_olympians[0].male_olympians, average_female_weight_in_kgs: female_olympians[0].female_olympians, average_age: avg_age[0].average_age}
    response.status(200).send({olympian_stats: data})
})

module.exports = router;
