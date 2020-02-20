const request = require('supertest');
const app = require('../src/app');
 
test('Should signup a new user', async () => {
    await request(app).post('/register').send({
        firstName: 'Andrew',
        lastName: 'Mead',
        email: 'andrew@example.com',
        password: 'MyPass77!'
    }).expect(200);
})
