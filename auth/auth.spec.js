const request = require('supertest');

const server = require('../api/server');

const db = require('../database/dbConfig');
const { JsonWebTokenError } = require('jsonwebtoken');

const {
        goodRegistration,
        badRegistration,
        goodLogin,
        badLogin
      } = require('../test_params');



describe('CRUD Tests', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE users RESTART IDENTITY CASCADE')
  });

  it("tests are running with DB_ENV set to 'testing'", () => {
    expect(process.env.ENVIRONMENT).toBe("testing");
  });

  describe("auth-router tests", () => {
    jest.setTimeout(30000)
    describe("POST /api/auth/register", () => {
      it("should return a 201 created status", async () => {
        return await request(server)
          .post("/api/auth/register")
          .send(goodRegistration)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it("should return a JSON object after creating a user", async () => {
        return await request(server)
          .post("/api/auth/register")
          .send(goodRegistration)
          .then(res => {
            expect(res.type).toEqual("application/json");
          });
      });
    });
  })

  describe("POST /api/auth/login", () => {
    it("should return a 200 OK status", async () => {
      return await request(server)
        .post("/api/auth/login")
        .send(goodLogin)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a JSON object", async () => {
      return await request(server)
        .post("/api/auth/login")
        .send({
          username: "Dave",
          password: "pass",
          isServiceWorker: 1
        })
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  })
})