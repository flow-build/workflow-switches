const supertest = require('supertest');
const { startServer } = require('../src/app');

let server, request;
beforeAll(async() => {
    server = startServer(3111);
    request = supertest(server);
});

afterAll(async() => {
    await server.close();
});

it('should get OK from Health Check route', async() => {
    const { 
        status, 
        text 
    } = await request.get('/health')
    expect(status).toBe(200);
    expect(text).toBe('OK');
});