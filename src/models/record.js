// const mongoose = require('mongoose');
// const validator = require('validator');
// const { conn2 } = require('../db/mongoose');

// const recordSchema = new mongoose.Schema({
//     date: {
//         type: Date,
//         required: true,
//         trim: true
//     },
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
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid');
//             }
//         }
//     },
//     dateIn: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     timeIn: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     timeOut: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     hoursWorked: {
//         type: Number,
//         required: true,
//         trim: true
//     }
// })

// recordSchema.statics.findByCredentials = async (dateIn, email) => {
//     const record = await Record.findOne({ dateIn, email });

//     if (record) {
//         throw new Error('Record already exists for specified date and employee. Administrative approval is needed to submit new record for specified date and employee.');
//     }
    
//     return record;
// }


// // const SignIn = mongoose.model('SignIn', signInSchema);
// const Record = conn2.model('Record', recordSchema);

// module.exports = Record;

const mongoose = require('mongoose');
const validator = require('validator');

const recordSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please enter a date.'],
        trim: true
    },
    firstName: {
        type: String,
        required: [true, 'Please enter a first name'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    dateIn: {
        type: String,
        required: [true, 'Please enter a date in.'],
        trim: true
    },
    timeIn: {
        type: String,
        required: [true, 'Please enter a time in.'],
        trim: true
    },
    timeOut: {
        type: String,
        required: [true, 'Please enter a time out.'],
        trim: true
    },
    hoursWorked: {
        type: Number,
        required: true,
        trim: true
    }
})

recordSchema.statics.findByCredentials = async (dateIn, email) => {
    const record = await Record.findOne({ dateIn, email });

    if (record) {
        throw new Error('Record already exists for specified date and employee. Administrative approval is needed to submit new record for specified date and employee.');
    }
    
    return record;
}


// const SignIn = mongoose.model('SignIn', signInSchema);
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;