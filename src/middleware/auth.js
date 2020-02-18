const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    try {
        
        // Replace 'Bearer ' with '' to get just the token
        // const token = req.header('Authorization').replace('Bearer ', '');
        const token = req.cookies['auth_token'];
        // Ensure the token is actually valid, created by our server, and 
        // not expired by creating a decoded payload        
        const decoded = jwt.verify(token, secret);
        // Find user by looking for _id in the decoded payload decoded._id
        // and the token in the tokens array
        const employee = await Employee.findOne({ _id: decoded._id, 'tokens.token': token });
        
        
        if (!employee) {
            throw new Error();
        }
        
        // Store the found user in the user value of req.
        // This is done so the route handler doesn't have to 
        // find the user again and can access it in its req parameter.
        req.employee = employee;
        // Store token in token value of req. This is so we can 
        // have access to token value in route handler.
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth;