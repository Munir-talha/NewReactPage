const jwt = require('jsonwebtoken');
const secretKey = 'mySuperSecretKey123';

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ success: false, message: 'Access Denied. No token provided.' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send({ success: false, message: 'Invalid token.' });
        }
        req.user = user;  // Store user info for future use in the request object
        next();
    });
};

