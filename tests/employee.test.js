const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const Employee = require('../src/models/employee');

const employeeOneId = new mongoose.Types.ObjectId();
const employeeOne = {
    _id: employeeOneId,
    firstName: 'Mike',
    lastName: 'Gerry',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: employeeOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await Employee.deleteMany();
    await new Employee(employeeOne).save();
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/register').send({
        firstName: "Jorge",
        lastName: "Gabitto",
        email: "jgabitto1792@gmail.com",
        password: "1234567"
    }).expect(201)

    // Assert that the database was changed correctly
    const employee = await Employee.findById(response.body.employee._id);
    expect(employee).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        employee: {
            firstName: 'Jorge',
            email: 'jgabitto1792@gmail.com',
            tokens: [{
                token: employee.tokens[0].token
            }]
        }
    })
    expect(employee.password).not.toBe('1234567')
})

// test('Should login exisiting employee', async () => {
//     const response = await request(app).post('/login').send({
//         email: employeeOne.email,
//         password: employeeOne.password,
//     });

//     const employee = await Employee.findById(employeeOne._id);
//     expect(employee.tokens[1].token).toBe(response.body.token);
// })

test('Should not login with nonexistent employee', async () => {
    await request(app).post('/login').send({
        email: employeeOne.email,
        password: ''
    }).expect(400);
})

// test('Should logout employee', async () => {
//     await request(app)
//         .post('/logout')
//         .set('Cookie', `auth_token=${employeeOne.tokens[0].token}`)
//         .send()
//         .expect(200);
// })

test('Should not logout employee', async () => {
    await request(app)
        .post('/logout')
        .send()
        .expect(401)
})

test('Should')