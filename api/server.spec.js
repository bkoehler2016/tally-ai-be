const request = require('supertest');

const server = require('./server.js');

describe('server', function() {
    describe('GET /', function() {
        it('should return 200 OK', function() {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });

        it('should return JSON formatted response', function() {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
        });
    });
});