const express = require('express');
const { login, getAllUsers } = require('../controllers/UserController');  
const router = express.Router();

router.post('/login', login);  
router.get('/getAll', getAllUsers);

module.exports = router;