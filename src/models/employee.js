// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const validator = require('validator');
// const { conn1 } = require('../db/mongoose');

// const employeeSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid');
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7
//     },
//     tokens: [{
//         token: {
//             type: String,
//             required: true
//         }
//     }]
// })

// employeeSchema.pre('save', async function (next) {
//     const employee = this;

//     if (employee.isModified('password')) {
//         employee.password = await bcrypt.hash(employee.password, 8);
//     }

//     next();
// })

// employeeSchema.methods.generateAuthToken = async function () {
//     const employee = this;
//     // Create token
//     const token = jwt.sign({ _id: employee._id.toString() }, 'secret');
//     // Add token to user.tokens array
//     employee.tokens = employee.tokens.concat({ token });
//     await employee.save();

//     return token;
// }

// employeeSchema.statics.findByCredentials = async (email, password) => {
//     const employee = await Employee.findOne({ email });

//     // function MyError(message){
//     //     this.message = message;
//     // }

//     // MyError.prototype = new Error();

//     if (!employee) {
//         throw new Error('Employee does not exist with specified email! Create an account.');
//     }

//     const isMatch = await bcrypt.compare(password, employee.password);

//     if (!isMatch) {
//         throw new Error('Unable to login! Password does not match!');
//     }

//     return employee;
// }

// // const Employee = mongoose.model('Employee', employeeSchema);

// const Employee = conn1.model('Employee', employeeSchema)

// module.exports = Employee;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

employeeSchema.pre('save', async function (next) {
    const employee = this;

    if (employee.isModified('password')) {
        employee.password = await bcrypt.hash(employee.password, 8);
    }

    next();
})

employeeSchema.methods.generateAuthToken = async function () {
    const employee = this;
    // Create token
    const token = jwt.sign({ _id: employee._id.toString() }, 'secret');
    // Add token to user.tokens array
    employee.tokens = employee.tokens.concat({ token });
    await employee.save();

    return token;
}

employeeSchema.statics.findByCredentials = async (email, password) => {
    const employee = await Employee.findOne({ email });

    // function MyError(message){
    //     this.message = message;
    // }

    // MyError.prototype = new Error();

    if (!employee) {
        throw new Error('Employee does not exist with specified email! Create an account.');
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
        throw new Error('Unable to login! Password does not match!');
    }

    return employee;
}

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;