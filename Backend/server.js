const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('mysql');

// const db = sql.createConnection({
//     host: '',
//     user:'',
//     password: '',
//     server: '',
//     database: '',
//     
// });
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.json());

app.listen(5000, () => {
    console.log('Server has started on port 5000');
}
);