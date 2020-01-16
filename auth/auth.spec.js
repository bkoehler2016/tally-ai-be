const request = require('supertest');

const server = require('../api/server');

const db = require('../database/dbConfig');

describe('CRUD Tests', () => {
    beforeAll(async () => {
        await db("users").truncate();
    });

      it("tests are running with DB_ENV set to 'testing'", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });

describe("auth-router tests", () => {
        describe("POST /api/auth/register", () => {
          it("should return a 201 created status", () => {
            return request(server)
              .post("/api/auth/register")
              .send({
                username: "robert",
                password: "final",
                isServiceWorker: 1
              })
              .then(res => {
                expect(res.status).toBe(200);
              });
          });
          it("should return a JSON object after creating a user", () => {
            return request(server)
              .post("/api/auth/register")
              .send({
                username: "Dave",
                password: "pass",
                isServiceWorker: 1
              })
              .then(res => {
                expect(res.type).toEqual("application/json");
              });
          });
        });
    })

    describe("POST /api/auth/login", () => {
        it("should return a 200 OK status", () => {
          return request(server)
            .post("/api/auth/login")
            .send({
              username: "Dave",
              password: "pass",
              isServiceWorker: 1
            })
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
        it("should return a JSON object", () => {
          return request(server)
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
    });

})