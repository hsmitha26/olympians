var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test GET api/v1/olympians', () => {
  beforeEach(async () => {
     await database.raw('truncate table olympians cascade');
     // insert test data here
     await database.insert({
       id: 1,
       name: "Name 1",
       sex: "F",
       age: 20,
       height: 160,
       weight: 120,
       team: "Team 1",
       medal: "Medal 1",
       sport: "Sport 1",
       event: "Event 1",
       games: "Game 1"
     }).into('olympians');
     await database.insert({
       id: 2,
       name: "Name 2",
       sex: "F",
       age: 22,
       height: 170,
       weight: 125,
       team: "Team 2",
       medal: "Medal 2",
       sport: "Sport 2",
       event: "Event 2",
       games: "Game 2"
     }).into('olympians');
     await database.insert({
       id: 3,
       name: "Name 3",
       sex: "M",
       age: 24,
       height: 180,
       weight: 130,
       team: "Team 3",
       medal: "Medal 3",
       sport: "Sport 3",
       event: "Event 3",
       games: "Game 3"
     }).into('olympians');
     await database.insert({
       id: 4,
       name: "Name 4",
       sex: "M",
       age: 26,
       height: 190,
       weight: 135,
       team: "Team 4",
       medal: "Medal 4",
       sport: "Sport 4",
       event: "Event 4",
       games: "Game 4"
     }).into('olympians');
   })
    it('should get all olympians', async() => {
      const res = await request(app).get("/api/v1/olympians")

      expect(res.statusCode).toBe(200)

      expect(res.body).toHaveProperty('olympians')

      expect(res.body.olympians.length).toBe(4)
      expect(res.body.olympians[0]).toHaveProperty('name')
      expect(res.body.olympians[0].name).toBe("Name 3")

      expect(res.body.olympians[0]).toHaveProperty('team')
      expect(res.body.olympians[0].team).toBe("Team 3")
    })

    it('should get youngest olympian', async() => {
      const res = await request(app).get("/api/v1/olympians?age=youngest")

      expect(res.statusCode).toBe(200)
      expect(res.body.youngestOlympian[0]).toHaveProperty('age')
      expect(res.body.youngestOlympian[0].age).toBe(20)
    })

    it('should get oldest olympian', async() => {
      const res = await request(app).get("/api/v1/olympians?age=oldest")

      expect(res.statusCode).toBe(200)
      expect(res.body.oldestOlympian[0]).toHaveProperty('age')
      expect(res.body.oldestOlympian[0].age).toBe(26)
    })

    it('should get olympian stats', async() => {
      const res = await request(app).get("/api/v1/olympian_stats")

      expect(res.statusCode).toBe(200)

      expect(res.body.olympian_stats).toHaveProperty('total_competing_olympians')
      expect(res.body.olympian_stats.total_competing_olympians).toBe("4")

      expect(res.body.olympian_stats).toHaveProperty('average_age')
      expect(res.body.olympian_stats.average_age).toBe("23.0")
    })

  afterEach(() => {
    database.raw('truncate table olympians cascade');
  });
});
