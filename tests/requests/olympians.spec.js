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
   })
    it('should get all olympians', async() => {
      const res = await request(app).get("/api/v1/olympians")

      expect(res.statusCode).toBe(200)

      expect(res.body).toHaveProperty('olympians')

      console.log(res.body)
      // expect(res.body.olympians[0]).toHaveProperty('name')

      // expect(res.body.olympians[0]).toHaveProperty('team')
      // expect(res.body.olympians[0]).toBe("Australia")
    })

    xit('should generate error message for sad path', async() => {
      const res = await request(app).get("/api/v1/olympians")

      expect(res.statusCode).toBe(404)
      expect(res.body.error).toBe("No olympians found")
    })

  afterEach(() => {
    database.raw('truncate table olympians cascade');
  });
});
