const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Employee = require('../models/employee');
const Record = require('../models/record');

const router = new express.Router();
const secret = process.env.JWT_SECRET

router.get('/', (req, res) => {
    try {
        const token = req.cookies['auth_token'];
        let decoded;
        
        if (token) {
            decoded = jwt.verify(token, secret);
        }

        if (decoded) {
            res.redirect('home');
        } else {
            res.render('index');
        }
    } catch (e) {
        res.send(e.message);
    }
})

router.get('/about', (req, res) => {
    try {
        const token = req.cookies['auth_token'];
        let decoded;

        if (token) {
            decoded = jwt.verify(token, secret);
        }

        if (decoded) {
            res.redirect('home');
        } else {
            res.render('about');
        }
    } catch (e) {
        res.send('There was an error getting the page.')
    }
    
})

router.get('/home', (req, res) => {
    try {
        const token = req.cookies['auth_token'];
        let decoded;

        if (token) {
            decoded = jwt.verify(token, secret);
        }

        if (decoded) {
            res.render('home');
        } else {
            res.redirect('index');
        }
    } catch (e) {
        res.send('There was an error getting the page.')
    }
})

router.get('/register', (req, res) => {
    try {
        const token = req.cookies['auth_token'];
        let decoded;

        if (token) {
            decoded = jwt.verify(token, secret);
        }

        if (decoded) {
            res.redirect('home');
        } else {
            res.render('register');
        }
    } catch (e) {
        res.send('There was an error getting the page.');
    }
})

router.get('*', (req, res) => {
    try {
        const token = req.cookies['auth_token'];
        let decoded;

        if (token) {
            decoded = jwt.verify(token, secret);
        }

        if (decoded) {
            res.redirect('home');
        } else {
            res.render('404');
        }
    } catch (e) {
        res.send('There was an error getting the page.');
    }
})

// Display user's first name, last name, and email on home page
router.post('/employee', async (req, res) => {
    try {
        let decoded = jwt.verify(req.body.data, secret);
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

        res.status(201).send({
            'employee': employee,
            'status': 'Success',
            'message': 'Employee is created!'
        })
    } catch (e) {
        res.status(400).send({
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

        res.status(200).send({
            'status': 'Success',
            'message': 'Employee is created!'
        })
    } catch (e) {
        res.status(400).send({
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

// router.post('/record', async (req, res) => {
//     try {
//         let record = await Record.findByCredentials(req.body.dateIn, req.body.email);
//         let decoded = jwt.verify(req.body.cookie[1], secret);

//         if (!record) {
//             record = new Record({
//                     _id: mongoose.Types.ObjectId(),
//                     employee: decoded._id,
//                     date: req.body.date,
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     email: req.body.email,
//                     dateIn: req.body.dateIn,
//                     timeIn: req.body.timeIn,
//                     timeOut: req.body.timeOut,
//                     hoursWorked: req.body.hoursWorked
//             })
//             // record = new Record(req.body);
//             await record.save();
//             Record.findById({_id: record._id}).populate({path: 'employee', model: 'Employee'}).exec( function (err) {
//                 if (err) 
//                 console.log('There was an error');
//                 else
//                 console.log('The employee is %s', record.employee);
//             });
//         }

//         // record = await Record.findOne({ dateIn: req.body.dateIn, email: req.body.email });

//         res.send({
//             'status': 'Success',
//             'message': 'Record was submitted!',
//             'data': record
//         })        
//     } catch (e) {
//         res.send({
//             'status': 'Failure',
//             'message': e.message
//         })
//     }
// })

module.exports = router;