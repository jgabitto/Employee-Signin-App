const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Employee = require('../models/employee');
const Record = require('../models/record');

const router = new express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/home', async (req, res) => {
    res.render('home');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/employee', async (req, res) => {
    try {
        let decoded = jwt.verify(req.body.data, 'secret');
        const employee = await Employee.findOne({ _id: decoded._id });

        res.send({
            'firstName': employee.firstName,
            'lastName': employee.lastName,
            'email': employee.email
        })
    } catch (e) {
        res.send({
            'message': e.message
        })
    }  
})

// Create employee
router.post('/register', async (req, res) => {
    try {
        let employee = await Employee.findOne({ email: req.body.email });
        
        if (employee) {
            throw new Error('User already exists with this email!')
        } else {
            employee = new Employee(req.body);
            const token = await employee.generateAuthToken();

            res.cookie('auth_token', token);
        }

        res.send({
            'status': 'Success',
            'message': 'Employee is created!'
        })
    } catch (e) {
        res.send({
            'message': e.message
        })
    }

})
// Login employee
router.post('/login', async (req, res) => {  
    try {
        const employee = await Employee.findByCredentials(req.body.email, req.body.password);
        const token = await employee.generateAuthToken();

        res.cookie('auth_token', token);

        res.send({
            'status': 'Success',
            'message': 'Employee is created!',
            fName: employee.firstName,
            lName: employee.lastName,
            email: employee.email
        })
    } catch (e) {
        res.send({
            'status': 'Failure',
            'message': e.message
        })
    }
})

// Logout employee
router.post('/logout', auth, async (req, res) => {
    try {
        req.employee.tokens = req.employee.tokens.filter((token) => {   // Filter out the token in the 
            return token.token !== req.token;                   // token's array that matches 
        })                                                      // with the latest token

        await req.employee.save();

        res.clearCookie('auth_token');

        res.render('index');
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// Submit employee record
router.post('/record', async (req, res) => {
    try {
        let record = await Record.findByCredentials(req.body.dateIn, req.body.email);
        
        if (!record) {
            record = new Record(req.body);
            await record.save();  
        }

        record = await Record.findOne({ dateIn: req.body.dateIn, email: req.body.email });

        res.send({
            'status': 'Success',
            'message': 'Record was submitted!',
            'data': record
        })        
    } catch (e) {
        res.send({
            'status': 'Failure',
            'message': e.message
        })
    }
})


module.exports = router;