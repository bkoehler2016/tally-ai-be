const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const { goodRegistration, goodLogin, badLogin, badRegistration } = require('../test_params/index');


describe('Successful Auth-Router Tests', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  });

  it("tests are running with DB_ENV set to 'production'", () => {
    expect(process.env.ENVIRONMENT).toBe("production");
  });

  describe("registration", () => {
    describe("POST /api/auth/register", () => {
      it("should return a 201 created status and a JSON type", () => {
        return request(server)
          .post("/api/auth/register")
          .send(goodRegistration)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.type).toEqual("application/json");
          });
      });
    });
  })

  describe("login", () => {
    it("should return a 200 OK status and a JSON type", () => {
      return request(server)
        .post("/api/auth/login")
        .send(goodLogin)
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.type).toEqual('application/json');
        });
    });
  });
})
describe('Unuccessful Auth-Router Tests', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  });

  it("tests are running with DB_ENV set to 'production'", () => {
    expect(process.env.ENVIRONMENT).toBe("production");
  });

  describe("registration", () => {
    describe("POST /api/auth/register", () => {
      it("should return a 401 not found status and a JSON type", () => {
        return request(server)
          .post("/api/auth/register")
          .send(badRegistration)
          .then(res => {
            expect(res.status).toBe(400);
            expect(res.type).toEqual("application/json");
          });
      });
    });
  })

  describe("login", () => {
    it("should return a 400 Invalid status and a JSON type", () => {
      return request(server)
        .post("/api/auth/login")
        .send(goodLogin)
        .then(res => {
          expect(res.status).toBe(401);
          expect(res.type).toEqual('application/json');
        });
    });
  });
})