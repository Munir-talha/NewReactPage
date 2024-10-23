const db = require('../db');  

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM userlogin WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            return res.send({ err });
        }
        if (result.length > 0) {
            return res.send({ success: true, data: result });
        } else {
            return res.send({ success: false, message: 'Invalid username or password' });
        }
    });
};

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            return res.send({ err });
        }
        if (result.length > 0) {
            return res.send({ success: true, data: result });
        } else {
            return res.send({ success: false, message: 'No data found' });
        }
    });
};
