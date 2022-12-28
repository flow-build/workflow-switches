const supertest = require('supertest');
const { startServer } = require('../src/app');


let switch_mocks = [{ id: 'switch_id' }];
jest.mock('knex', () => {
    return () => {
        const mocks = {
            select: jest.fn().mockReturnThis(),
            from: jest.fn().mockReturnThis(),
            delete: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnValue(switch_mocks),
            modify: jest.fn().mockReturnValue(switch_mocks),
            update: jest.fn().mockReturnValue(switch_mocks),
            insert: jest.fn().mockReturnValue(switch_mocks),
        };
        const fn_ = () => {
            return { ...mocks };
        };
        fn_.select = mocks.select;
        fn_.from = mocks.from;
        fn_.delete = mocks.delete;
        fn_.where = mocks.where;
        fn_.modify = mocks.modify;
        fn_.update = mocks.update;
        fn_.insert = mocks.insert;
        return fn_;
    }
});

let server, request;
beforeAll(async() => {
    server = startServer(3111);
    request = supertest(server);
});

afterAll(async() => {
    await server.close();
});

it('should work to get all switch policies', async() => {
    const response = await request.get('/switch');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(switch_mocks);
});

it('should work to update switch policy', async() => {
    const response = await request.post('/switch', {
        workflow_id: 'workflow_id',
        node_id: 'node_id'
    });
    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual(switch_mocks[0]);
});

it('should work to delete switch policy', async() => {
    const response = await request.delete('/switch/1234', {
        workflow_id: 'workflow_id',
        node_id: 'node_id'
    });
    expect(response.status).toBe(204);
});