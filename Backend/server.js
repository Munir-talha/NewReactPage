const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('mysql');

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newdatabase',

});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.json());

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT * FROM userlogin WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send({ success: true, data: result });
        } else {
            res.send({ success: false, message: 'Invalid username or password' });

        }
    });
});

app.get('/getAll', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send({ success: true, data: result });
        } else {
            res.send({ success: false, message: 'No data found' });

        }
    });
});


app.listen(5000, () => {
    console.log('Server has started on port 5000');
}
);