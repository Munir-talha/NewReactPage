const db = require('../db');
const jwt = require('jsonwebtoken');
const secretKey = 'mySuperSecretKey123!';

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM userlogin WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            return res.send({ err });
        }
        if (result.length > 0) {
            const token = jwt.sign({ username: result[0].username }, secretKey, { expiresIn: '1h' });
            return res.send({ success: true, token });
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

exports.updateUser = (req, res) => {
    const { id, fname, lname, email, phone } = req.body;
    db.query('UPDATE users SET fname = ?, lname = ? , email = ?, phone = ? WHERE id = ?', [fname, lname, email, phone, id], (err, result) => {
        if (err) {
            return res.send({ err });
        }
        return res.send({ success: true, message: 'User updated successfully' });
    });

}

exports.AddUser = (req, res) => {
    const { fname, lname, email, phone } = req.body;
    console.log(req.body)
    db.query('INSERT INTO users (fname, lname, email, phone) VALUES (?,?,?,?)', [fname, lname, email, phone], (err, result) => {
        if (err) {
            return res.send({ err });
        }
        return res.send({ success: true, message: 'User added successfully' });
    });
}

exports.DeleteUser = (req, res) => {
    const { id } = req.body;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.send({ err });
        }
        return res.send({ success: true, message: 'User deleted successfully' });
    });
}