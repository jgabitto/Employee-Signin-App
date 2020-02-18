// const mongoose = require('mongoose');
// let url1 = `${process.env.MONGODB_URI}/heroku_brtwtffk` || 'mongodb://127.0.0.1:27017/employee-sign-in-login';
// let url2 = `${process.env.MONGODB_URI}/heroku_brtwtffk` || 'mongodb://127.0.0.1:27017/employee-sign-in-records';


// // mongoose.connect('mongodb://127.0.0.1:27017/employee-sign-in', {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useCreateIndex: true,
// //     useFindAndModify: false
// // });

// const conn1 = mongoose.createConnection(url1, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
// });

// const conn2 = mongoose.createConnection(url2, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });


// module.exports = {
//     conn1,
//     conn2
// };

const mongoose = require('mongoose');
let url = process.env.MONGODB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: 'heroku_brtwtffk'
});
