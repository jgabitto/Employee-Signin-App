const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/employee-sign-in', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

const conn1 = mongoose.createConnection('mongodb://127.0.0.1:27017/employee-sign-in-login', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
});

const conn2 = mongoose.createConnection('mongodb://127.0.0.1:27017/employee-sign-in-records', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});


module.exports = {
    conn1,
    conn2
};
